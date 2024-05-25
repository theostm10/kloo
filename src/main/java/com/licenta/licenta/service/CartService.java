package com.licenta.licenta.service;

import com.licenta.licenta.data.dto.CartDto;
import com.licenta.licenta.data.dto.CartItemDto;
import com.licenta.licenta.data.entity.Cart;
import com.licenta.licenta.data.entity.CartItem;
import com.licenta.licenta.data.entity.Product;
import com.licenta.licenta.data.entity.User;
import com.licenta.licenta.exception.InsufficientStockException;
import com.licenta.licenta.repo.CartItemsRepo;
import com.licenta.licenta.repo.CartsRepo;
import com.licenta.licenta.repo.ProductsRepo;
import com.licenta.licenta.repo.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CartService {
    private final CartsRepo cartsRepo;
    private final CartItemsRepo cartItemsRepo;
    private final ProductsRepo productsRepo;
    private final UsersRepo usersRepo;

    @Autowired
    public CartService(CartsRepo cartsRepo, CartItemsRepo cartItemsRepo, ProductsRepo productsRepo, UsersRepo usersRepo) {
        this.cartsRepo = cartsRepo;
        this.cartItemsRepo = cartItemsRepo;
        this.productsRepo = productsRepo;
        this.usersRepo = usersRepo;
    }

    @Transactional
    public CartDto addToCart(UUID userId, CartItemDto cartItemDto) {
        System.out.println(userId.toString() +  cartItemDto);
        User user = usersRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productsRepo.findById(cartItemDto.getProductId()).orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getStockQuantity() < cartItemDto.getQuantity()) {
            throw new InsufficientStockException("Insufficient stock for product: " + product.getName());
        }

        // Place a hold on the stock.
        product.setStockQuantity(product.getStockQuantity() - cartItemDto.getQuantity());
        productsRepo.save(product);

        Cart cart = cartsRepo.findByUserId(userId).orElse(null);
        if (cart == null) {
            // If not, create a new cart, save it, and set it to the user
            cart = new Cart();
            cart.setUser(user);
            cart.setItems(new ArrayList<>());
            cart = cartsRepo.save(cart); // Save the cart to give it an ID
        }

        Optional<CartItem> existingItem = cartItemsRepo.findByCartIdAndProductId(cart.getId(), product.getId());
        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + cartItemDto.getQuantity());
            cartItemsRepo.save(item);
        } else {
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduct(product);
            newItem.setQuantity(cartItemDto.getQuantity());
            cartItemsRepo.save(newItem);
            cart.getItems().add(newItem);
        }

        return convertCartToDto(cart);
    }

    @Transactional
    public void removeCartItem(UUID userId, UUID cartItemId) {
        CartItem item = cartItemsRepo.findById(cartItemId).orElseThrow(() -> new RuntimeException("Cart item not found"));
        if (item.getCart().getUser().getId().equals(userId)) {
            cartItemsRepo.delete(item);
        } else {
            throw new RuntimeException("Unauthorized access to cart item");
        }
        Product product = item.getProduct();
        product.setStockQuantity(product.getStockQuantity() + item.getQuantity());
        productsRepo.save(product);

        // Remove the item from the cart
        cartItemsRepo.delete(item);
    }

    @Transactional
    public CartDto updateCartItem(UUID userId, UUID cartItemId, int newQuantity) {
        CartItem cartItem = cartItemsRepo.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        // Check if the cart item belongs to the user's cart
        if (!cartItem.getCart().getUser().getId().equals(userId)) {
            throw new RuntimeException("Cart item does not belong to user");
        }

        Product product = cartItem.getProduct();
        int currentQuantity = cartItem.getQuantity();
        int quantityDifference = newQuantity - currentQuantity;

        // Check if there is enough stock to increase the quantity
        if (quantityDifference > 0 && product.getStockQuantity() < quantityDifference) {
            throw new InsufficientStockException("Insufficient stock for product: " + product.getName());
        }

        // Update the cart item quantity
        cartItem.setQuantity(newQuantity);
        cartItemsRepo.save(cartItem);

        // Update the product stock
        product.setStockQuantity(product.getStockQuantity() - quantityDifference);
        productsRepo.save(product);

        // Refresh the cart and return the updated DTO
        Cart cart = cartItem.getCart();
        return convertCartToDto(cart);
    }


    public CartDto getCartByUserId(UUID userId) {
        Cart cart = cartsRepo.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user with id: " + userId));
        return convertCartToDto(cart);
    }

    private CartDto convertCartToDto(Cart cart) {
        CartDto cartDto = new CartDto();
        cartDto.setItems(cart.getItems().stream().map(this::convertCartItemToDto).collect(Collectors.toList()));
        cartDto.setTotal(cart.getItems().stream().mapToDouble(item -> item.getProduct().getPrice() * item.getQuantity()).sum());
        return cartDto;
    }

    private CartItemDto convertCartItemToDto(CartItem cartItem) {
        CartItemDto dto = new CartItemDto();
        dto.setProductName(cartItem.getProduct().getName());
        dto.setPrice(cartItem.getProduct().getPrice());
        dto.setQuantity(cartItem.getQuantity());
        return dto;
    }
}
