"use client";

import qs from 'qs';

import React, { useState, useEffect } from 'react';

import axios from 'axios';

import styles from './Jungle.module.css';




interface Champion {
  id: string;
  name: string;
  pictureUrl: string;
  description: string; 
  tags: string[];
  imageUrl: string;
}

export default function PlaystyleQuiz() {


  const [champions, setChampions] = useState<Champion[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [results, setResults] = useState<Champion[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  


  const handleAssassin = () => {
    setSelected('Assassin');
  }

  const handleSupport = () => {
    setSelected('Support');
  }

  const handleDiver = () => {
    setSelected('Diver');
  }

  const handleMarksmen = () => {
    setSelected('Marksmen');
  }

  const handleJuggernaut = () => {
    setSelected('Juggernaut');
  }

  const handleTank = () => {
    setSelected('Tank');
  }

  const handleSpecialist = () => {
    setSelected('Specialist');
  }

  
  const handleSkirmisher= () => {
    setSelected('Skirmisher');
  }
  
  
  const handleAnswer = (tag: string) => {
    setTags(prevTags => [...prevTags, tag]);
  }

  const handleSubmit = () => {
    getChampions();
    setSelected(null); 
    setShowOptions(false);
    setSubmitted(true);
  }  


  const getChampions = async () => {

    if (tags.length < 2) {
      console.error('Tags array must have at least 2 items');
      return; 
    }

 
    try {

      const tag1 = tags[0]; 
      const tag2 = tags[1];

      const encodedTag1 = encodeURIComponent(tag1); 
      const encodedTag2 = encodeURIComponent(tag2);

      
      const query = `tags=${encodedTag1}&tags=${encodedTag2}`;
 
    const response = await axios.get(`http://localhost:8080/api/v1/Champions/search`, {
      params: {
        tags: [tag1, tag2], // Pass an array of tags
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },

    });
  
   
    const championsWithImages: Champion[] = await Promise.all(
      response.data.map(async (champion: Champion) => {
        const imageResponse = await axios.get(
          `https://ddragon.leagueoflegends.com/cdn/13.17.1/img/champion/${champion.name}.png`
        );
        return {
          ...champion,
          pictureUrl: imageResponse.config.url, 
        };
      })
    );

    setChampions(championsWithImages);
    setResults(championsWithImages);
  } catch (error) {
    console.error('Axios Error:', error);
    console.log(error);
  }
}






  return (

   

    <div className={styles.quiz}>
    <div  className={styles.box}>
      
      {showOptions  && (

        <div>
        <h1>What type of class suits your playstyle?</h1>
      <>
        <button  className={styles.roleButton} onClick={handleAssassin}>Assassin</button>
        <button  className={styles.roleButton} onClick={handleSupport}>Support</button>
        <button  className={styles.roleButton} onClick={handleDiver}>Diver</button>
        <button  className={styles.roleButton} onClick={handleMarksmen}>Marksmen</button>
        <button  className={styles.roleButton} onClick={handleJuggernaut}>Juggernaut</button>
        <button  className={styles.roleButton} onClick={handleTank}>Tank</button>
        <button  className={styles.roleButton} onClick={handleSkirmisher}>Skirmisher</button>
        <button  className={styles.roleButton} onClick={handleSpecialist}>Specialist</button>
      </>

      </div>
)}
   

      {selected === 'Support' && (
        <div className={styles.box}>
          <h1>As a jungle support, how do you prefer to assist your team?</h1>
  
          <button className={styles.roleButton}onClick={() => handleAnswer('ROAMING_SUPPORT')}>I prefer to roam and make plays across the map, assisting all teammates.</button>
          </div>
      )}

{selected === 'Assassin' && (
        <div className={styles.box}>
          <h1>As an assassin jungler, how do you prefer to approach ganks and skirmishes?</h1>
  
          <button className={styles.roleButton}onClick={() => handleAnswer('AMBUSH_ASSASSINN')}>I like to stalk and ambush lone targets, quickly eliminating them from the shadows.</button>
          <button className={styles.roleButton}onClick={() => handleAnswer('FLANK_ASSASSIN')}>I prefer to strike from unexpected angles, catching multiple enemies off guard.</button>          
          <button className={styles.roleButton}onClick={() => handleAnswer('DECEPTION_ASSASSIN')}>I excel at using deceptive tactics and creating confusion in enemy ranks.</button>
          <button className={styles.roleButton}onClick={() => handleAnswer('RESET_ASSASSIN')}>I enjoy picking off high-priority targets and resetting abilities to escape or engage again.</button>
          </div>
      )}


{selected === 'Diver' && (
        <div className={styles.box}>
          <h1>As a diver jungler, how do you prefer to approach engagements?</h1>
  
          <button className={styles.roleButton}onClick={() => handleAnswer('INITIATOR_DIVER')}>I like to engage with powerful initiation and crowd control, locking down key targets.</button>
          <button className={styles.roleButton}onClick={() => handleAnswer('BRUISER_DIVER')}>I enjoy dealing consistent damage while being tanky enough to survive extended fights.</button>          
          <button className={styles.roleButton}onClick={() => handleAnswer('FLANKER_DIVER')}>I prefer to find flanking opportunities and eliminate high-priority threats.</button>
          <button className={styles.roleButton}onClick={() => handleAnswer('ISOLATOR_DIVER')}>I excel at picking off isolated enemies and securing objectives.</button>
          <button className={styles.roleButton}onClick={() => handleAnswer('DISRUPTOR_DIVER')}>I like to disrupt the enemy team's formation and create chaos in teamfights</button>
          <button className={styles.roleButton}onClick={() => handleAnswer('UTILITY_DIVER')}>I focus on controlling objectives, securing buffs, and supporting my team in fights.</button>
          </div>
      )}

{selected === 'Juggernaut' && (
        <div className={styles.box}>
          <h1>As a juggernaut jungler, how do you prefer to approach fights?</h1>
  
          <button className={styles.roleButton}onClick={() => handleAnswer('FLANKING_JUGGERNAUT')}>I enjoy flanking and isolating key targets to eliminate them quickly.</button>
          <button className={styles.roleButton}onClick={() => handleAnswer('DUELIST_JUGGERNAUT')}>I prefer to duel enemies in extended fights, sustaining through damage and dealing consistent damage.</button>          
          
          </div>
      )}
      
      {selected === 'Marksmen' && (
        <div className={styles.box}>
          <h1>As a marksman jungler, how do you prefer to deal damage to enemies?</h1>
  
      
          <button className={styles.roleButton}onClick={() => handleAnswer('SUSTAINED_DPS_MARKSMAN')}>I enjoy dealing sustained damage through rapid auto-attacks and abilities.</button>          
          <button className={styles.roleButton}onClick={() => handleAnswer('BURST_DMG_MARKSMANN')}>I prefer to burst down enemies with powerful abilities and precision.</button>
          </div>
      )}

{selected === 'Tank' && (
        <div className={styles.box}>
          <h1>As a tank jungler, how do you prefer to approach teamfights?</h1>
  
      
          <button className={styles.roleButton}onClick={() => handleAnswer('INITIATOR_TANK')}>I like to initiate teamfights, soaking up damage, and providing crowd control.</button>          
          <button className={styles.roleButton}onClick={() => handleAnswer('PEELER_TANK')}>I enjoy peeling for my team protecting them from enemy threats</button>
          <button className={styles.roleButton}onClick={() => handleAnswer('DISRUPTOR_TANK')}>"I prefer to disrupt the enemy backline and create chaos in teamfights.</button>
          </div>
      )}

{selected === 'Skirmisher' && (
        <div className={styles.box}>
          <h1>As a Skirmisher, how do you prefer to approach the game?</h1>
  
      
          <button className={styles.roleButton}onClick={() => handleAnswer('TEAMFIGHT_SPECIALIST')}> I enjoy having strong map presence and engaging in team fights. </button>          
          <button className={styles.roleButton}onClick={() => handleAnswer('FARM_HEAVY')}>I like farming and scaling up for late-game power. (FARM_HEAVY)</button>
          <button className={styles.roleButton}onClick={() => handleAnswer('MIXED_STYLE')}>: I prefer a mix of farming and ganking to adapt to the game. (MIXED_STYLE) (FARM_HEAVY)</button>
          </div>
      )}


      {selected === 'Specialist' &&  (
        <div className={styles.box}>
          <h1>As a specialist jungler, how do you prefer to influence the game?</h1>

          <button className={styles.roleButton}onClick={() => handleAnswer('TEAMFIGHT_SPECIALISTT')}>I like to control team fights with powerful area-of-effect damage and crowd control.</button>
          <button className={styles.roleButton}onClick={() => handleAnswer('ROAMING_SPECIALIST')}>I enjoy roaming and ganking lanes with high mobility and surprise attacks.</button>          
          <button className={styles.roleButton}onClick={() => handleAnswer('OBJECTIVE_CONTROL_SPECIALISTT')}>I prefer to focus on objectives and secure global map control for my team.</button>
        </div>

  )


  
      }
      
     

      {!submitted && 
  <button className={styles.roleButton} onClick={handleSubmit}>Get Recommendations</button>
}
    
      {results && (
      <div  className={`${styles.box} ${styles['centered-container']}`}>
      <h2>Recommended Champions:</h2>
      {champions.map(champ => (
        <div key={champ.id} >
        <img src={champ.pictureUrl} alt={champ.name}/>
        <h3>{champ.name}</h3>
        <p>{champ.description}</p>
        </div>
      ))}


    </div>
    )}
    </div>
    </div>
  );

  

}