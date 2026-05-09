package hu.bme.mit.smartmobility.gdgbmewebsite.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hu.bme.mit.smartmobility.gdgbmewebsite.entity.TeamMember;
import hu.bme.mit.smartmobility.gdgbmewebsite.exception.ResourceNotFoundException;
import hu.bme.mit.smartmobility.gdgbmewebsite.jpa.TeamMemberRepository;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/team")
public class TeamMemberController {

    private final TeamMemberRepository teamMemberRepository;

    public TeamMemberController(TeamMemberRepository teamMemberRepository) {
        this.teamMemberRepository = teamMemberRepository;
    }

    @GetMapping
    public List<TeamMember> getAll() {
        return teamMemberRepository.findAllByOrderByOrderIndexAsc();
    }

    @GetMapping("/{id}")
    public TeamMember getById(@PathVariable Long id) {
        return teamMemberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team member not found: " + id));
    }

    @PostMapping
    public TeamMember create(@Valid @RequestBody TeamMember member) {
        return teamMemberRepository.save(member);
    }

    @PutMapping("/{id}")
    public TeamMember update(@PathVariable Long id, @Valid @RequestBody TeamMember member) {
        TeamMember existing = getById(id);
        existing.setName(member.getName());
        existing.setRole(member.getRole());
        existing.setImageUrl(member.getImageUrl());
        existing.setLinkedinUrl(member.getLinkedinUrl());
        existing.setGithubUrl(member.getGithubUrl());
        existing.setOrderIndex(member.getOrderIndex());
        return teamMemberRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!teamMemberRepository.existsById(id)) {
            throw new ResourceNotFoundException("Team member not found: " + id);
        }
        teamMemberRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
