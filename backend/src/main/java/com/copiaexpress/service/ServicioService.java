package com.copiaexpress.service;

import com.copiaexpress.dto.response.ServicioDTO;
import com.copiaexpress.exception.ResourceNotFoundException;
import com.copiaexpress.mapper.ServicioMapper;
import com.copiaexpress.model.Servicio;
import com.copiaexpress.repository.ServicioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ServicioService {

    private final ServicioRepository servicioRepository;

    public ServicioService(ServicioRepository servicioRepository) {
        this.servicioRepository = servicioRepository;
    }

    public List<ServicioDTO> findAll() {
        return servicioRepository.findAll().stream()
                .map(ServicioMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<ServicioDTO> findActivos() {
        return servicioRepository.findActivos().stream()
                .map(ServicioMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<ServicioDTO> search(String q) {
        return servicioRepository.search(q == null ? "" : q).stream()
                .map(ServicioMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ServicioDTO findById(Long id) {
        Servicio s = servicioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Servicio no encontrado con id: " + id));
        return ServicioMapper.toDTO(s);
    }

    public ServicioDTO create(ServicioDTO dto) {
        Servicio s = new Servicio();
        ServicioMapper.merge(s, dto);
        if (s.getActivo() == null) s.setActivo(true);
        if (s.getPopular() == null) s.setPopular(false);
        Servicio saved = servicioRepository.save(s);
        return ServicioMapper.toDTO(saved);
    }

    public ServicioDTO update(Long id, ServicioDTO dto) {
        Servicio s = servicioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Servicio no encontrado con id: " + id));
        ServicioMapper.merge(s, dto);
        Servicio saved = servicioRepository.save(s);
        return ServicioMapper.toDTO(saved);
    }

    public void delete(Long id) {
        if (!servicioRepository.existsById(id)) {
            throw new ResourceNotFoundException("Servicio no encontrado con id: " + id);
        }
        servicioRepository.deleteById(id);
    }
}
