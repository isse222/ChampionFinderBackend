package com.championfinder.championfinder.Service;

import com.championfinder.championfinder.Class.Champions;
import com.championfinder.championfinder.Repository.ChampionsRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChampionsService {

    private final ChampionsRepository championsRepository;

    public ChampionsService(ChampionsRepository championsRepository) {

        this.championsRepository = championsRepository;
    }

    public Champions createChampion(Champions champions) {

        return championsRepository.save(champions);
    }

    public Champions getChampionById(Long id) {

        return championsRepository.findById(id).orElse(null);
    }

    public List<Champions> getAllChampions() {
        return championsRepository.findAll();
    }

    public List<Champions> searchChampionsByTags(List<String> tags) {
        List<Champions> championsWithTags = championsRepository.findByTagsIn(tags);
        List<Champions> filteredChampions = new ArrayList<>();

        for (Champions champion : championsWithTags) {
            List<String> championTags = champion.getTags();
            if (championTags.containsAll(tags)) {
                filteredChampions.add(champion);
            }
        }

        return filteredChampions;
    }


    public Champions updateChampion(Long id, Champions updatedChampion) {
        Champions existingChampion = championsRepository.findById(id).orElse(null);
        if (existingChampion != null) {
            existingChampion.setName(updatedChampion.getName());
            existingChampion.setPictureUrl(updatedChampion.getPictureUrl());
            existingChampion.setDescription(updatedChampion.getDescription());
            existingChampion.setTags(updatedChampion.getTags());
            return championsRepository.save(existingChampion);
        }
        return null;
    }

    public void deleteChampion(Long id) {
        championsRepository.deleteById(id);
    }

}
