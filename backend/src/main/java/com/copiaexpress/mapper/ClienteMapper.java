package com.copiaexpress.mapper;

import com.copiaexpress.dto.request.CreateClienteDTO;
import com.copiaexpress.dto.response.ClienteDTO;
import com.copiaexpress.model.Cliente;

import java.util.Date;

public class ClienteMapper {

    public static ClienteDTO toDTO(Cliente entity) {
        ClienteDTO dto = new ClienteDTO();
        dto.setId(entity.getId());
        dto.setNombre(entity.getNombre());
        dto.setEmail(entity.getEmail());
        dto.setTelefono(entity.getTelefono());
        dto.setDireccion(entity.getDireccion());
        dto.setFechaRegistro(entity.getFechaRegistro());
        return dto;
    }

    public static Cliente fromCreateDTO(CreateClienteDTO dto) {
        Cliente entity = new Cliente();
        entity.setNombre(dto.getNombre());
        entity.setEmail(dto.getEmail());
        entity.setTelefono(dto.getTelefono());
        entity.setDireccion(dto.getDireccion());
        entity.setFechaRegistro(new Date());
        return entity;
    }

    public static void merge(Cliente entity, ClienteDTO dto) {
        entity.setNombre(dto.getNombre());
        entity.setEmail(dto.getEmail());
        entity.setTelefono(dto.getTelefono());
        entity.setDireccion(dto.getDireccion());
    }
}
