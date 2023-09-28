"use client";

import qs from 'qs';

import React, { useState, useEffect } from 'react';

import axios from 'axios';

import styles from './Mid.module.css';




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

  const handleBattleMage = () => {
    setSelected('Battle Mage');
  }

  const handleBurstMage = () => {
    setSelected('Burst Mage');
  }

  const handleMarksmen = () => {
    setSelected('Marksmen');
  }

  const handleSkirmisher = () => {
    setSelected('Skirmisher');
  }

  const handleSpecialist = () => {
    setSelected('Specialist');
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
        <button  className={styles.roleButton} onClick={handleBattleMage}>Battle Mage</button>
        <button  className={styles.roleButton} onClick={handleBurstMage}>Burst Mage</button>
        <button  className={styles.roleButton} onClick={handleMarksmen}>Marksmen</button>
        <button  className={styles.roleButton} onClick={handleSkirmisher}>Skirmisher</button>
        <button  className={styles.roleButton} onClick={handleSpecialist}>Specialist</button>
      </>

      </div>
)}
   

      {selected === 'Skirmisher' && (
        <div className={styles.box}>
          <h1>As an assassin mid laner, how do you prefer to eliminate your targets?</h1>
  
          <button className={styles.roleButton}onClick={() => handleAnswer('PRECISION_SKIRMISHER')}>I like to use my finesse and precision to land skill shots and control fights.</button>
          <button className={styles.roleButton}onClick={() => handleAnswer('AGILE_SKIRMISHER')}>I enjoy weaving in and out of combat, striking enemies with quick combos.</button>          
          <button className={styles.roleButton}onClick={() => handleAnswer('DIVER_SKIRMISHER')}>I prefer to lead the charge, diving into the fray and disrupting enemy formations.</button>
          </div>
      )}

{selected === 'Assassin' && (
        <div className={styles.box}>
          <h1>As a battle mage mid laner, how do you prefer to deal damage to enemies?</h1>
  
          <button className={styles.roleButton}onClick={() => handleAnswer('BURST_ASSASSIN')}>I like to assassinate enemies quickly with high burst damage and mobility.</button>
          <button className={styles.roleButton}onClick={() => handleAnswer('SKIRMISHER_ASSASSIN')}>I enjoy outplaying my opponents and engaging in quick skirmishes.</button>          
          <button className={styles.roleButton}onClick={() => handleAnswer('AMBUSH_ASSASSIN')}>I prefer to surprise enemies and strike from stealth or untargetability.</button>
          </div>
      )}


{selected === 'Battle Mage' && (
        <div className={styles.box}>
          <h1>As a burst mage mid laner, how do you prefer to deal damage to enemies?</h1>
  
          <button className={styles.roleButton}onClick={() => handleAnswer('ZONING_BATTLE_MAGE')}>I like to deal sustained damage over time and control areas with zone control abilities.</button>
          <button className={styles.roleButton}onClick={() => handleAnswer('BURST_BATTLE_MAGE')}>I enjoy bursting down enemies in close-range combat with potent spells.</button>          
          <button className={styles.roleButton}onClick={() => handleAnswer('KITE_BATTLE_MAGE')}>I prefer to combo my abilities and kite enemies, maintaining distance while dealing damage.</button>
          </div>
      )}

{selected === 'Burst Mage' && (
        <div className={styles.box}>
          <h1>As a burst mage mid laner, how do you prefer to deal damage to enemies?</h1>
  
          <button className={styles.roleButton}onClick={() => handleAnswer('SINGLE_TARGET_BURST_MAGE')}>As a burst mage mid laner, how do you prefer to deal damage to enemies?</button>
          <button className={styles.roleButton}onClick={() => handleAnswer('AOE_BURST_MAGE')}>I enjoy dealing area-of-effect damage, hitting multiple enemies at once with my abilities.</button>          
          <button className={styles.roleButton}onClick={() => handleAnswer('TRAP_BURST_MAGE')}>I prefer to set up traps or combos to catch enemies off guard and eliminate them quickly</button>
          </div>
      )}
      
      {selected === 'Marksmen' && (
        <div className={styles.box}>
          <h1>As a marksman, how do you prefer to deal damage to enemies?</h1>
  
      
          <button className={styles.roleButton}onClick={() => handleAnswer('BURST_DMG_MARKSMAN')}>I enjoy executing high-damage burst combos from a distance.</button>          
          <button className={styles.roleButton}onClick={() => handleAnswer('MOBILE_MARKSMAN')}>I prefer to have strong mobility and agility to outmaneuver enemies.</button>
          </div>
      )}

      {selected === 'Specialist' &&  (
        <div className={styles.box}>
          <h1>As a specialist, how do you prefer to contribute to your team?</h1>

          <button className={styles.roleButton}onClick={() => handleAnswer('ZONING_SPECIALIST')}>I like to control the battlefield and deal damage from a safe distance.</button>
          <button className={styles.roleButton}onClick={() => handleAnswer('TRAP_SPECIALIST')}>I enjoy setting up traps and turrets to control objectives and areas</button>          
          <button className={styles.roleButton}onClick={() => handleAnswer('GLOBAL_SPECIALIST')}>I prefer to make game-changing plays with global presence and utility.</button>
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