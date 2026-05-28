package vn.edu.fpt.authserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.fpt.authserver.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}
