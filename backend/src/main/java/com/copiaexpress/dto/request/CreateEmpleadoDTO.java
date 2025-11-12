package com.copiaexpress.dto.request;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public class CreateEmpleadoDTO {

    @NotBlank
    @Size(max = 100)
    private String nombre;

    @NotBlank
    @Email
    @Size(max = 120)
    private String correo;

    @NotBlank
    @Size(max = 30)
    private String telefono;

    @NotBlank
    private String fechaIngreso; // ISO-8601 (yyyy-MM-dd)

    @NotNull
    @Digits(integer = 10, fraction = 2)
    private BigDecimal salario;

    @Size(max = 200)
    private String imagePath;

    @Size(max = 80)
    private String position;

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
