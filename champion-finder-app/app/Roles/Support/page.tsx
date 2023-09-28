"use client";

import qs from 'qs';

import React, { useState, useEffect } from 'react';

import axios from 'axios';

import styles from './Support.module.css';




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
  




  const handleEnchanter = () => {
    setSelected('Enchanter');
  }

  const handleEngage = () => {
    setSelected('Engage');
  }

  const handleMage = () => {
    setSelected('Mage');
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

        <button  className={styles.roleButton} onClick={handleEnchanter}>Enchanter</button>
        <button  className={styles.roleButton} onClick={handleEngage}>Engage</button>
        <button  className={styles.roleButton} onClick={handleMage}>Mage</button>
      </>

      </div>
)}
   

      

{selected === 'Enchanter' && (
        <div className={styles.box}>
          <h1>As an enchanter, how do you prefer to support your team?</h1>
  
          <button className={styles.roleButton}onClick={() => handleAnswer('SHIELD_ENCHANTER')}>I like to provide protective shields and buffs to my allies.</button>
          <button className={styles.roleButton}onClick={() => handleAnswer('HEAL_ENCHANTER')}>I enjoy healing and sustaining my team during fights.</button>          
          <button className={styles.roleButton}onClick={() => handleAnswer('CC_ENCHANTER')}>I prefer to crowd control and peel for my team, disrupting enemy engagements</button>

          </div>
      )}

{selected === 'Engage' && (
        <div className={styles.box}>
          <h1>As an engage champion, how do you prefer to initiate fights and lead your team?</h1>
  
          <button className={styles.roleButton}onClick={() => handleAnswer('DIVE_ENGAGE')}>I like to dive into the enemy team and disrupt their backline.</button>
          <button className={styles.roleButton}onClick={() => handleAnswer('CC_ENGAGE')}>I enjoy locking down high-priority targets and providing crowd control.</button>          
          <button className={styles.roleButton}onClick={() => handleAnswer('CATCH_ENGAGE')}>I prefer to catch enemies out of position and set up plays for my team</button>       
          </div>
      )}


      {selected === 'Mage' &&  (
        <div className={styles.box}>
          <h1>As a mage support, how do you prefer to support your team and control the lane?</h1>

          <button className={styles.roleButton}onClick={() => handleAnswer('POKE_MAGE_SUPPORT')}>I like to poke and zone enemies with long-range abilities</button>
          <button className={styles.roleButton}onClick={() => handleAnswer('UTILITY_MAGE_SUPPORT')}>I enjoy providing utility and crowd control to set up plays.</button>          
          <button className={styles.roleButton}onClick={() => handleAnswer('BURST_MAGE_SUPPORT')}>I prefer to deal high burst damage to quickly eliminate threats.</button>
          
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

  

