package com.example.demo.token;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/token")
class TokenController {
    private final TokenService service;

    TokenController(TokenService service) {
        this.service = service;
    }

    @GetMapping
    List<Token> getAllTokens() {
        return service.getAllTokens();
    }

    @GetMapping("/{id}")
    Token getTokenById(@PathVariable Integer id) {
        return service.getTokenById(id);
    }

    @PostMapping
    void addToken(@RequestBody Token tokenToAdd) {
        service.createToken(tokenToAdd);
    }

    @DeleteMapping
    void deleteToken(@PathVariable Integer id) {
        service.deleteToken(id);
    }
}
