package hu.bme.mit.smartmobility.gdgbmewebsite.config;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import hu.bme.mit.smartmobility.gdgbmewebsite.entity.Admin;
import hu.bme.mit.smartmobility.gdgbmewebsite.jpa.AdminRepository;

@Component
public class AdminInitializer implements ApplicationRunner {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminInitializer(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (adminRepository.count() == 0) {
            Admin admin = new Admin("admin@gdgoc.bme.hu", passwordEncoder.encode("admin123"));
            adminRepository.save(admin);
        }
    }
}
