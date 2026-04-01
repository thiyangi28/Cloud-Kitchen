package edu.com.service.impl;

import edu.com.dto.OrderDto;
import edu.com.dto.OrderItemDto;
import edu.com.entity.MenuItem;
import edu.com.entity.Order;
import edu.com.entity.OrderItem;
import edu.com.entity.Vendor;
import edu.com.exception.ResourceNotFoundException;
import edu.com.repository.MenuItemRepository;
import edu.com.repository.OrderItemRepository;
import edu.com.repository.OrderRepository;
import edu.com.repository.VendorRepository;
import edu.com.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Override
    @Transactional
    public String placeOrder(OrderDto orderDto) {
        Vendor vendor = vendorRepository.findById(orderDto.getVendorId())
                .orElseThrow(() -> new ResourceNotFoundException("Vendor with ID " + orderDto.getVendorId() + " not found!"));

        Order order = new Order();
        order.setOrderNumber("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        order.setCustomerName(orderDto.getCustomerName());
        order.setStatus("PENDING");
        order.setVendor(vendor);

        List<OrderItem> orderItems = new ArrayList<>();
        double calculatedTotal = 0;

        for (OrderItemDto itemDto : orderDto.getItems()) {
            MenuItem menuItem = menuItemRepository.findById(itemDto.getMenuItemId())
                    .orElseThrow(() -> new ResourceNotFoundException("Menu Item not found with ID: " + itemDto.getMenuItemId()));

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setMenuItem(menuItem);
            orderItem.setQuantity(itemDto.getQuantity());
            orderItem.setPrice(menuItem.getPrice()); // Locking current price
            
            calculatedTotal += menuItem.getPrice() * itemDto.getQuantity();
            orderItems.add(orderItem);
        }

        order.setTotalPrice(calculatedTotal);
        order.setOrderItems(orderItems);

        orderRepository.save(order);
        return "Order placed successfully! Order Number: " + order.getOrderNumber() + " | Total: " + calculatedTotal;
    }

    @Override
    public List<OrderDto> getAllOrders(int page, int size, String sortBy) {
        return orderRepository.findAll().stream()
                .map(o -> new OrderDto(o.getId(), o.getOrderNumber(), o.getCustomerName(), o.getTotalPrice(), o.getStatus(), o.getVendor().getId(), null))
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderDto> getAllOrdersPaged(int pageNo, int pageSize, String sortBy) {
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));
        Page<Order> pagedResult = orderRepository.findAll(pageable);
        
        return pagedResult.getContent().stream()
                .map(o -> new OrderDto(o.getId(), o.getOrderNumber(), o.getCustomerName(), o.getTotalPrice(), o.getStatus(), o.getVendor().getId(), null))
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderDto> getOrdersByVendor(Long vendorId) {
        return orderRepository.findByVendorId(vendorId).stream()
                .map(o -> new OrderDto(o.getId(), o.getOrderNumber(), o.getCustomerName(), o.getTotalPrice(), o.getStatus(), o.getVendor().getId(), null))
                .collect(Collectors.toList());
    }

    @Override
    public OrderDto getOrderById(Long id) {
        Order o = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + id));
        return new OrderDto(o.getId(), o.getOrderNumber(), o.getCustomerName(), o.getTotalPrice(), o.getStatus(), o.getVendor().getId(), null);
    }

    @Override
    @Transactional
    public boolean updateOrder(OrderDto orderDto) {
        Order order = orderRepository.findById(orderDto.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderDto.getId()));
        
        order.setCustomerName(orderDto.getCustomerName());
        order.setStatus(orderDto.getStatus());
        
        if (orderDto.getVendorId() != null) {
            Vendor vendor = vendorRepository.findById(orderDto.getVendorId())
                    .orElseThrow(() -> new ResourceNotFoundException("Vendor not found with ID: " + orderDto.getVendorId()));
            order.setVendor(vendor);
        }
        
        orderRepository.save(order);
        return true;
    }

    @Override
    @Transactional
    public boolean deleteOrder(Long id) {
        if (!orderRepository.existsById(id)) {
            throw new ResourceNotFoundException("Order not found with ID: " + id);
        }
        orderRepository.deleteById(id);
        return true;
    }
}
