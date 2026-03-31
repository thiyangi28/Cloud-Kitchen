package edu.com.controller;

import edu.com.dto.OrderDto;
import edu.com.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<String> placeOrder(@RequestBody OrderDto orderDto) {
        return ResponseEntity.ok(orderService.placeOrder(orderDto));
    }

    @GetMapping("/all")
    public List<OrderDto> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/paged")
    public List<OrderDto> getAllOrdersPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy
    ) {
        return orderService.getAllOrdersPaged(page, size, sortBy);
    }

    @GetMapping("/vendor/{vendorId}")
    public List<OrderDto> getOrdersByVendor(@PathVariable Long vendorId) {
        return orderService.getOrdersByVendor(vendorId);
    }
}
