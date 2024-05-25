package com.licenta.licenta.data.dto;

import java.util.List;

public class CartDto {
    private List<CartItemDto> items;
    private double total;

    public List<CartItemDto> getItems() {
        return items;
    }

    public void setItems(List<CartItemDto> items) {
        this.items = items;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }
}
