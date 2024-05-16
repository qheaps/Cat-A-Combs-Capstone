package com.qheaps.capstone.repositories;

import com.qheaps.capstone.entities.Enemy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnemyRepo extends JpaRepository<Enemy, Long> {
}
