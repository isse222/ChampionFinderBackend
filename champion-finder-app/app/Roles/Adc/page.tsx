"use client";

import qs from 'qs';

import React, { useState, useEffect } from 'react';

import axios from 'axios';

import styles from './Adc.module.css';




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
  


  const handleCloseRange = () => {
    setSelected('close range');
  }

  const handleLongRange = () => {
    setSelected('Long Ranged');
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
        <button  className={styles.roleButton} onClick={handleCloseRange}>Close Range</button>
        <button  className={styles.roleButton} onClick={handleLongRange}>Long Ranged</button>
      </>

      </div>
)}
   

      {selected === 'close range' && (
        <div className={styles.box}>
          <h1>How do you prefer to engage as a melee marksman?</h1>
  
          <button className={styles.roleButton}onClick={() => handleAnswer('ASSASSINATE_MELEE_MARKSMAN')}>I excel at diving into the enemy backline and eliminating high-priority targets</button>
          <button className={styles.roleButton}onClick={() => handleAnswer('DISRUPTIVE_MELEE_MARKSMAN')}>I like to disrupt the enemy team and create chaos in fights</button>          
          <button className={styles.roleButton}onClick={() => handleAnswer('SUSTAINED_MELEE_MARKSMAN')}>I prefer to focus on sustained damage while sticking to my targets</button>
          </div>
      )}

      {selected === 'Long Ranged' &&  (
        <div className={styles.box}>
          <h1>How do you prefer to control the battlefield as a ranged marksman?</h1>

          <button className={styles.roleButton}onClick={() => handleAnswer('POKE_MARKSMAN')}>I excel at poking enemies from afar and providing utility to my team.</button>
          <button className={styles.roleButton}onClick={() => handleAnswer('TEAMFIGHT_MARKSMAN')}>I like to focus on sustained damage during teamfights.</button>          
          <button className={styles.roleButton}onClick={() => handleAnswer('UTILITY_MARKSMAN')}>I prefer to use crowd control to set up plays and protect my team.</button>
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