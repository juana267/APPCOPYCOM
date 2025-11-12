package com.copiaexpress.repository;

import com.copiaexpress.model.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Long> {

    @Query("SELECT s FROM Servicio s WHERE s.activo = true")
    List<Servicio> findActivos();

    @Query("SELECT s FROM Servicio s WHERE LOWER(s.nombre) LIKE LOWER(CONCAT('%', :q, '%'))")
    List<Servicio> search(@Param("q") String q);

    @Query("SELECT s FROM Servicio s WHERE s.categoria = :categoria")
    List<Servicio> findByCategoria(@Param("categoria") String categoria);
}
