package com.copiaexpress.mapper;

import com.copiaexpress.dto.request.CreateItemPedidoDTO;
import com.copiaexpress.dto.request.CreatePedidoDTO;
import com.copiaexpress.dto.response.ItemPedidoDTO;
import com.copiaexpress.dto.response.PedidoDTO;
import com.copiaexpress.model.*;

import java.util.List;
import java.util.stream.Collectors;

public class PedidoMapper {

    public static PedidoDTO toDTO(Pedido p) {
        PedidoDTO dto = new PedidoDTO();
        dto.setId(p.getId());
        dto.setNumeroPedido(p.getNumeroPedido());
        dto.setClienteNombre(p.getCliente().getNombre());
        dto.setClienteId(p.getCliente().getId());
        dto.setFecha(p.getFecha());
        dto.setFechaEntrega(p.getFechaEntrega());
        dto.setDescripcion(p.getDescripcion());
        dto.setEstado(p.getEstado().name());
        dto.setSubtotal(p.getSubtotal());
        dto.setIva(p.getIva());
        dto.setTotal(p.getTotal());
        if (p.getItems() != null) {
            dto.setItems(p.getItems().stream().map(PedidoMapper::toItemDTO).collect(Collectors.toList()));
        }
        return dto;
    }

    public static ItemPedidoDTO toItemDTO(ItemPedido item) {
        ItemPedidoDTO dto = new ItemPedidoDTO();
        dto.setId(item.getId());
        dto.setServicioId(item.getServicio().getId());
        dto.setServicioNombre(item.getServicio().getNombre());
        dto.setCantidad(item.getCantidad());
        dto.setPrecioUnitario(item.getPrecioUnitario());
        dto.setSubtotal(item.getSubtotal());
        return dto;
    }

    public static void fillFromCreateDTO(Pedido p, CreatePedidoDTO create, Cliente cliente, List<Servicio> servicios) {
        p.setCliente(cliente);
        p.setFecha(new java.util.Date());
        p.setFechaEntrega(create.getFechaEntrega());
        p.setDescripcion(create.getDescripcion());
        p.setEstado(EstadoPedido.PENDIENTE);

        java.math.BigDecimal subtotal = java.math.BigDecimal.ZERO;
        java.util.List<ItemPedido> items = new java.util.ArrayList<>();
        for (CreateItemPedidoDTO itemDTO : create.getItems()) {
            Servicio servicio = servicios.stream().filter(s -> s.getId().equals(itemDTO.getServicioId())).findFirst().orElseThrow();
            ItemPedido item = new ItemPedido();
            item.setPedido(p);
            item.setServicio(servicio);
            item.setCantidad(itemDTO.getCantidad());
            item.setPrecioUnitario(servicio.getPrecioBase());
            java.math.BigDecimal itemSubtotal = servicio.getPrecioBase().multiply(java.math.BigDecimal.valueOf(itemDTO.getCantidad()));
            item.setSubtotal(itemSubtotal);
            items.add(item);
            subtotal = subtotal.add(itemSubtotal);
        }
        java.math.BigDecimal iva = subtotal.multiply(new java.math.BigDecimal("0.16"));
        java.math.BigDecimal total = subtotal.add(iva);
        p.setSubtotal(subtotal);
        p.setIva(iva);
        p.setTotal(total);
        p.setItems(items);
    }
}
