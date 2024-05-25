package com.licenta.licenta.rest;

import com.licenta.licenta.data.dto.CartDto;
import com.licenta.licenta.data.dto.CartItemDto;
import com.licenta.licenta.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/carts")
@CrossOrigin(origins = "http://localhost:3000")
public class CartApiRest {
    private final CartService cartService;

    @Autowired
    public CartApiRest(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/{userId}/add")
    public ResponseEntity<CartDto> addToCart(@PathVariable UUID userId, @RequestBody CartItemDto cartItemDto) {
        CartDto cartDto = cartService.addToCart(userId, cartItemDto);
        return ResponseEntity.ok(cartDto);
    }

    @PutMapping("/{userId}/update/{cartItemId}")
    public ResponseEntity<CartDto> updateCartItem(@PathVariable UUID userId, @PathVariable UUID cartItemId, @RequestBody int quantity) {
        CartDto cartDto = cartService.updateCartItem(userId, cartItemId, quantity);
        return ResponseEntity.ok(cartDto);
    }

    @DeleteMapping("/{userId}/remove/{cartItemId}")
    public ResponseEntity<Void> removeCartItem(@PathVariable UUID userId, @PathVariable UUID cartItemId) {
        cartService.removeCartItem(userId, cartItemId);
        return ResponseEntity.noContent().build();
    }

    // This assumes you might also want to get the contents of the cart
    @GetMapping("/{userId}")
    public ResponseEntity<CartDto> getCart(@PathVariable UUID userId) {
        CartDto cartDto = cartService.getCartByUserId(userId);
        return ResponseEntity.ok(cartDto);
    }
}
