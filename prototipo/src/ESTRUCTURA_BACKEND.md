# 📁 Estructura del Backend - Spring Boot

## Organización de Carpetas

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── copiaexpress/
│   │   │           ├── CopiadoraApplication.java (Main)
│   │   │           │
│   │   │           ├── config/
│   │   │           │   ├── SecurityConfig.java
│   │   │           │   ├── CorsConfig.java
│   │   │           │   └── JwtConfig.java
│   │   │           │
│   │   │           ├── controller/
│   │   │           │   ├── ClienteController.java
│   │   │           │   ├── ServicioController.java
│   │   │           │   ├── PedidoController.java
│   │   │           │   ├── FacturaController.java
│   │   │           │   ├── MaterialController.java
│   │   │           │   ├── TrabajadorController.java
│   │   │           │   ├── MaquinaController.java
│   │   │           │   ├── EnvioController.java
│   │   │           │   └── ReporteController.java
│   │   │           │
│   │   │           ├── model/ (Entidades)
│   │   │           │   ├── Cliente.java
│   │   │           │   ├── Servicio.java
│   │   │           │   ├── Pedido.java
│   │   │           │   ├── ItemPedido.java
│   │   │           │   ├── Factura.java
│   │   │           │   ├── Material.java
│   │   │           │   ├── Trabajador.java
│   │   │           │   ├── Maquina.java
│   │   │           │   ├── Envio.java
│   │   │           │   └── enums/
│   │   │           │       ├── EstadoPedido.java
│   │   │           │       ├── EstadoFactura.java
│   │   │           │       ├── MetodoPago.java
│   │   │           │       ├── EstadoEnvio.java
│   │   │           │       ├── EstadoMaquina.java
│   │   │           │       ├── EstadoTrabajador.java
│   │   │           │       └── RolTrabajador.java
│   │   │           │
│   │   │           ├── dto/
│   │   │           │   ├── request/
│   │   │           │   │   ├── CreatePedidoDTO.java
│   │   │           │   │   ├── CreateFacturaDTO.java
│   │   │           │   │   ├── CreateClienteDTO.java
│   │   │           │   │   ├── CreateEnvioDTO.java
│   │   │           │   │   ├── UpdateEstadoDTO.java
│   │   │           │   │   └── LoginDTO.java
│   │   │           │   │
│   │   │           │   └── response/
│   │   │           │       ├── ClienteDTO.java
│   │   │           │       ├── ServicioDTO.java
│   │   │           │       ├── PedidoDTO.java
│   │   │           │       ├── FacturaDTO.java
│   │   │           │       ├── MaterialDTO.java
│   │   │           │       ├── TrabajadorDTO.java
│   │   │           │       ├── MaquinaDTO.java
│   │   │           │       ├── EnvioDTO.java
│   │   │           │       ├── DashboardDTO.java
│   │   │           │       └── ReporteVentasDTO.java
│   │   │           │
│   │   │           ├── repository/
│   │   │           │   ├── ClienteRepository.java
│   │   │           │   ├── ServicioRepository.java
│   │   │           │   ├── PedidoRepository.java
│   │   │           │   ├── ItemPedidoRepository.java
│   │   │           │   ├── FacturaRepository.java
│   │   │           │   ├── MaterialRepository.java
│   │   │           │   ├── TrabajadorRepository.java
│   │   │           │   ├── MaquinaRepository.java
│   │   │           │   └── EnvioRepository.java
│   │   │           │
│   │   │           ├── service/
│   │   │           │   ├── ClienteService.java
│   │   │           │   ├── ServicioService.java
│   │   │           │   ├── PedidoService.java
│   │   │           │   ├── FacturaService.java
│   │   │           │   ├── MaterialService.java
│   │   │           │   ├── TrabajadorService.java
│   │   │           │   ├── MaquinaService.java
│   │   │           │   ├── EnvioService.java
│   │   │           │   ├── ReporteService.java
│   │   │           │   └── PdfService.java
│   │   │           │
│   │   │           ├── exception/
│   │   │           │   ├── GlobalExceptionHandler.java
│   │   │           │   ├── ResourceNotFoundException.java
│   │   │           │   ├── BadRequestException.java
│   │   │           │   └── UnauthorizedException.java
│   │   │           │
│   │   │           ├── security/
│   │   │           │   ├── JwtTokenProvider.java
│   │   │           │   ├── JwtAuthenticationFilter.java
│   │   │           │   └── CustomUserDetailsService.java
│   │   │           │
│   │   │           └── util/
│   │   │               ├── NumberUtil.java
│   │   │               ├── DateUtil.java
│   │   │               └── PdfGenerator.java
│   │   │
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── application-dev.properties
│   │       ├── application-prod.properties
│   │       └── templates/
│   │           └── factura-template.html
│   │
│   └── test/
│       └── java/
│           └── com/
│               └── copiaexpress/
│                   ├── controller/
│                   │   └── PedidoControllerTest.java
│                   ├── service/
│                   │   └── PedidoServiceTest.java
│                   └── repository/
│                       └── PedidoRepositoryTest.java
│
├── pom.xml
├── .gitignore
└── README.md
```

---

## 📄 Ejemplo de Archivos Principales

### CopiadoraApplication.java
```java
package com.copiaexpress;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CopiadoraApplication {
    public static void main(String[] args) {
        SpringApplication.run(CopiadoraApplication.class, args);
    }
}
```

### PedidoController.java
```java
package com.copiaexpress.controller;

