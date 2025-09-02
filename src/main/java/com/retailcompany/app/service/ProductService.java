package com.retailcompany.app.service;

import com.retailcompany.app.model.Product;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    private List<Product> products = new ArrayList<>();

    public ProductService() {
        products.add(new Product(1, "Laptop", 75000.0));
        products.add(new Product(2, "Smartphone", 30000.0));
        products.add(new Product(3, "Headphones", 2000.0));
    }

    public List<Product> getAllProducts() {
        return products;
    }

    public Product getProductById(int id) {
        return products.stream()
                .filter(p -> p.getId() == id)
                .findFirst()
                .orElse(null);
    }

    public Product addProduct(Product product) {
        products.add(product);
        return product;
    }
}
