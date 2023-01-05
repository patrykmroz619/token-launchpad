package com.example.demo.token;

import java.util.List;
import java.util.Optional;

interface TokenRepository {
    List<Token> findAll();

    Optional<Token> findById(Integer id);

    Token save(Token entity);

    void deleteById(Integer integer);
}
