package com.copiaexpress.dto.request;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Date;
import java.util.List;

public class CreatePedidoDTO {
    @NotNull
    private Long clienteId;

    @NotNull
    @Future
    private Date fechaEntrega;

    @Size(max = 1000)
    private String descripcion;

    @NotEmpty
    private List<CreateItemPedidoDTO> items;

    public Long getClienteId() { return clienteId; }
    public void setClienteId(Long clienteId) { this.clienteId = clienteId; }
    public Date getFechaEntrega() { return fechaEntrega; }
    public void setFechaEntrega(Date fechaEntrega) { this.fechaEntrega = fechaEntrega; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public List<CreateItemPedidoDTO> getItems() { return items; }
    public void setItems(List<CreateItemPedidoDTO> items) { this.items = items; }
}
