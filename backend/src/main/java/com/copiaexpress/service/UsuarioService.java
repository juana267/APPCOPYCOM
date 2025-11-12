package com.copiaexpress.service;

import com.copiaexpress.dto.request.CreateUsuarioDTO;
import com.copiaexpress.dto.response.UsuarioDTO;
import com.copiaexpress.exception.ResourceNotFoundException;
import com.copiaexpress.mapper.UsuarioMapper;
import com.copiaexpress.model.Usuario;
import com.copiaexpress.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<UsuarioDTO> findAll() {
        return usuarioRepository.findAll().stream()
                .map(UsuarioMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<UsuarioDTO> search(String q) {
        return usuarioRepository.search(q == null ? "" : q).stream()
                .map(UsuarioMapper::toDTO)
                .collect(Collectors.toList());
    }

    public UsuarioDTO findById(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + id));
        return UsuarioMapper.toDTO(usuario);
    }

    public UsuarioDTO create(CreateUsuarioDTO dto) {
        usuarioRepository.findByEmail(dto.getEmail()).ifPresent(u -> {
            throw new IllegalArgumentException("El email ya está registrado");
        });
        Usuario entity = UsuarioMapper.fromCreateDTO(dto);
        Usuario saved = usuarioRepository.save(entity);
        return UsuarioMapper.toDTO(saved);
    }

    public UsuarioDTO update(Long id, UsuarioDTO dto) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + id));
        UsuarioMapper.merge(usuario, dto);
        Usuario updated = usuarioRepository.save(usuario);
        return UsuarioMapper.toDTO(updated);
    }

    public void delete(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new ResourceNotFoundException("Usuario no encontrado con id: " + id);
        }
        usuarioRepository.deleteById(id);
    }
}
