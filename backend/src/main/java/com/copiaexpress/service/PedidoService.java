package com.copiaexpress.service;

import com.copiaexpress.dto.request.CreatePedidoDTO;
import com.copiaexpress.dto.response.PedidoDTO;
import com.copiaexpress.exception.ResourceNotFoundException;
import com.copiaexpress.mapper.PedidoMapper;
import com.copiaexpress.model.*;
import com.copiaexpress.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ClienteRepository clienteRepository;
    private final ServicioRepository servicioRepository;

    public PedidoService(PedidoRepository pedidoRepository,
                         ClienteRepository clienteRepository,
                         ServicioRepository servicioRepository) {
        this.pedidoRepository = pedidoRepository;
        this.clienteRepository = clienteRepository;
        this.servicioRepository = servicioRepository;
    }

    public List<PedidoDTO> findAll(String estado) {
        List<Pedido> pedidos;
        if (estado != null && !estado.equalsIgnoreCase("todos")) {
            pedidos = pedidoRepository.findByEstado(EstadoPedido.valueOf(estado));
        } else {
            pedidos = pedidoRepository.findAll();
        }
        return pedidos.stream().map(PedidoMapper::toDTO).collect(Collectors.toList());
    }

    public PedidoDTO findById(Long id) {
        Pedido p = pedidoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido no encontrado con id: " + id));
        return PedidoMapper.toDTO(p);
    }

    public PedidoDTO create(CreatePedidoDTO create) {
        Cliente cliente = clienteRepository.findById(create.getClienteId())
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado"));
        List<Long> servicioIds = create.getItems().stream().map(i -> i.getServicioId()).toList();
        List<Servicio> servicios = servicioRepository.findAllById(servicioIds);
        if (servicios.size() != servicioIds.size()) {
            throw new IllegalArgumentException("Uno o más servicios no existen");
        }
        Pedido p = new Pedido();
        p.setNumeroPedido(generateNumeroPedido());
        PedidoMapper.fillFromCreateDTO(p, create, cliente, servicios);
        Pedido saved = pedidoRepository.save(p);
        return PedidoMapper.toDTO(saved);
    }

    private String generateNumeroPedido() {
        long count = pedidoRepository.count();
        return String.format("PED-%03d", count + 1);
    }
}
