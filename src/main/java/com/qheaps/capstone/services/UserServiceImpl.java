package com.qheaps.capstone.services;

import com.qheaps.capstone.dtos.UserDto;
import com.qheaps.capstone.entities.User;
import com.qheaps.capstone.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public List<String> addUser(UserDto userDto) {
        List<String> response = new ArrayList<>();
        User user = new User(userDto);
        userRepo.saveAndFlush(user);
        response.add("Account Registered");

        return response;
    }

    @Override
    @Transactional
    public List<String> userLogin(UserDto userDto) {
        List<String> response = new ArrayList<>();
        Optional<User> userOptional = userRepo.findByUsername(userDto.getUsername());

        if (userOptional.isPresent()) {
            if (passwordEncoder.matches(userDto.getPassword(), userOptional.get().getPassword())) {
                response.add("http://localhost:8080/play.html");
                response.add(String.valueOf(userOptional.get().getId()));
            } else {
                response.add("Invalid username or password");
            }
        } else {
            response.add("Invalid username or password");
        }

        return response;
    }

}
