package com.championfinder.championfinder.Repository;

import com.championfinder.championfinder.Class.Champions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChampionsRepository extends JpaRepository<Champions, Long> {

    List<Champions> findByTagsIn(List<String> tags);

}
