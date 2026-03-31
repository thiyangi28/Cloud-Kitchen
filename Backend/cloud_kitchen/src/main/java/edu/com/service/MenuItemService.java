package edu.com.service;

import edu.com.dto.MenuItemDto;
import java.util.List;

public interface MenuItemService {
    String addMenuItem(MenuItemDto menuItemDto);
    List<MenuItemDto> getMenuItemsByVendor(Long vendorId);
    MenuItemDto updateMenuItem(Long id, MenuItemDto menuItemDto);
}
