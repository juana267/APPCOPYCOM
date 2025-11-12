package com.copiaexpress.service;

import com.copiaexpress.dto.request.CreateClienteDTO;
import com.copiaexpress.dto.response.ClienteDTO;
import com.copiaexpress.exception.ResourceNotFoundException;
import com.copiaexpress.mapper.ClienteMapper;
import com.copiaexpress.model.Cliente;
import com.copiaexpress.repository.ClienteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<ClienteDTO> findAll() {
        return clienteRepository.findAll().stream()
                .map(ClienteMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<ClienteDTO> search(String q) {
        return clienteRepository.search(q == null ? "" : q).stream()
                .map(ClienteMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ClienteDTO findById(Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con id: " + id));
        return ClienteMapper.toDTO(cliente);
    }

    public ClienteDTO create(CreateClienteDTO dto) {
        // Validación sencilla de email único
        clienteRepository.findByEmail(dto.getEmail()).ifPresent(c -> {
            throw new IllegalArgumentException("El email ya está registrado");
        });
        Cliente entity = ClienteMapper.fromCreateDTO(dto);
        Cliente saved = clienteRepository.save(entity);
        return ClienteMapper.toDTO(saved);
    }

    public ClienteDTO update(Long id, ClienteDTO dto) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con id: " + id));
        ClienteMapper.merge(cliente, dto);
        Cliente updated = clienteRepository.save(cliente);
        return ClienteMapper.toDTO(updated);
    }

    public void delete(Long id) {
        if (!clienteRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cliente no encontrado con id: " + id);
        }
        clienteRepository.deleteById(id);
    }
}
