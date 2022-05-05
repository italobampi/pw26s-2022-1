package br.edu.utfpr.pb.pw26s.server.controller;

import br.edu.utfpr.pb.pw26s.server.model.Category;
import br.edu.utfpr.pb.pw26s.server.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping // http://localhost:8080/categories
    public List<Category> findAll() {
        return categoryService.findAll();
    }

    @PostMapping //http://localhost:8080/categories
    public Category save(@RequestBody @Valid Category category) {
        return categoryService.save(category);
    }

    @PutMapping //http://localhost:8080/categories
    public Category update(@RequestBody @Valid Category category) {
        return categoryService.save(category);
    }

    @GetMapping("{id}")  //http://localhost:8080/categories/999
    public Category findOne(@PathVariable Long id) {
        return categoryService.findOne(id);
    }

    @DeleteMapping("{id}")  //http://localhost:8080/categories/999
    public void delete(@PathVariable Long id) {
        categoryService.delete(id);
    }

}
