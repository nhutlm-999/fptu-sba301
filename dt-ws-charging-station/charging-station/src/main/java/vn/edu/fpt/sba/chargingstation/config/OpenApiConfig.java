package vn.edu.fpt.sba.chargingstation.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Charging Station API",
                version = "v1",
                description = "RESTful API for managing charging stations and slots"
        )
)
public class OpenApiConfig {
}
