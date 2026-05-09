package hu.bme.mit.smartmobility.gdgbmewebsite.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hu.bme.mit.smartmobility.gdgbmewebsite.dto.LoginRequest;
import hu.bme.mit.smartmobility.gdgbmewebsite.dto.LoginResponse;
import hu.bme.mit.smartmobility.gdgbmewebsite.entity.Admin;
import hu.bme.mit.smartmobility.gdgbmewebsite.jpa.AdminRepository;
import hu.bme.mit.smartmobility.gdgbmewebsite.security.JwtUtil;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(AdminRepository adminRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        Admin admin = adminRepository.findByEmail(request.getEmail());

        if (admin == null || !passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            return ResponseEntity.status(401).build();
        }

        String token = jwtUtil.generateToken(admin.getEmail());
        return ResponseEntity.ok(new LoginResponse(token, admin.getEmail()));
    }
}
