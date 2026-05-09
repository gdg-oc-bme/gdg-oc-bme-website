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

import hu.bme.mit.smartmobility.gdgbmewebsite.entity.Article;
import hu.bme.mit.smartmobility.gdgbmewebsite.exception.ResourceNotFoundException;
import hu.bme.mit.smartmobility.gdgbmewebsite.jpa.ArticleRepository;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    private final ArticleRepository articleRepository;

    public ArticleController(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    @GetMapping
    public List<Article> getAll() {
        return articleRepository.findAll();
    }

    @GetMapping("/{id}")
    public Article getById(@PathVariable Long id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found: " + id));
    }

    @PostMapping
    public Article create(@Valid @RequestBody Article article) {
        return articleRepository.save(article);
    }

    @PutMapping("/{id}")
    public Article update(@PathVariable Long id, @Valid @RequestBody Article article) {
        Article existing = getById(id);
        existing.setTitle(article.getTitle());
        existing.setContent(article.getContent());
        existing.setImageUrl(article.getImageUrl());
        existing.setAuthor(article.getAuthor());
        existing.setCreatedAt(article.getCreatedAt());
        return articleRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!articleRepository.existsById(id)) {
            throw new ResourceNotFoundException("Article not found: " + id);
        }
        articleRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
