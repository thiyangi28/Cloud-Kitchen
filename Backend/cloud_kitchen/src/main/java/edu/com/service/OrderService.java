package edu.com.service;

import edu.com.dto.OrderDto;
import java.util.List;

public interface OrderService {
    String placeOrder(OrderDto orderDto);
    List<OrderDto> getAllOrders(int page, int size, String sortBy);
    List<OrderDto> getAllOrdersPaged(int pageNo, int pageSize, String sortBy);
    List<OrderDto> getOrdersByVendor(Long vendorId);
    OrderDto getOrderById(Long id);
    boolean updateOrder(OrderDto orderDto);
    boolean deleteOrder(Long id);
}
