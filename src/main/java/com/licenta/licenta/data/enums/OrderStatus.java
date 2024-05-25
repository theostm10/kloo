package com.licenta.licenta.data.enums;

public enum OrderStatus {
    PREPARING,      // Order has been received and is being prepared.
    SENT_TO_DRIVER, // Order has been handed over to a delivery service or driver.
    ON_THE_WAY,     // Order is currently en route to the customer.
    DELIVERED,      // Order has been delivered to the customer.
    CANCELLED       // Order has been cancelled.
}

