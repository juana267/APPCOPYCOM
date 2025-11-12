package com.copiaexpress.mapper;

import com.copiaexpress.dto.request.CreateEmpleadoDTO;
import com.copiaexpress.dto.response.EmpleadoDTO;
import com.copiaexpress.model.Empleado;

import java.time.LocalDate;

public class EmpleadoMapper {

    public static EmpleadoDTO toDTO(Empleado e) {
        if (e == null) return null;
        EmpleadoDTO dto = new EmpleadoDTO();
        dto.setId(e.getId());
        dto.setNombre(e.getNombre());
        dto.setCorreo(e.getCorreo());
        dto.setTelefono(e.getTelefono());
        dto.setFechaIngreso(e.getFechaIngreso() != null ? e.getFechaIngreso().toString() : null);
        dto.setSalario(e.getSalario());
        dto.setImagePath(e.getImagePath());
        dto.setPosition(e.getPosition());
        return dto;
    }

    public static Empleado fromCreateDTO(CreateEmpleadoDTO dto) {
        if (dto == null) return null;
        Empleado e = new Empleado();
        e.setNombre(dto.getNombre());
        e.setCorreo(dto.getCorreo());
        e.setTelefono(dto.getTelefono());
        e.setFechaIngreso(dto.getFechaIngreso() != null ? LocalDate.parse(dto.getFechaIngreso()) : null);
        e.setSalario(dto.getSalario());
        e.setImagePath(dto.getImagePath());
        e.setPosition(dto.getPosition());
        return e;
    }

    public static void merge(Empleado entity, EmpleadoDTO dto) {
        if (dto.getNombre() != null) entity.setNombre(dto.getNombre());
        if (dto.getCorreo() != null) entity.setCorreo(dto.getCorreo());
        if (dto.getTelefono() != null) entity.setTelefono(dto.getTelefono());
        if (dto.getFechaIngreso() != null) entity.setFechaIngreso(LocalDate.parse(dto.getFechaIngreso()));
        if (dto.getSalario() != null) entity.setSalario(dto.getSalario());
        if (dto.getImagePath() != null) entity.setImagePath(dto.getImagePath());
        if (dto.getPosition() != null) entity.setPosition(dto.getPosition());
    }
}
