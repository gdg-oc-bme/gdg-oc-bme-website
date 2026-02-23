package hu.bme.mit.smartmobility.gdgbmewebsite.security;

import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SpringSecurityConfiguration {
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		// 1) Ensure all requests are authenticated
		http.authorizeHttpRequests(auth -> auth.anyRequest().authenticated());

		// 2) Implement Basic Authentication
		http.httpBasic(withDefaults());

		// 3) Disable CSRF
		http.csrf().disable();

		return http.build();
	}

}
