package edu.com.service.impl;

import edu.com.dto.LoginRequest;
import edu.com.dto.UserDto;
import edu.com.entity.User;
import edu.com.repository.UserRepository;
import edu.com.service.UserService;
import edu.com.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public String registerNewUser(UserDto userDto) {
        //check if user already exists
        if(userRepository.findByUsername(userDto.getUsername()).isPresent()){
            return "User Name is already Taken";
        }
        //add new user
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setRole(userDto.getRole());

        //Bcrypt password
        user.setPassword(passwordEncoder.encode((userDto.getPassword())));
        userRepository.save(user);
        return "User registered successfully!";
    }

    @Override
    public String loginUser(LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(), loginRequest.getPassword()
            ));
            return jwtUtil.generateToken(loginRequest.getUsername());
        } catch (Exception e) {
            return "Login failed: " + e.getMessage();
        }
    }

    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserDto(user.getUsername(), user.getEmail(), null, user.getRole()))
                .collect(Collectors.toList());
    }
}
