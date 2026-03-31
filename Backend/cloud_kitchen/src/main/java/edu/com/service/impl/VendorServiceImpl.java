package edu.com.service.impl;

import edu.com.dto.VendorDto;
import edu.com.entity.Vendor;
import edu.com.repository.VendorRepository;
import edu.com.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VendorServiceImpl implements VendorService {

    @Autowired
    private VendorRepository vendorRepository;

    @Override
    public String addVendor(VendorDto vendorDto) {
        Vendor vendor = new Vendor();
        vendor.setName(vendorDto.getName());
        vendor.setContact(vendorDto.getContact());
        vendor.setLocation(vendorDto.getLocation());
        vendorRepository.save(vendor);
        return "Vendor added successfully!";
    }

    @Override
    public List<VendorDto> getAllVendors() {
        return vendorRepository.findAll().stream()
                .map(v -> new VendorDto(v.getId(), v.getName(), v.getContact(), v.getLocation()))
                .collect(Collectors.toList());
    }

    @Override
    public VendorDto getVendorById(Long id) {
        Vendor v = vendorRepository.findById(id).orElse(null);
        if (v == null) return null;
        return new VendorDto(v.getId(), v.getName(), v.getContact(), v.getLocation());
    }
}
