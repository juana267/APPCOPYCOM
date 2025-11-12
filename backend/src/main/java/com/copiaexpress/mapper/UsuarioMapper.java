package com.copiaexpress.mapper;

import com.copiaexpress.dto.request.CreateUsuarioDTO;
import com.copiaexpress.dto.response.UsuarioDTO;
import com.copiaexpress.model.Usuario;

public class UsuarioMapper {

    public static UsuarioDTO toDTO(Usuario entity) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(entity.getId());
        dto.setNombre(entity.getNombre());
        dto.setEmail(entity.getEmail());
        dto.setPassword(entity.getPassword());
        dto.setRolUsuario(entity.getRolUsuario());
        return dto;
    }

    public static Usuario fromCreateDTO(CreateUsuarioDTO dto) {
        Usuario entity = new Usuario();
        entity.setNombre(dto.getNombre());
        entity.setEmail(dto.getEmail());
        entity.setPassword(dto.getPassword());
        entity.setRolUsuario(dto.getRolUsuario());
        return entity;
    }

    public static void merge(Usuario entity, UsuarioDTO dto) {
        entity.setNombre(dto.getNombre());
        entity.setEmail(dto.getEmail());
        entity.setRolUsuario(dto.getRolUsuario());
    }
}
