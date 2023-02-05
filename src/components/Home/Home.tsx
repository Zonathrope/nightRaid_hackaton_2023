import React from 'react'

import styles from './Home.module.scss'

const Home = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.upperText}>the</div>
        <div className={styles.centerText}>
          Meal app
        </div>
      </div>
    </section>
  )
}

export default Home
