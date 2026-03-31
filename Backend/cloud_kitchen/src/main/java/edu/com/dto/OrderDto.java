package edu.com.dto;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class OrderDto {
    private Long id;
    private String orderNumber;
    private String customerName;
    private Double totalPrice;
    private String status;
    private Long vendorId;
    private List<OrderItemDto> items;
}
