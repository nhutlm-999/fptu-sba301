package vn.edu.fpt.nosql.service;

import org.springframework.stereotype.Service;
import vn.edu.fpt.nosql.entity.Student;
import vn.edu.fpt.nosql.repository.StudentRepository;

import java.util.Collections;
import java.util.List;

@Service
public class StudentService {
    private final StudentRepository repository;
    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<Student> getAll() {
        return repository.findAll();
    }

    public List<Student> getByGender(Integer gender) {
        if (gender != 0 && gender != 1) {
            return Collections.emptyList();
        }
        return repository.getByGender(gender);
    }


    public List<Student> getByIsRolled(Boolean isEnrolled) {
        return repository.findByIsEnrolled(isEnrolled);
    }

    public List<Student> getFemaleStudentsByIsEnrolled() {
        return repository.findFemaleStudentsByIsEnrolled();
    }
}
