package edu.com.controller;

import edu.com.dto.VendorDto;
import edu.com.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendors")
public class VendorController {

    @Autowired
    private VendorService vendorService;

    @PostMapping("/add")
    public ResponseEntity<String> addVendor(@RequestBody VendorDto vendorDto) {
        return ResponseEntity.ok(vendorService.addVendor(vendorDto));
    }

    @GetMapping("/all")
    public List<VendorDto> getAllVendors() {
        return vendorService.getAllVendors();
    }
}
