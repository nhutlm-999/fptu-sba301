package vn.edu.fpt.nosql.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.fpt.nosql.entity.Student;
import vn.edu.fpt.nosql.repository.StudentRepository;
import vn.edu.fpt.nosql.service.StudentService;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    private StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping()
    public List<Student> getAll(){
        return studentService.getAll();
    }

    @GetMapping("/gender")
    public List<Student> getByGender(@RequestParam("gender") Integer gender) {
        System.out.println("getByGender");
        return studentService.getByGender(gender);
    }

    @GetMapping("/isFemaleAndEnrolled")
    public List<Student> getFemaleStudentsByIsEnrolled() {
        return studentService.getFemaleStudentsByIsEnrolled();
    }
}
