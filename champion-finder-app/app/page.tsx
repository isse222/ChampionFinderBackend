import styles from './Home.module.css';
import Link from 'next/link';
export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen">
    <div className={styles.box}>
      <h1 className={styles.title}>Welcome to Champion Finder</h1>
      <p className={styles.subtitle}>Click to find the champion for you </p>
      <button className={styles.button}>
      <Link href="/Roles">
    Click
  </Link>
      </button>
    </div>
  </main>

  )
}
