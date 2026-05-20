package vn.edu.fpt.sba.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http

                .authorizeHttpRequests(
                        auth -> auth.anyRequest().authenticated()) // Require authentication for all requests
                .httpBasic(Customizer.withDefaults()) // Use HTTP Basic authentication
                .formLogin(AbstractHttpConfigurer::disable) // Disable form login
                .csrf(AbstractHttpConfigurer::disable);// Disable CSRF for simplicity
        return http.build();
    }
}
