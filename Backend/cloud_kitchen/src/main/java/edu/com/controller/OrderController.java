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
    public List<OrderDto> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy
    ) {

        return orderService.getAllOrders(page, size, sortBy);
    }

    @GetMapping("/vendor/{vendorId}")
    public List<OrderDto> getOrdersByVendor(@PathVariable Long vendorId) {
        return orderService.getOrdersByVendor(vendorId);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateOrder(@RequestBody OrderDto orderDto) {
        if (orderService.updateOrder(orderDto)) {
            return ResponseEntity.ok("Order updated successfully!");
        } else {
            return ResponseEntity.status(404).body("Order not found!");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long id) {
        if (orderService.deleteOrder(id)) {
            return ResponseEntity.ok("Order deleted successfully!");
        } else {
            return ResponseEntity.status(404).body("Order not found!");
        }
    }
}
