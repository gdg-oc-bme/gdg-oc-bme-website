package hu.bme.mit.smartmobility.gdgbmewebsite.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import hu.bme.mit.smartmobility.gdgbmewebsite.entity.TeamMember;

public interface TeamMemberRepository extends JpaRepository<TeamMember, Long> {
    List<TeamMember> findAllByOrderByOrderIndexAsc();
}
