package com.copiaexpress.mapper;

import com.copiaexpress.dto.response.ServicioDTO;
import com.copiaexpress.model.Servicio;

public class ServicioMapper {
    public static ServicioDTO toDTO(Servicio s) {
        ServicioDTO dto = new ServicioDTO();
        dto.setId(s.getId());
        dto.setNombre(s.getNombre());
        dto.setDescripcion(s.getDescripcion());
        dto.setPrecioBase(s.getPrecioBase());
        dto.setCategoria(s.getCategoria());
        dto.setTiempoEstimado(s.getTiempoEstimado());
        dto.setActivo(s.getActivo());
        dto.setPopular(s.getPopular());
        return dto;
    }

    public static void merge(Servicio s, ServicioDTO dto) {
        s.setNombre(dto.getNombre());
        s.setDescripcion(dto.getDescripcion());
        s.setPrecioBase(dto.getPrecioBase());
        s.setCategoria(dto.getCategoria());
        s.setTiempoEstimado(dto.getTiempoEstimado());
        s.setActivo(dto.getActivo() != null ? dto.getActivo() : s.getActivo());
        s.setPopular(dto.getPopular() != null ? dto.getPopular() : s.getPopular());
    }
}
