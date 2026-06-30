package vn.edu.fpt.nosql.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Student {
    @Id
    private String id;
    private String name;
    private Integer gender;
    private String email;
    private Boolean isEnrolled;

    public Student(String id, String name, Integer gender, String email, Boolean isEnrolled) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.email = email;
        this.isEnrolled = isEnrolled;
    }

    public Student() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getRolled() {
        return isEnrolled;
    }

    public void setRolled(Boolean rolled) {
        isEnrolled = rolled;
    }
}
