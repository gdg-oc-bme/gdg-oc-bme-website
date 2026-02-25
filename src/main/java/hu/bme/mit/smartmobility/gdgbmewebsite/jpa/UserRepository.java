package hu.bme.mit.smartmobility.gdgbmewebsite.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import hu.bme.mit.smartmobility.gdgbmewebsite.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

}
