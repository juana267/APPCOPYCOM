package com.copiaexpress.dto.response;

import java.math.BigDecimal;

public class EmpleadoDTO {
    private Long id;
    private String nombre;
    private String correo;
    private String telefono;
    private String fechaIngreso; // ISO-8601 (yyyy-MM-dd)
    private BigDecimal salario;
    private String imagePath;
    private String position;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public String getFechaIngreso() { return fechaIngreso; }
    public void setFechaIngreso(String fechaIngreso) { this.fechaIngreso = fechaIngreso; }

    public BigDecimal getSalario() { return salario; }
    public void setSalario(BigDecimal salario) { this.salario = salario; }

    public String getImagePath() { return imagePath; }
    public void setImagePath(String imagePath) { this.imagePath = imagePath; }

    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }
}
