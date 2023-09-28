import { useState } from 'react'
import Link from 'next/link';
import styles from './Roles.module.css';




export default function Roles() {
  

  return (
<main className="flex items-center justify-center h-screen">
      <div className={styles.box}>
        <h2 className={styles.title}>What is your favorite role?</h2>
        <div>
          <Link href="Roles/Top"> 
            <button className={styles.roleButton}>Top</button>
          </Link>
        </div>
        <div>
          <Link href="Roles/Mid"> 
            <button className={styles.roleButton}>Mid</button>
          </Link>
        </div>
        <div>
          <Link href="Roles/Jungle"> 
            <button className={styles.roleButton}>Jungle</button>
          </Link>
        </div>
        <div>
          <Link href="Roles/Support"> 
            <button className={styles.roleButton}>Support</button>
          </Link>
        </div>
        <div>
          <Link href="Roles/Adc"> 
            <button className={styles.roleButton}>Adc</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
