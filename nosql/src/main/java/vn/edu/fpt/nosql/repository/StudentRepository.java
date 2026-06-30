package vn.edu.fpt.nosql.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import vn.edu.fpt.nosql.entity.Student;

import java.util.List;

@Repository
public interface StudentRepository extends MongoRepository<Student, String> {
    List<Student> getByName(String name);
    List<Student> getByGender(Integer gender);
    List<Student> findByIsEnrolled(Boolean isEnrolled);
    @Query("{ 'gender': 0, 'isEnrolled': true }")
    List<Student> findFemaleStudentsByIsEnrolled();

}
