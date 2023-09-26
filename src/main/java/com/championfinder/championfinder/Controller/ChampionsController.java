package com.championfinder.championfinder.Controller;

import com.championfinder.championfinder.Class.Champions;
import com.championfinder.championfinder.Service.ChampionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/Champions")
public class ChampionsController {

    private final ChampionsService championsService;

    @Autowired
    public ChampionsController(ChampionsService championsService) {
        this.championsService = championsService;
    }

    @PostMapping
    public ResponseEntity<Champions> createChampion(@RequestBody Champions champions) {
        Champions createdChampion = championsService.createChampion(champions);
        return new ResponseEntity<>(createdChampion, HttpStatus.CREATED);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Champions>> searchChampionsByTags(@RequestParam List<String> tags) {
        List<Champions> champions = championsService.searchChampionsByTags(tags);
        return new ResponseEntity<>(champions, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Champions> getChampionById(@PathVariable Long id) {
        Champions champions = championsService.getChampionById(id);
        if (champions == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(champions, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Champions>> getAllChampions() {
        List<Champions> champions = championsService.getAllChampions();
        return new ResponseEntity<>(champions, HttpStatus.OK);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Champions> updateChampion(@PathVariable Long id, @RequestBody Champions champion) {
        Champions updatedChampion = championsService.updateChampion(id, champion);
        if (updatedChampion == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedChampion, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChampion(@PathVariable Long id) {
        championsService.deleteChampion(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
