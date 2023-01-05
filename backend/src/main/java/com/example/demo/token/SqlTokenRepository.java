package com.example.demo.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
interface SqlTokenRepository extends TokenRepository, JpaRepository<Token,Integer> {
}
