package com.copiaexpress.service;

import com.copiaexpress.exception.ResourceNotFoundException;
import com.copiaexpress.model.Empleado;
import com.copiaexpress.repository.EmpleadoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class EmpleadoService {

    private final EmpleadoRepository empleadoRepository;

    public EmpleadoService(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }

    public List<Empleado> findAll() {
        return empleadoRepository.findAll();
    }

    public Empleado findById(Long id) {
        return empleadoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Empleado no encontrado con id: " + id));
    }

    public Empleado create(Empleado empleado) {
        empleado.setId(null);
        return empleadoRepository.save(empleado);
    }

    public Empleado update(Long id, Empleado body) {
        Empleado db = empleadoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Empleado no encontrado con id: " + id));
        db.setNombre(body.getNombre());
        db.setCorreo(body.getCorreo());
        db.setTelefono(body.getTelefono());
        db.setFechaIngreso(body.getFechaIngreso());
        db.setSalario(body.getSalario());
        db.setImagePath(body.getImagePath());
        db.setPosition(body.getPosition());
        return empleadoRepository.save(db);
    }

    public void delete(Long id) {
        if (!empleadoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Empleado no encontrado con id: " + id);
        }
        empleadoRepository.deleteById(id);
    }
}
