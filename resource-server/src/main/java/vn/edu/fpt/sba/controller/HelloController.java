package vn.edu.fpt.sba.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // meta-annotation = @Controller + @ResponseBody
@Tag(name = "Hello", description = "Simple health/hello endpoint")
public class HelloController {
    @GetMapping("/hello")
    @Operation(summary = "Return a greeting message")
    public String hello() {
        return "Hi";
    }
}
