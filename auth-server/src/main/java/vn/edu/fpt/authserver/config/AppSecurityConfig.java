package vn.edu.fpt.authserver.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.server.authorization.OAuth2Authorization;
import org.springframework.security.oauth2.server.authorization.OAuth2TokenType;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configuration.OAuth2AuthorizationServerConfiguration;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configurers.OAuth2AuthorizationServerConfigurer;
import org.springframework.security.oauth2.server.authorization.token.JwtEncodingContext;
import org.springframework.security.oauth2.server.authorization.token.OAuth2TokenCustomizer;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import vn.edu.fpt.authserver.repository.UserRepository;

@Configuration
@EnableWebSecurity
public class AppSecurityConfig {
    @Bean
    SecurityFilterChain authorizationServerFilterChain(HttpSecurity http) throws Exception {
        // Open default endpoints for authentication and registration, secure all other endpoints
        OAuth2AuthorizationServerConfiguration.applyDefaultSecurity(http);
        http.getConfigurer(OAuth2AuthorizationServerConfigurer.class)
                .oidc(Customizer.withDefaults()); // Enable OpenID Connect 1.0
        return http.formLogin(Customizer.withDefaults()).build();

    }

     @Bean
     SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
         http
                 .authorizeHttpRequests(auth -> auth
                         .anyRequest().authenticated())
                 .formLogin(Customizer.withDefaults());
         return http.build();
     }

     @Bean
     public OAuth2TokenCustomizer<JwtEncodingContext> oAuth2TokenCustomizer(UserDetailsService userDetailsService, UserRepository userRepository) {
        return context -> {
            // Check if it is acces_token
            if(OAuth2TokenType.ACCESS_TOKEN.equals(context.getTokenType())) {
                var principal = context.getPrincipal();
                var authorities = context.getPrincipal().getAuthorities().stream().map(
                        GrantedAuthority::getAuthority
                ).toList();
                var user = userRepository.findByUsername(principal.getName()).orElse(null);
                context.getClaims()
                        .claim("roles", authorities)
                        .claim("email", user.getEmail());
            }
        };
     }

//     @Bean
//     public OAuth2TokenCustomizer<JwtEncodingContext> oAuth2TokenCustomizer(UserDetailsService userDetailsService) {
//        return context -> {
//            // Check if it is acces_token
//            var authorities = context.getPrincipal().getAuthorities().stream().map(
//                    GrantedAuthority::getAuthority
//            ).toList();
//            context.getClaims().claim("roles", authorities);
//        };
//     }

//     @Bean
//     UserDetailsService userDetailsService() {
//        UserDetails user = User
//                .withUsername("user")
//                .password("{noop}user")
//                .roles("USER")
//                .build();
//        return new InMemoryUserDetailsManager(user);
//     }
}
