package edu.com.service;

import edu.com.dto.LoginRequest;
import edu.com.dto.UserDto;

public interface UserService {
    String registerNewUser(UserDto userDto);
    String loginUser(LoginRequest loginRequest);
    java.util.List<UserDto> getAllUsers();
}