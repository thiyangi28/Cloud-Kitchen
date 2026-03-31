package edu.com.controller;

import edu.com.dto.MenuItemDto;
import edu.com.service.MenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuItemController {

    @Autowired
    private MenuItemService menuItemService;

    @PostMapping("/add")
    public ResponseEntity<String> addMenuItem(@RequestBody MenuItemDto menuItemDto) {
        return ResponseEntity.ok(menuItemService.addMenuItem(menuItemDto));
    }

    @GetMapping("/vendor/{vendorId}")
    public List<MenuItemDto> getMenuItemsByVendor(@PathVariable Long vendorId) {
        return menuItemService.getMenuItemsByVendor(vendorId);
    }
}
