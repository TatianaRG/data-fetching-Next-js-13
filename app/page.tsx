import Link from 'next/link'
import styles from './page.module.css'
import { Inter } from 'next/font/google'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Hello</h1>
      <p>
        <Link href="/users">Users</Link>
      </p>
    </main>
  )
}
