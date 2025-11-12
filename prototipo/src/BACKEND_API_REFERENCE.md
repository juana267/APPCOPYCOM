# Documentación API Backend - Sistema de Copiadora
## Referencia para implementación en Spring Boot

---

## 📋 Índice
1. [Arquitectura del Sistema](#arquitectura-del-sistema)
2. [Modelos de Datos (Entidades)](#modelos-de-datos)
3. [Endpoints REST API](#endpoints-rest-api)
4. [Relaciones entre Entidades](#relaciones-entre-entidades)
5. [Validaciones de Negocio](#validaciones-de-negocio)
6. [Configuración Recomendada](#configuración-recomendada)

---

## 🏗️ Arquitectura del Sistema

### Capas del Backend (Spring Boot)

```
┌─────────────────────────────────────┐
│     FRONTEND (Angular)              │
│  - Componentes                      │
│  - Servicios HTTP                   │
│  - Guards & Interceptors            │
└─────────────────┬───────────────────┘
                  │ HTTP/REST
┌─────────────────▼───────────────────┐
│     CONTROLLERS (Spring Boot)       │
│  - @RestController                  │
│  - Request/Response DTOs            │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│     SERVICES (Lógica de Negocio)    │
│  - @Service                         │
│  - Validaciones                     │
│  - Cálculos                         │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│     REPOSITORIES (JPA)              │
│  - @Repository                      │
│  - JpaRepository                    │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│     DATABASE (MySQL/PostgreSQL)     │
└─────────────────────────────────────┘
```

---

## 📊 Modelos de Datos (Entidades)

### 1. Cliente
```java
@Entity
@Table(name = "clientes")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String nombre;
    
    @Column(nullable = false, unique = true, length = 100)
    private String email;
    
    @Column(length = 20)
    private String telefono;
    
    @Column(length = 200)
    private String direccion;
    
    @Column(name = "fecha_registro")
    @Temporal(TemporalType.DATE)
    private Date fechaRegistro;
    
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL)
    private List<Pedido> pedidos;
    
    // Getters, Setters, Constructores
}
```

### 2. Servicio
```java
@Entity
@Table(name = "servicios")
public class Servicio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String nombre;
    
    @Column(length = 500)
    private String descripcion;
    
    @Column(name = "precio_base", nullable = false, precision = 10, scale = 2)
    private BigDecimal precioBase;
    
    @Column(length = 50)
    private String categoria;
    
    @Column(name = "tiempo_estimado", length = 50)
    private String tiempoEstimado;
    
    @Column(nullable = false)
    private Boolean activo = true;
    
    @Column(nullable = false)
    private Boolean popular = false;
    
    // Getters, Setters, Constructores
}
```

### 3. Pedido
```java
@Entity
@Table(name = "pedidos")
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "numero_pedido", nullable = false, unique = true, length = 20)
    private String numeroPedido; // PED-001
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;
    
    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date fecha;
    
    @Column(name = "fecha_entrega")
    @Temporal(TemporalType.DATE)
    private Date fechaEntrega;
    
    @Column(length = 1000)
    private String descripcion;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EstadoPedido estado; // PENDIENTE, EN_PROCESO, COMPLETADO, CANCELADO
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal iva;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal total;
    
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemPedido> items;
    
    @OneToOne(mappedBy = "pedido", cascade = CascadeType.ALL)
    private Factura factura;
    
    @OneToOne(mappedBy = "pedido", cascade = CascadeType.ALL)
    private Envio envio;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trabajador_asignado_id")
    private Trabajador trabajadorAsignado;
    
    // Getters, Setters, Constructores
}

enum EstadoPedido {
    PENDIENTE, EN_PROCESO, COMPLETADO, CANCELADO
}
```

### 4. ItemPedido (Detalle del Pedido)
```java
@Entity
@Table(name = "items_pedido")
public class ItemPedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pedido_id", nullable = false)
    private Pedido pedido;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "servicio_id", nullable = false)
    private Servicio servicio;
    
    @Column(nullable = false)
    private Integer cantidad;
    
    @Column(name = "precio_unitario", nullable = false, precision = 10, scale = 2)
    private BigDecimal precioUnitario;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal;
    
    // Getters, Setters, Constructores
}
```

### 5. Factura
```java
@Entity
@Table(name = "facturas")
public class Factura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "numero_factura", nullable = false, unique = true, length = 20)
    private String numeroFactura; // A-001
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pedido_id", nullable = false)
    private Pedido pedido;
    
    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date fecha;
    
    @Column(name = "rfc_cliente", length = 20)
    private String rfcCliente;
    
    @Column(name = "direccion_cliente", length = 200)
    private String direccionCliente;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal iva;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal total;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "metodo_pago", nullable = false, length = 20)
    private MetodoPago metodoPago; // EFECTIVO, TARJETA, TRANSFERENCIA
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EstadoFactura estado; // PAGADA, PENDIENTE, CANCELADA
    
    // Getters, Setters, Constructores
}

enum MetodoPago {
    EFECTIVO, TARJETA, TRANSFERENCIA
}

enum EstadoFactura {
    PAGADA, PENDIENTE, CANCELADA
}
```

### 6. Material
```java
@Entity
@Table(name = "materiales")
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String nombre;
    
    @Column(length = 50)
    private String categoria;
    
    @Column(name = "cantidad_actual", nullable = false)
    private Integer cantidadActual;
    
    @Column(name = "cantidad_minima", nullable = false)
    private Integer cantidadMinima;
    
    @Column(nullable = false, length = 20)
    private String unidad; // hojas, metros, kg, etc.
    
    @Column(name = "precio_unitario", nullable = false, precision = 10, scale = 2)
    private BigDecimal precioUnitario;
    
    @Column(length = 100)
    private String proveedor;
    
    @Column(name = "ultima_compra")
    @Temporal(TemporalType.DATE)
    private Date ultimaCompra;
    
    // Getters, Setters, Constructores
}
```

### 7. Trabajador
```java
@Entity
@Table(name = "trabajadores")
public class Trabajador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String nombre;
    
    @Column(nullable = false, unique = true, length = 100)
    private String email;
    
    @Column(length = 20)
    private String telefono;
    
    @Column(nullable = false, length = 50)
    private String puesto;
    
    @Column(nullable = false, length = 50)
    private String departamento;
    
    @Column(name = "fecha_contratacion", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date fechaContratacion;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal salario;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EstadoTrabajador estado; // ACTIVO, INACTIVO, VACACIONES
    
    @Column(length = 100)
    private String password; // Hash de contraseña
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private RolTrabajador rol; // ADMIN, OPERADOR, DISEÑADOR, REPARTIDOR
    
    // Getters, Setters, Constructores
}

enum EstadoTrabajador {
    ACTIVO, INACTIVO, VACACIONES
}

enum RolTrabajador {
    ADMIN, OPERADOR, DISEÑADOR, REPARTIDOR
}
```

### 8. Maquina
```java
@Entity
@Table(name = "maquinas")
public class Maquina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String nombre;
    
    @Column(nullable = false, length = 50)
    private String tipo; // Impresora, Copiadora, Plotter, etc.
    
    @Column(length = 50)
    private String marca;
    
    @Column(length = 100)
    private String modelo;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EstadoMaquina estado; // OPERATIVA, EN_USO, MANTENIMIENTO, FUERA_SERVICIO
    
    @Column(length = 100)
    private String ubicacion;
    
    @Column(name = "fecha_compra")
    @Temporal(TemporalType.DATE)
    private Date fechaCompra;
    
    @Column(name = "ultimo_mantenimiento")
    @Temporal(TemporalType.DATE)
    private Date ultimoMantenimiento;
    
    @Column(name = "proximo_mantenimiento")
    @Temporal(TemporalType.DATE)
    private Date proximoMantenimiento;
    
    @Column(name = "nivel_consumo")
    private Integer nivelConsumo; // 0-100
    
    @Column(length = 500)
    private String observaciones;
    
    // Getters, Setters, Constructores
}

enum EstadoMaquina {
    OPERATIVA, EN_USO, MANTENIMIENTO, FUERA_SERVICIO
}
```

### 9. Envio
```java
@Entity
@Table(name = "envios")
public class Envio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "numero_envio", nullable = false, unique = true, length = 20)
    private String numeroEnvio; // ENV-001
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pedido_id", nullable = false)
    private Pedido pedido;
    
    @Column(nullable = false, length = 200)
    private String direccion;
    
    @Column(nullable = false, length = 100)
    private String ciudad;
    
    @Column(length = 20)
    private String telefono;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EstadoEnvio estado; // PENDIENTE, EN_PREPARACION, EN_TRANSITO, ENTREGADO, CANCELADO
    
    @Column(name = "fecha_envio")
    @Temporal(TemporalType.DATE)
    private Date fechaEnvio;
    
    @Column(name = "fecha_entrega_estimada")
    @Temporal(TemporalType.DATE)
    private Date fechaEntregaEstimada;
    
    @Column(name = "fecha_entrega_real")
    @Temporal(TemporalType.DATE)
    private Date fechaEntregaReal;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "repartidor_id")
    private Trabajador repartidor;
    
    @Column(length = 500)
    private String observaciones;
    
    // Getters, Setters, Constructores
}

enum EstadoEnvio {
    PENDIENTE, EN_PREPARACION, EN_TRANSITO, ENTREGADO, CANCELADO
}
```

---

## 🔌 Endpoints REST API

### Base URL: `/api/v1`

### 1. Clientes (`/api/v1/clientes`)

```java
// GET - Listar todos los clientes
GET /api/v1/clientes
Response: List<ClienteDTO>

// GET - Obtener cliente por ID
GET /api/v1/clientes/{id}
Response: ClienteDTO

// POST - Crear nuevo cliente
POST /api/v1/clientes
Request Body: {
    "nombre": "Juan Pérez",
    "email": "juan@email.com",
    "telefono": "555-0101",
    "direccion": "Av. Principal 123"
}
Response: ClienteDTO

// PUT - Actualizar cliente
PUT /api/v1/clientes/{id}
Request Body: ClienteDTO
Response: ClienteDTO

// DELETE - Eliminar cliente
DELETE /api/v1/clientes/{id}
Response: 204 No Content

// GET - Búsqueda de clientes
GET /api/v1/clientes/buscar?q={termino}
Response: List<ClienteDTO>

// GET - Obtener estadísticas del cliente
GET /api/v1/clientes/{id}/estadisticas
Response: {
    "totalPedidos": 15,
    "totalGastado": 1850.00,
    "ultimoPedido": "2024-11-05"
}
```

### 2. Servicios (`/api/v1/servicios`)

```java
// GET - Listar todos los servicios
GET /api/v1/servicios
Response: List<ServicioDTO>

// GET - Listar servicios activos
GET /api/v1/servicios/activos
Response: List<ServicioDTO>

// GET - Obtener servicio por ID
GET /api/v1/servicios/{id}
Response: ServicioDTO

// POST - Crear nuevo servicio
POST /api/v1/servicios
Request Body: {
    "nombre": "Impresión a Color",
    "descripcion": "Impresión en alta calidad",
    "precioBase": 0.25,
    "categoria": "Impresión",
    "tiempoEstimado": "1-2 días",
    "popular": true
}
Response: ServicioDTO

// PUT - Actualizar servicio
PUT /api/v1/servicios/{id}
Request Body: ServicioDTO
Response: ServicioDTO

// DELETE - Eliminar servicio (soft delete)
DELETE /api/v1/servicios/{id}
Response: 204 No Content

// GET - Servicios por categoría
GET /api/v1/servicios/categoria/{categoria}
Response: List<ServicioDTO>

// GET - Servicios populares
GET /api/v1/servicios/populares
Response: List<ServicioDTO>
```

### 3. Pedidos (`/api/v1/pedidos`)

```java
// GET - Listar todos los pedidos
GET /api/v1/pedidos
Query Params: ?estado={estado}&page={page}&size={size}
Response: Page<PedidoDTO>

// GET - Obtener pedido por ID
GET /api/v1/pedidos/{id}
Response: PedidoDTO con items

// POST - Crear nuevo pedido
POST /api/v1/pedidos
Request Body: {
    "clienteId": 1,
    "fechaEntrega": "2024-11-10",
    "descripcion": "Pedido urgente",
    "items": [
        {
            "servicioId": 1,
            "cantidad": 500
        },
        {
            "servicioId": 3,
            "cantidad": 100
        }
    ]
}
Response: PedidoDTO
// El backend calcula automáticamente:
// - precioUnitario (desde servicio)
// - subtotal de cada item (cantidad * precioUnitario)
// - subtotal del pedido (suma de subtotales)
// - iva (subtotal * 0.16)
// - total (subtotal + iva)

// PUT - Actualizar estado del pedido
PUT /api/v1/pedidos/{id}/estado
Request Body: {
    "estado": "EN_PROCESO",
    "trabajadorAsignadoId": 2
}
Response: PedidoDTO

// PUT - Actualizar pedido completo
PUT /api/v1/pedidos/{id}
Request Body: PedidoDTO
Response: PedidoDTO

// DELETE - Cancelar pedido
DELETE /api/v1/pedidos/{id}
Response: 204 No Content

// GET - Búsqueda de pedidos
GET /api/v1/pedidos/buscar?q={termino}&estado={estado}
Response: List<PedidoDTO>

// GET - Pedidos por cliente
GET /api/v1/pedidos/cliente/{clienteId}
Response: List<PedidoDTO>

// GET - Pedidos por fecha
GET /api/v1/pedidos/fecha?desde={fecha}&hasta={fecha}
Response: List<PedidoDTO>
```

### 4. Facturación (`/api/v1/facturas`)

```java
// GET - Listar todas las facturas
GET /api/v1/facturas
Query Params: ?estado={estado}&page={page}&size={size}
Response: Page<FacturaDTO>

// GET - Obtener factura por ID
GET /api/v1/facturas/{id}
Response: FacturaDTO completa

// POST - Generar factura desde pedido
POST /api/v1/facturas/generar
Request Body: {
    "pedidoId": 1,
    "rfcCliente": "GOMA850315ABC",
    "direccionCliente": "Calle 123",
    "metodoPago": "TARJETA"
}
Response: FacturaDTO

// PUT - Actualizar estado de factura
PUT /api/v1/facturas/{id}/estado
Request Body: {
    "estado": "PAGADA"
}
Response: FacturaDTO

// GET - Búsqueda de facturas
GET /api/v1/facturas/buscar?q={termino}
Response: List<FacturaDTO>

// GET - Facturas por cliente
GET /api/v1/facturas/cliente/{clienteId}
Response: List<FacturaDTO>

// GET - Estadísticas de facturación
GET /api/v1/facturas/estadisticas
Query Params: ?mes={mes}&año={año}
Response: {
    "totalFacturado": 48900.00,
    "totalPendiente": 2500.00,
    "totalFacturas": 156,
    "facturasPagadas": 145,
    "facturasPendientes": 11
}

// GET - Descargar PDF
GET /api/v1/facturas/{id}/pdf
Response: application/pdf
```

### 5. Materiales (`/api/v1/materiales`)

```java
// GET - Listar todos los materiales
GET /api/v1/materiales
Response: List<MaterialDTO>

// GET - Materiales con stock bajo
GET /api/v1/materiales/stock-bajo
Response: List<MaterialDTO>
// Retorna materiales donde cantidadActual < cantidadMinima

// GET - Obtener material por ID
GET /api/v1/materiales/{id}
Response: MaterialDTO

// POST - Crear nuevo material
POST /api/v1/materiales
Request Body: {
    "nombre": "Papel Bond Carta",
    "categoria": "Papel",
    "cantidadActual": 5000,
    "cantidadMinima": 2000,
    "unidad": "hojas",
    "precioUnitario": 0.02,
    "proveedor": "Papelería Central"
}
Response: MaterialDTO

// PUT - Actualizar material
PUT /api/v1/materiales/{id}
Request Body: MaterialDTO
Response: MaterialDTO

// PUT - Actualizar stock
PUT /api/v1/materiales/{id}/stock
Request Body: {
    "cantidad": 1000,
    "tipo": "ENTRADA" // o "SALIDA"
}
Response: MaterialDTO

// DELETE - Eliminar material
DELETE /api/v1/materiales/{id}
Response: 204 No Content

// GET - Materiales por categoría
GET /api/v1/materiales/categoria/{categoria}
Response: List<MaterialDTO>
```

### 6. Trabajadores (`/api/v1/trabajadores`)

```java
// GET - Listar todos los trabajadores
GET /api/v1/trabajadores
Query Params: ?departamento={departamento}&estado={estado}
Response: List<TrabajadorDTO>

// GET - Obtener trabajador por ID
GET /api/v1/trabajadores/{id}
Response: TrabajadorDTO

// POST - Crear nuevo trabajador
POST /api/v1/trabajadores
Request Body: {
    "nombre": "Roberto Sánchez",
    "email": "roberto@copiaexpress.com",
    "telefono": "555-1001",
    "puesto": "Operador",
    "departamento": "Producción",
    "fechaContratacion": "2024-01-15",
    "salario": 1200.00,
    "password": "password123",
    "rol": "OPERADOR"
}
Response: TrabajadorDTO

// PUT - Actualizar trabajador
PUT /api/v1/trabajadores/{id}
Request Body: TrabajadorDTO
Response: TrabajadorDTO

// DELETE - Eliminar trabajador (soft delete)
DELETE /api/v1/trabajadores/{id}
Response: 204 No Content

// GET - Trabajadores por departamento
GET /api/v1/trabajadores/departamento/{departamento}
Response: List<TrabajadorDTO>

// POST - Login de trabajador
POST /api/v1/trabajadores/login
Request Body: {
    "email": "roberto@copiaexpress.com",
    "password": "password123"
}
Response: {
    "token": "jwt-token",
    "trabajador": TrabajadorDTO
}
```

### 7. Máquinas (`/api/v1/maquinas`)

```java
// GET - Listar todas las máquinas
GET /api/v1/maquinas
Query Params: ?estado={estado}&tipo={tipo}
Response: List<MaquinaDTO>

// GET - Obtener máquina por ID
GET /api/v1/maquinas/{id}
Response: MaquinaDTO

// POST - Crear nueva máquina
POST /api/v1/maquinas
Request Body: {
    "nombre": "Impresora Láser Principal",
    "tipo": "Impresora Láser",
    "marca": "HP",
    "modelo": "LaserJet Pro M454dw",
    "estado": "OPERATIVA",
    "ubicacion": "Área de Producción - Zona A",
    "fechaCompra": "2022-03-15",
    "nivelConsumo": 100
}
Response: MaquinaDTO

// PUT - Actualizar máquina
PUT /api/v1/maquinas/{id}
Request Body: MaquinaDTO
Response: MaquinaDTO

// PUT - Actualizar estado
PUT /api/v1/maquinas/{id}/estado
Request Body: {
    "estado": "MANTENIMIENTO",
    "observaciones": "Mantenimiento preventivo"
}
Response: MaquinaDTO

// POST - Registrar mantenimiento
POST /api/v1/maquinas/{id}/mantenimiento
Request Body: {
    "fecha": "2024-11-07",
    "proximoMantenimiento": "2025-02-07",
    "observaciones": "Cambio de tóner y limpieza"
}
Response: MaquinaDTO

// DELETE - Eliminar máquina
DELETE /api/v1/maquinas/{id}
Response: 204 No Content

// GET - Máquinas que requieren mantenimiento
GET /api/v1/maquinas/mantenimiento-proximo
Response: List<MaquinaDTO>
```

### 8. Envíos (`/api/v1/envios`)

```java
// GET - Listar todos los envíos
GET /api/v1/envios
Query Params: ?estado={estado}&repartidorId={id}
Response: List<EnvioDTO>

// GET - Obtener envío por ID
GET /api/v1/envios/{id}
Response: EnvioDTO

// POST - Crear nuevo envío
POST /api/v1/envios
Request Body: {
    "pedidoId": 1,
    "direccion": "Av. Principal 123",
    "ciudad": "Ciudad de México",
    "telefono": "555-0101",
    "fechaEnvio": "2024-11-08",
    "fechaEntregaEstimada": "2024-11-09",
    "repartidorId": 7,
    "observaciones": "Entregar en horario de oficina"
}
Response: EnvioDTO

// PUT - Actualizar estado de envío
PUT /api/v1/envios/{id}/estado
Request Body: {
    "estado": "EN_TRANSITO"
}
Response: EnvioDTO

// PUT - Registrar entrega
PUT /api/v1/envios/{id}/entregar
Request Body: {
    "fechaEntregaReal": "2024-11-09"
}
Response: EnvioDTO

// GET - Envíos por repartidor
GET /api/v1/envios/repartidor/{repartidorId}
Response: List<EnvioDTO>

// GET - Envíos pendientes
GET /api/v1/envios/pendientes
Response: List<EnvioDTO>
```

### 9. Reportes (`/api/v1/reportes`)

```java
// GET - Dashboard general
GET /api/v1/reportes/dashboard
Response: {
    "pedidosActivos": 24,
    "clientesTotales": 156,
    "ingresosMes": 45890.00,
    "materialesBajos": 7,
    "cambioVentas": 23.5,
    "cambioPedidos": 12.0
}

// GET - Ventas por período
GET /api/v1/reportes/ventas
Query Params: ?periodo={DIA|MES|AÑO}&desde={fecha}&hasta={fecha}
Response: [
    {
        "fecha": "2024-11-01",
        "ventas": 1250.00,
        "pedidos": 8
    },
    ...
]

// GET - Servicios más vendidos
GET /api/v1/reportes/servicios-vendidos
Query Params: ?periodo={MES|TRIMESTRE|AÑO}
Response: [
    {
        "servicio": "Impresión a Color",
        "ventas": 12500.00,
        "cantidad": 285,
        "porcentaje": 28
    },
    ...
]

// GET - Top clientes
GET /api/v1/reportes/top-clientes
Query Params: ?limite={numero}
Response: [
    {
        "cliente": "Carlos Ruiz",
        "pedidos": 22,
        "totalGastado": 3240.75
    },
    ...
]

// GET - Ventas por servicio (para gráfico pie)
GET /api/v1/reportes/distribucion-servicios
Response: [
    {
        "nombre": "Impresión a Color",
        "valor": 12500
    },
    ...
]

// GET - Comparativa mensual
GET /api/v1/reportes/comparativa-mensual
Query Params: ?meses={numero}
Response: [
    {
        "mes": "Octubre",
        "ventas": 45800,
        "pedidos": 223
    },
    ...
]

// GET - Exportar reporte en PDF
GET /api/v1/reportes/exportar
Query Params: ?tipo={VENTAS|SERVICIOS|CLIENTES}&formato={PDF|EXCEL}
Response: application/pdf o application/vnd.ms-excel
```

---

## 🔗 Relaciones entre Entidades

```
Cliente (1) ----< (N) Pedido
Pedido (1) ----< (N) ItemPedido
Servicio (1) ----< (N) ItemPedido
Pedido (1) ---- (1) Factura
Pedido (1) ---- (1) Envio
Trabajador (1) ----< (N) Pedido (asignado)
Trabajador (1) ----< (N) Envio (repartidor)
```

---

## ✅ Validaciones de Negocio

### Al crear un Pedido:
1. El cliente debe existir
2. Todos los servicios deben existir y estar activos
3. Las cantidades deben ser mayores a 0
4. La fecha de entrega debe ser mayor o igual a la fecha actual
5. Calcular automáticamente:
   - `precioUnitario` desde el servicio
   - `subtotal` de cada item = cantidad * precioUnitario
   - `subtotal` del pedido = suma de subtotales de items
   - `iva` = subtotal * 0.16
   - `total` = subtotal + iva
6. Generar `numeroPedido` único (PED-XXX)

### Al generar una Factura:
1. El pedido debe existir y estar completado
2. El pedido no debe tener factura previa
3. Generar `numeroFactura` único (A-XXX)
4. Copiar totales desde el pedido
5. Estado inicial = PENDIENTE

### Al crear un Envío:
1. El pedido debe existir
2. El repartidor debe existir y ser del departamento Logística
3. La fecha de envío debe ser >= fecha actual
4. Estado inicial = PENDIENTE

### Al actualizar Stock de Material:
1. Si es SALIDA, validar que haya suficiente stock
2. Después de actualizar, verificar si está por debajo del mínimo
3. Si está bajo, generar alerta

---

## ⚙️ Configuración Recomendada

### application.properties (Spring Boot)

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/copiadora_db
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Server Configuration
server.port=8080
server.servlet.context-path=/api/v1

# JWT Configuration
jwt.secret=mi-clave-secreta-super-segura-2024
jwt.expiration=86400000

# File Upload
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB

# CORS Configuration
cors.allowed-origins=http://localhost:4200
```

### pom.xml (Dependencias Maven)

```xml
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
        <scope>runtime</scope>
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
    
    <!-- Spring Security + JWT -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt</artifactId>
        <version>0.9.1</version>
    </dependency>
    
    <!-- iText for PDF generation -->
    <dependency>
        <groupId>com.itextpdf</groupId>
        <artifactId>itextpdf</artifactId>
        <version>5.5.13.3</version>
    </dependency>
</dependencies>
```

---

## 📱 Mapeo React → Angular

### Componentes React → Angular

| React Component | Angular Component |
|----------------|-------------------|
| `Dashboard.tsx` | `dashboard.component.ts` |
| `Pedidos.tsx` | `pedidos.component.ts` |
| `Clientes.tsx` | `clientes.component.ts` |
| `Facturacion.tsx` | `facturacion.component.ts` |
| `Reportes.tsx` | `reportes.component.ts` |

### Hooks React → Angular Services

```typescript
// React (useState)
const [pedidos, setPedidos] = useState<Pedido[]>([]);

// Angular Service
@Injectable()
export class PedidoService {
  private pedidos$ = new BehaviorSubject<Pedido[]>([]);
  
  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>('/api/v1/pedidos');
  }
}
```

### HTTP Calls

```typescript
// Angular Service
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private apiUrl = 'http://localhost:8080/api/v1';
  
  constructor(private http: HttpClient) {}
  
  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/pedidos`);
  }
  
  createPedido(pedido: CreatePedidoDTO): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.apiUrl}/pedidos`, pedido);
  }
  
  updatePedido(id: number, pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrl}/pedidos/${id}`, pedido);
  }
  
  deletePedido(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/pedidos/${id}`);
  }
}
```

---

## 🎯 Próximos Pasos

1. **Backend (Spring Boot)**:
   - Crear proyecto Spring Boot
   - Implementar entidades
   - Crear repositorios JPA
   - Implementar servicios de negocio
   - Crear controladores REST
   - Configurar seguridad JWT
   - Implementar generación de PDFs

2. **Frontend (Angular)**:
   - Crear proyecto Angular
   - Implementar servicios HTTP
   - Crear componentes
   - Configurar routing
   - Implementar guards de autenticación
   - Integrar gráficos (ng2-charts)
   - Diseñar UI con Angular Material o Bootstrap

3. **Testing**:
   - Unit tests para servicios
   - Integration tests para endpoints
   - E2E tests con Protractor/Cypress

---

Esta documentación te servirá como guía completa para implementar el sistema en Spring Boot + Angular. Todos los cálculos, validaciones y lógica de negocio están detallados para facilitar la implementación.
