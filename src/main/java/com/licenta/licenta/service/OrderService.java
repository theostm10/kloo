package com.licenta.licenta.service;

import com.licenta.licenta.data.dto.OrderDto;
import com.licenta.licenta.data.dto.OrderItemDto;
import com.licenta.licenta.data.entity.*;
import com.licenta.licenta.data.enums.OrderStatus;
import com.licenta.licenta.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderService {
    private final OrdersRepo ordersRepo;
    private final CartItemsRepo cartItemsRepo;
    private final CartsRepo cartsRepo;
    private final OrderItemsRepo orderItemsRepo;

    @Autowired
    public OrderService(OrdersRepo ordersRepo, CartItemsRepo cartItemsRepo,
                        CartsRepo cartsRepo, OrderItemsRepo orderItemsRepo) {
        this.ordersRepo = ordersRepo;
        this.cartItemsRepo = cartItemsRepo;
        this.cartsRepo = cartsRepo;
        this.orderItemsRepo = orderItemsRepo;
    }

    @Transactional
    public OrderDto convertCartToOrder(UUID userId) {
        Cart cart = cartsRepo.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user with id: " + userId));

        Order order = new Order();
        order.setUser(cart.getUser());
        order.setOrderDate(OffsetDateTime.now());
        order.setStatus(OrderStatus.PREPARING); // assuming you have this status defined
        ordersRepo.save(order);

        List<OrderItem> orderItems = cart.getItems().stream().map(cartItem -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getProduct().getPrice()); // Or use a price service if pricing varies
            return orderItem;
        }).collect(Collectors.toList());

        orderItemsRepo.saveAll(orderItems);
        order.setItems(orderItems);  // Use the correct method name
        cartsRepo.delete(cart); // Optionally, delete or clear the cart after conversion

        return convertOrderToDto(order);
    }

    public OrderDto getOrderById(UUID orderId) {
        Order order = ordersRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
        return convertOrderToDto(order);
    }

    @Transactional
    public OrderDto updateOrderStatus(UUID orderId, String status) {
        Order order = ordersRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
        order.setStatus(OrderStatus.valueOf(status));
        ordersRepo.save(order);
        return convertOrderToDto(order);
    }

    public List<OrderDto> getOrdersByUserId(UUID userId) {
        List<Order> orders = ordersRepo.findByUserId(userId);
        return orders.stream().map(this::convertOrderToDto).collect(Collectors.toList());
    }

    private OrderDto convertOrderToDto(Order order) {
        List<OrderItemDto> itemDtos = order.getItems().stream()  // Use the correct method name
                .map(this::convertOrderItemToDto)
                .collect(Collectors.toList());

        OrderDto orderDto = new OrderDto();
        orderDto.setId(order.getId());
        orderDto.setOrderDate(order.getOrderDate());
        orderDto.setStatus(order.getStatus().toString());
        orderDto.setItems(itemDtos);
        double total = itemDtos.stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity()) // Price multiplied by quantity
                .sum();

        orderDto.setTotal(total);
        return orderDto;
    }

    private OrderItemDto convertOrderItemToDto(OrderItem orderItem) {
        OrderItemDto dto = new OrderItemDto();
        dto.setProductName(orderItem.getProduct().getName());
        dto.setPrice(orderItem.getPrice());
        dto.setQuantity(orderItem.getQuantity());
        return dto;
    }
}
