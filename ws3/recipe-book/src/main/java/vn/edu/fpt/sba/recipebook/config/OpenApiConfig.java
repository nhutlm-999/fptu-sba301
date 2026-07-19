package vn.edu.fpt.sba.recipebook.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;

@OpenAPIDefinition(
        info = @Info(
                title = "Recipe Book API",
                version = "1.0",
                description = "RESTful API for managing meal types and recipes",
                contact = @Contact(name = "FPT University - SBA301")
        )
)
public class OpenApiConfig {
}
