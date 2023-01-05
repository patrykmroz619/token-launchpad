package com.example.demo.token;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
class TokenService {
    private final TokenRepository repository;

    TokenService(TokenRepository repository) {
        this.repository = repository;
    }

    public Token createToken(Token tokenToAdd) {
        return repository.save(tokenToAdd);
    }

    public List<Token> getAllTokens() {
        return repository.findAll();
    }

    public Token getTokenById(Integer id) {
        if (repository.findById(id).isPresent()) {
            return repository.findById(id).get();
        } else {
            return null;
        }
    }

    public void deleteToken(Integer id) {
        repository.deleteById(id);
    }
}
