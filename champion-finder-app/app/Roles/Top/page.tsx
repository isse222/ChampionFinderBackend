"use client";

import qs from 'qs';

import React, { useState, useEffect } from 'react';

import axios from 'axios';

import styles from './Top.module.css';




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

        <button  className={styles.roleButton} onClick={handleDiver}>Diver</button>
        <button  className={styles.roleButton} onClick={handleMarksmen}>Marksmen</button>
        <button  className={styles.roleButton} onClick={handleJuggernaut}>Juggernaut</button>
        <button  className={styles.roleButton} onClick={handleTank}>Tank</button>
        <button  className={styles.roleButton} onClick={handleSkirmisher}>Skirmisher</button>
        <button  className={styles.roleButton} onClick={handleSpecialist}>Specialist</button>
      </>

      </div>
)}
   

      

{selected === 'Diver' && (
        <div className={styles.box}>
          <h1>How do you prefer to approach fights as a diver</h1>
  
          <button className={styles.roleButton}onClick={() => handleAnswer('AGGRESSIVE_DIVER')}>I like to relentlessly charge at the enemy, shrugging off crowd control and dealing sustained damage.</button>
          <button className={styles.roleButton}onClick={() => handleAnswer('DISRUPTIVE_DIVER')}>I enjoy engaging with crowd control and AoE abilities to disrupt the enemy team.</button>          
          <button className={styles.roleButton}onClick={() => handleAnswer('MOBILE_DIVER')}>I prefer quickly dashing in and out of fights, striking at key moments with precision and finesse.</button>

          </div>
      )}

{selected === 'Juggernaut' && (
        <div className={styles.box}>
          <h1>How do you prefer to approach fights as a juggernaut?</h1>
  
          <button className={styles.roleButton}onClick={() => handleAnswer('SUSTAIN_JUGGERNAUT')}>I like to sustain through fights with built-in healing and massive damage.</button>
          <button className={styles.roleButton}onClick={() => handleAnswer('TANKY_JUGGERNAUT')}>I prefer getting into the thick of fights, tanking damage, and disrupting the enemy team.</button>          
          <button className={styles.roleButton}onClick={() => handleAnswer('DAMAGE_JUGGERNAUT')}>I enjoy dealing devastating damage and wiping out enemies quickly.</button>       
          </div>
      )}
      
      {selected === 'Marksmen' && (
        <div className={styles.box}>
          <h1>How do you prefer to engage or start fights as a marksman?</h1>
  
      
          <button className={styles.roleButton}onClick={() => handleAnswer('POKE')}>I like to engage from a distance and poke my enemies.</button>          
          <button className={styles.roleButton}onClick={() => handleAnswer('AGILE')}>I prefer quick and agile engages to catch enemies off guard.</button>
          </div>
      )}

{selected === 'Tank' && (
        <div className={styles.box}>
          <h1>How do you prefer to approach fights as a tank?</h1>
  
      
          <button className={styles.roleButton}onClick={() => handleAnswer('PROTECTIVE_TANK')}>"I like to soak up damage and protect my team with crowd control.</button>          
          <button className={styles.roleButton}onClick={() => handleAnswer('ENGAGING_TANK')}>I prefer initiating fights and engaging the enemy team.</button>
          <button className={styles.roleButton}onClick={() => handleAnswer('DISRUPTIVE_TANK')}>I enjoy disrupting the enemy team's positioning and causing chaos in teamfights.</button>
          </div>
      )}

{selected === 'Skirmisher' && (
        <div className={styles.box}>
          <h1>How do you prefer to approach fights as a skirmisher?</h1>
  
      
          <button className={styles.roleButton}onClick={() => handleAnswer('MOBILE_SKIRMISHER')}> I rely on quick bursts of damage and mobility to outmaneuver my opponents.</button>          
          <button className={styles.roleButton}onClick={() => handleAnswer('SUSTAIN_SKIRMISHER')}>I prefer extended duels and sustaining through fights with lifesteal or self-healing.</button>
          <button className={styles.roleButton}onClick={() => handleAnswer('AGGRESSIVE_SKIRMISHER')}>I like to engage with all-out aggression, dealing massive damage in close combat.</button>
          </div>
      )}


      {selected === 'Specialist' &&  (
        <div className={styles.box}>
          <h1>How do you prefer to approach fights as a specialist champion?</h1>

          <button className={styles.roleButton}onClick={() => handleAnswer('AOE_SPECIALIST')}>I love dealing massive area-of-effect damage and disrupting teamfights.</button>
          <button className={styles.roleButton}onClick={() => handleAnswer('DISRUPTIVE_SPECIALIST')}>I enjoy surprising enemies and making game-changing plays with unique abilities.</button>          
          <button className={styles.roleButton}onClick={() => handleAnswer('VERSATILE_SPECIALIST')}>I prefer playing a versatile champion with the ability to switch between different forms or styles.</button>
          <button className={styles.roleButton}onClick={() => handleAnswer('UTILITY_SPECIALIST')}>I like being a utility-focused champion, helping my team with crowd control and support abilities.</button>
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