import com.copiaexpress.dto.request.CreatePedidoDTO;
import com.copiaexpress.dto.response.PedidoDTO;
import com.copiaexpress.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/pedidos")
@CrossOrigin(origins = "http://localhost:4200")
public class PedidoController {
    
    @Autowired
    private PedidoService pedidoService;
    
    @GetMapping
    public ResponseEntity<List<PedidoDTO>> getAllPedidos(
            @RequestParam(required = false) String estado) {
        List<PedidoDTO> pedidos = pedidoService.findAll(estado);
        return ResponseEntity.ok(pedidos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<PedidoDTO> getPedidoById(@PathVariable Long id) {
        PedidoDTO pedido = pedidoService.findById(id);
        return ResponseEntity.ok(pedido);
    }
    
    @PostMapping
    public ResponseEntity<PedidoDTO> createPedido(
            @Valid @RequestBody CreatePedidoDTO createDTO) {
        PedidoDTO pedido = pedidoService.create(createDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(pedido);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<PedidoDTO> updatePedido(
            @PathVariable Long id,
            @Valid @RequestBody PedidoDTO pedidoDTO) {
        PedidoDTO pedido = pedidoService.update(id, pedidoDTO);
        return ResponseEntity.ok(pedido);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePedido(@PathVariable Long id) {
        pedidoService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/buscar")
    public ResponseEntity<List<PedidoDTO>> searchPedidos(
            @RequestParam String q,
            @RequestParam(required = false) String estado) {
        List<PedidoDTO> pedidos = pedidoService.search(q, estado);
        return ResponseEntity.ok(pedidos);
    }
    
    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<List<PedidoDTO>> getPedidosByCliente(
            @PathVariable Long clienteId) {
        List<PedidoDTO> pedidos = pedidoService.findByCliente(clienteId);
        return ResponseEntity.ok(pedidos);
    }
}
```

### PedidoService.java
```java
package com.copiaexpress.service;

import com.copiaexpress.dto.request.CreatePedidoDTO;
import com.copiaexpress.dto.request.ItemPedidoDTO;
import com.copiaexpress.dto.response.PedidoDTO;
import com.copiaexpress.exception.ResourceNotFoundException;
import com.copiaexpress.model.*;
import com.copiaexpress.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PedidoService {
    
    @Autowired
    private PedidoRepository pedidoRepository;
    
    @Autowired
    private ClienteRepository clienteRepository;
    
    @Autowired
    private ServicioRepository servicioRepository;
    
    @Autowired
    private ItemPedidoRepository itemPedidoRepository;
    
    public List<PedidoDTO> findAll(String estado) {
        List<Pedido> pedidos;
        if (estado != null && !estado.equals("todos")) {
            pedidos = pedidoRepository.findByEstado(EstadoPedido.valueOf(estado));
        } else {
            pedidos = pedidoRepository.findAll();
        }
        return pedidos.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public PedidoDTO findById(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Pedido no encontrado con id: " + id));
        return convertToDTO(pedido);
    }
    
    public PedidoDTO create(CreatePedidoDTO createDTO) {
        // Validar cliente
        Cliente cliente = clienteRepository.findById(createDTO.getClienteId())
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Cliente no encontrado"));
        
        // Crear pedido
        Pedido pedido = new Pedido();
        pedido.setNumeroPedido(generateNumeroPedido());
        pedido.setCliente(cliente);
        pedido.setFecha(new Date());
        pedido.setFechaEntrega(createDTO.getFechaEntrega());
        pedido.setDescripcion(createDTO.getDescripcion());
        pedido.setEstado(EstadoPedido.PENDIENTE);
        
        // Crear items y calcular totales
        List<ItemPedido> items = new ArrayList<>();
        BigDecimal subtotal = BigDecimal.ZERO;
        
        for (ItemPedidoDTO itemDTO : createDTO.getItems()) {
            Servicio servicio = servicioRepository.findById(itemDTO.getServicioId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                        "Servicio no encontrado"));
            
            ItemPedido item = new ItemPedido();
            item.setPedido(pedido);
            item.setServicio(servicio);
            item.setCantidad(itemDTO.getCantidad());
            item.setPrecioUnitario(servicio.getPrecioBase());
            
            // Calcular subtotal del item
            BigDecimal itemSubtotal = servicio.getPrecioBase()
                    .multiply(BigDecimal.valueOf(itemDTO.getCantidad()));
            item.setSubtotal(itemSubtotal);
            
            items.add(item);
            subtotal = subtotal.add(itemSubtotal);
        }
        
        // Calcular IVA y total
        BigDecimal iva = subtotal.multiply(BigDecimal.valueOf(0.16));
        BigDecimal total = subtotal.add(iva);
        
        pedido.setSubtotal(subtotal);
        pedido.setIva(iva);
        pedido.setTotal(total);
        pedido.setItems(items);
        
        // Guardar pedido
        Pedido savedPedido = pedidoRepository.save(pedido);
        
        return convertToDTO(savedPedido);
    }
    
    public PedidoDTO update(Long id, PedidoDTO pedidoDTO) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Pedido no encontrado con id: " + id));
        
        // Actualizar campos permitidos
        pedido.setFechaEntrega(pedidoDTO.getFechaEntrega());
        pedido.setDescripcion(pedidoDTO.getDescripcion());
        pedido.setEstado(EstadoPedido.valueOf(pedidoDTO.getEstado()));
        
        Pedido updatedPedido = pedidoRepository.save(pedido);
        return convertToDTO(updatedPedido);
    }
    
    public void delete(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Pedido no encontrado con id: " + id));
        
        // Cambiar estado a cancelado en lugar de eliminar
        pedido.setEstado(EstadoPedido.CANCELADO);
        pedidoRepository.save(pedido);
    }
    
    public List<PedidoDTO> search(String q, String estado) {
        List<Pedido> pedidos = pedidoRepository.searchPedidos(q, estado);
        return pedidos.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<PedidoDTO> findByCliente(Long clienteId) {
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Cliente no encontrado"));
        
        List<Pedido> pedidos = pedidoRepository.findByCliente(cliente);
        return pedidos.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    private String generateNumeroPedido() {
        Long count = pedidoRepository.count();
        return String.format("PED-%03d", count + 1);
    }
    
    private PedidoDTO convertToDTO(Pedido pedido) {
        PedidoDTO dto = new PedidoDTO();
        dto.setId(pedido.getId());
        dto.setNumeroPedido(pedido.getNumeroPedido());
        dto.setClienteNombre(pedido.getCliente().getNombre());
        dto.setFecha(pedido.getFecha());
        dto.setFechaEntrega(pedido.getFechaEntrega());
        dto.setDescripcion(pedido.getDescripcion());
        dto.setEstado(pedido.getEstado().name());
        dto.setSubtotal(pedido.getSubtotal());
        dto.setIva(pedido.getIva());
        dto.setTotal(pedido.getTotal());
        
        // Convertir items
        List<ItemPedidoDTO> itemsDTO = pedido.getItems().stream()
                .map(this::convertItemToDTO)
                .collect(Collectors.toList());
        dto.setItems(itemsDTO);
        
        return dto;
    }
    
    private ItemPedidoDTO convertItemToDTO(ItemPedido item) {
        ItemPedidoDTO dto = new ItemPedidoDTO();
        dto.setServicioId(item.getServicio().getId());
        dto.setServicioNombre(item.getServicio().getNombre());
        dto.setCantidad(item.getCantidad());
        dto.setPrecioUnitario(item.getPrecioUnitario());
        dto.setSubtotal(item.getSubtotal());
        return dto;
    }
}
```

### PedidoRepository.java
```java
package com.copiaexpress.repository;

import com.copiaexpress.model.Cliente;
import com.copiaexpress.model.EstadoPedido;
import com.copiaexpress.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    
    List<Pedido> findByEstado(EstadoPedido estado);
    
    List<Pedido> findByCliente(Cliente cliente);
    
    List<Pedido> findByFechaBetween(Date desde, Date hasta);
    
    @Query("SELECT p FROM Pedido p WHERE " +
           "LOWER(p.numeroPedido) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(p.cliente.nombre) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(p.descripcion) LIKE LOWER(CONCAT('%', :q, '%'))")
    List<Pedido> searchPedidos(@Param("q") String q, @Param("estado") String estado);
    
    @Query("SELECT COUNT(p) FROM Pedido p WHERE p.estado = :estado")
    Long countByEstado(@Param("estado") EstadoPedido estado);
    
    @Query("SELECT SUM(p.total) FROM Pedido p WHERE " +
           "p.fecha BETWEEN :desde AND :hasta AND p.estado = 'COMPLETADO'")
    BigDecimal sumTotalByFecha(@Param("desde") Date desde, @Param("hasta") Date hasta);
}
```

### CreatePedidoDTO.java
```java
package com.copiaexpress.dto.request;

import javax.validation.constraints.*;
import java.util.Date;
import java.util.List;

public class CreatePedidoDTO {
    
    @NotNull(message = "El cliente es requerido")
    private Long clienteId;
    
    @NotNull(message = "La fecha de entrega es requerida")
    @Future(message = "La fecha de entrega debe ser futura")
    private Date fechaEntrega;
    
    @Size(max = 1000, message = "La descripción no puede exceder 1000 caracteres")
    private String descripcion;
    
    @NotEmpty(message = "Debe incluir al menos un item")
    private List<ItemPedidoDTO> items;
    
    // Getters y Setters
}
```

### application.properties
```properties
# Server Configuration
server.port=8080
server.servlet.context-path=/api/v1

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/copiadora_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# JSON Configuration
spring.jackson.serialization.write-dates-as-timestamps=false
spring.jackson.time-zone=America/Mexico_City

# JWT Configuration
jwt.secret=mi-clave-secreta-super-segura-copiadora-2024
jwt.expiration=86400000

# File Upload
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB

# CORS
cors.allowed-origins=http://localhost:4200

# Logging
logging.level.com.copiaexpress=DEBUG
logging.level.org.hibernate.SQL=DEBUG
```

### pom.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.14</version>
        <relativePath/>
    </parent>
    
    <groupId>com.copiaexpress</groupId>
    <artifactId>copiadora-backend</artifactId>
    <version>1.0.0</version>
    <name>Sistema Copiadora Backend</name>
    <description>Backend API para sistema de gestión de copiadora</description>
    
    <properties>
        <java.version>11</java.version>
    </properties>
    
    <dependencies>
        <!-- Spring Boot Starter Web -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        
        <!-- Spring Boot Starter Data JPA -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        
        <!-- MySQL Driver -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.33</version>
        </dependency>
        
        <!-- Spring Boot Starter Validation -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        
        <!-- Lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        
        <!-- Spring Boot Starter Security -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        
        <!-- JWT -->
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt</artifactId>
            <version>0.9.1</version>
        </dependency>
        
        <!-- iText PDF -->
        <dependency>
            <groupId>com.itextpdf</groupId>
            <artifactId>itextpdf</artifactId>
            <version>5.5.13.3</version>
        </dependency>
        
        <!-- Apache POI for Excel -->
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi-ooxml</artifactId>
            <version>5.2.3</version>
        </dependency>
        
        <!-- Spring Boot DevTools -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        
        <!-- Spring Boot Starter Test -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

---

## 🚀 Comandos para iniciar el proyecto

```bash
# Crear proyecto Spring Boot
# Opción 1: Usando Spring Initializr (https://start.spring.io/)
# Opción 2: Usando Spring CLI
spring init --dependencies=web,data-jpa,mysql,validation,lombok,security \
    --group-id=com.copiaexpress \
    --artifact-id=copiadora-backend \
    --name="Sistema Copiadora Backend" \
    copiadora-backend

# Entrar al directorio
cd copiadora-backend

# Compilar el proyecto
mvn clean install

# Ejecutar el proyecto
mvn spring-boot:run

# Ejecutar tests
mvn test
```

---

## 📊 Script SQL para crear la base de datos

```sql
CREATE DATABASE copiadora_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE copiadora_db;

-- Las tablas se crearán automáticamente con JPA (ddl-auto=update)
-- Pero si prefieres crearlas manualmente, aquí está el script completo
```

---

Esta es la estructura completa del backend. Cada archivo está documentado con ejemplos de código real que puedes copiar y adaptar.
