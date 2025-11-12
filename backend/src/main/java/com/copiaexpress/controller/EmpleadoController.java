package com.copiaexpress.controller;

import com.copiaexpress.model.Empleado;
import com.copiaexpress.service.EmpleadoService;
import com.copiaexpress.dto.request.CreateEmpleadoDTO;
import com.copiaexpress.dto.response.EmpleadoDTO;
import com.copiaexpress.mapper.EmpleadoMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/empleados")
@CrossOrigin(origins = "http://localhost:4200")
public class EmpleadoController {

    private final EmpleadoService service;

    public EmpleadoController(EmpleadoService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<EmpleadoDTO>> all() {
        List<EmpleadoDTO> list = service.findAll().stream()
                .map(EmpleadoMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmpleadoDTO> byId(@PathVariable Long id) {
        Empleado emp = service.findById(id);
        return ResponseEntity.ok(EmpleadoMapper.toDTO(emp));
    }

    @PostMapping
    public ResponseEntity<EmpleadoDTO> create(@Valid @RequestBody CreateEmpleadoDTO dto) {
        Empleado toCreate = EmpleadoMapper.fromCreateDTO(dto);
        Empleado created = service.create(toCreate);
        return ResponseEntity.status(HttpStatus.CREATED).body(EmpleadoMapper.toDTO(created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmpleadoDTO> update(@PathVariable Long id, @Valid @RequestBody EmpleadoDTO dto) {
        Empleado tmp = new Empleado();
        tmp.setNombre(dto.getNombre());
        tmp.setCorreo(dto.getCorreo());
        tmp.setTelefono(dto.getTelefono());
        // fechaIngreso llega como ISO-8601 yyyy-MM-dd
        if (dto.getFechaIngreso() != null) {
            tmp.setFechaIngreso(java.time.LocalDate.parse(dto.getFechaIngreso()));
        }
        tmp.setSalario(dto.getSalario());
        tmp.setImagePath(dto.getImagePath());
        tmp.setPosition(dto.getPosition());
        Empleado updated = service.update(id, tmp);
        return ResponseEntity.ok(EmpleadoMapper.toDTO(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
