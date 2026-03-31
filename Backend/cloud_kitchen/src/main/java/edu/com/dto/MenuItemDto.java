package edu.com.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MenuItemDto {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Boolean available;
    private Long vendorId;
}
