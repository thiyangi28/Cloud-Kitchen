package edu.com.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "vendors")
public class Vendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String contact;
    private String location;

    @OneToMany(mappedBy = "vendor", cascade = CascadeType.ALL)
    private List<Order> orders;

    @OneToMany(mappedBy = "vendor", cascade = CascadeType.ALL)
    private List<MenuItem> menuItems;
}
