package com.licenta.licenta.rest;

import com.licenta.licenta.data.dto.OrderDto;
import com.licenta.licenta.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderApiRest {
    private final OrderService orderService;

    @Autowired
    public OrderApiRest(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/convert-cart/{userId}")
    public ResponseEntity<OrderDto> convertCartToOrder(@PathVariable UUID userId) {
        OrderDto orderDto = orderService.convertCartToOrder(userId);
        return ResponseEntity.ok(orderDto);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable UUID orderId) {
        OrderDto orderDto = orderService.getOrderById(orderId);
        return ResponseEntity.ok(orderDto);
    }

    @PutMapping("/{orderId}/update-status")
    public ResponseEntity<OrderDto> updateOrderStatus(@PathVariable UUID orderId, @RequestBody String status) {
        OrderDto orderDto = orderService.updateOrderStatus(orderId, status);
        return ResponseEntity.ok(orderDto);
    }

    // You might also want to implement an endpoint to list all orders for a user or system
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderDto>> getOrdersByUserId(@PathVariable UUID userId) {
        List<OrderDto> orders = orderService.getOrdersByUserId(userId);
        return ResponseEntity.ok(orders);
    }
}
