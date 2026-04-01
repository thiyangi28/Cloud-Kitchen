package edu.com.service;

import edu.com.dto.VendorDto;
import java.util.List;

public interface VendorService {
    String addVendor(VendorDto vendorDto);
    List<VendorDto> getAllVendors();
    VendorDto getVendorById(Long id);
    boolean updateVendor(VendorDto vendorDto);
    boolean deleteVendor(Long id);
}
