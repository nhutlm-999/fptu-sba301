package vn.edu.fpt.sba.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI restfulServiceOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Restful Service API")
                        .description("Swagger documentation for the Restful Service project")
                        .version("v1.0.0")
                        .contact(new Contact().name("FPT SBA"))
                        .license(new License().name("Proprietary")));
    }
}

