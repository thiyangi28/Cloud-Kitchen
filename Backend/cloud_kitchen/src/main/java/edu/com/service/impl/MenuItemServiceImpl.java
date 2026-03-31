package edu.com.service.impl;

import edu.com.dto.MenuItemDto;
import edu.com.entity.MenuItem;
import edu.com.entity.Vendor;
import edu.com.exception.ResourceNotFoundException;
import edu.com.repository.MenuItemRepository;
import edu.com.repository.VendorRepository;
import edu.com.service.MenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MenuItemServiceImpl implements MenuItemService {

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @Override
    public String addMenuItem(MenuItemDto dto) {
        Vendor vendor = vendorRepository.findById(dto.getVendorId())
                .orElseThrow(() -> new ResourceNotFoundException("Vendor not found with ID: " + dto.getVendorId()));

        MenuItem menuItem = new MenuItem();
        menuItem.setName(dto.getName());
        menuItem.setDescription(dto.getDescription());
        menuItem.setPrice(dto.getPrice());
        menuItem.setAvailable(dto.getAvailable() != null ? dto.getAvailable() : true);
        menuItem.setVendor(vendor);

        menuItemRepository.save(menuItem);
        return "Menu item added successfully!";
    }

    @Override
    public List<MenuItemDto> getMenuItemsByVendor(Long vendorId) {
        return menuItemRepository.findByVendorId(vendorId).stream()
                .map(m -> new MenuItemDto(m.getId(), m.getName(), m.getDescription(), m.getPrice(), m.getAvailable(), m.getVendor().getId()))
                .collect(Collectors.toList());
    }

    @Override
    public MenuItemDto updateMenuItem(Long id, MenuItemDto dto) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu Item not found with ID: " + id));

        menuItem.setName(dto.getName());
        menuItem.setPrice(dto.getPrice());
        menuItem.setAvailable(dto.getAvailable());
        menuItem.setDescription(dto.getDescription());

        MenuItem updated = menuItemRepository.save(menuItem);
        return new MenuItemDto(updated.getId(), updated.getName(), updated.getDescription(), updated.getPrice(), updated.getAvailable(), updated.getVendor().getId());
    }
}
