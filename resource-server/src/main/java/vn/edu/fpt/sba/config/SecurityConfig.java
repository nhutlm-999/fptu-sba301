package vn.edu.fpt.sba.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//
//                .authorizeHttpRequests(
//                        auth -> auth
//                                .requestMatchers("/api/auth/**").permitAll()
//                                .anyRequest().authenticated()) // Require authentication for all requests

    /// /                .httpBasic(Customizer.withDefaults()) // Use HTTP Basic authentication
//                .formLogin(AbstractHttpConfigurer::disable) // Disable form loginocommit
//                .csrf(AbstractHttpConfigurer::disable)
//                .sessionManagement(s ->
//                        s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//        ;// Disable CSRF for simplicity
//        return http.build();
//    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.securityMatcher("/api/v1/artists/**")
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().hasAuthority("SCOPE_artists.read"))
                .oauth2ResourceServer(oauth2 ->
                        oauth2.jwt(Customizer.withDefaults()));
        return http.build();
    }

    /*
    Tất cả req chỉ dc cấp phép nếu JWT có Authority "SCOPE_artists.read"
    .oauth2ResourceServer() -> Báo hiệu cho biết đây là 1 resource server và dùng JWT de xác thực
    */


//    @Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
//        return authConfig.getAuthenticationManager();
//    }

}
