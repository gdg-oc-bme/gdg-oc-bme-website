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

import hu.bme.mit.smartmobility.gdgbmewebsite.entity.Opportunity;
import hu.bme.mit.smartmobility.gdgbmewebsite.exception.ResourceNotFoundException;
import hu.bme.mit.smartmobility.gdgbmewebsite.jpa.OpportunityRepository;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/opportunities")
public class OpportunityController {

    private final OpportunityRepository opportunityRepository;

    public OpportunityController(OpportunityRepository opportunityRepository) {
        this.opportunityRepository = opportunityRepository;
    }

    @GetMapping
    public List<Opportunity> getAll() {
        return opportunityRepository.findAll();
    }

    @GetMapping("/{id}")
    public Opportunity getById(@PathVariable Long id) {
        return opportunityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Opportunity not found: " + id));
    }

    @PostMapping
    public Opportunity create(@Valid @RequestBody Opportunity opportunity) {
        return opportunityRepository.save(opportunity);
    }

    @PutMapping("/{id}")
    public Opportunity update(@PathVariable Long id, @Valid @RequestBody Opportunity opportunity) {
        Opportunity existing = getById(id);
        existing.setTitle(opportunity.getTitle());
        existing.setCompany(opportunity.getCompany());
        existing.setDescription(opportunity.getDescription());
        existing.setLink(opportunity.getLink());
        existing.setDeadline(opportunity.getDeadline());
        existing.setLocation(opportunity.getLocation());
        return opportunityRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!opportunityRepository.existsById(id)) {
            throw new ResourceNotFoundException("Opportunity not found: " + id);
        }
        opportunityRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
