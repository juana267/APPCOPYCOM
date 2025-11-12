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

    @Query("SELECT p FROM Pedido p WHERE LOWER(p.numeroPedido) LIKE LOWER(CONCAT('%', :q, '%')) " +
           "OR LOWER(p.cliente.nombre) LIKE LOWER(CONCAT('%', :q, '%')) " +
           "OR LOWER(p.descripcion) LIKE LOWER(CONCAT('%', :q, '%'))")
    List<Pedido> searchPedidos(@Param("q") String q);
}
