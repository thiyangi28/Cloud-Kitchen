package edu.com.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class VendorDto {
    private Long id;
    private String name;
    private String contact;
    private String location;
}
