package com.copiaexpress.controller;

import com.copiaexpress.dto.request.CreatePedidoDTO;
import com.copiaexpress.dto.response.PedidoDTO;
import com.copiaexpress.service.PedidoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "http://localhost:4200")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @GetMapping
    public ResponseEntity<List<PedidoDTO>> getAll(@RequestParam(required = false) String estado) {
        return ResponseEntity.ok(pedidoService.findAll(estado));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(pedidoService.findById(id));
    }

    @PostMapping
    public ResponseEntity<PedidoDTO> create(@Valid @RequestBody CreatePedidoDTO createDTO) {
        PedidoDTO created = pedidoService.create(createDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
