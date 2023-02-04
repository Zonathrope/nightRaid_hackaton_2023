import Logo from '@/svg/logo'
import React from 'react'
import Link from 'next/link'
import { Link as ILink, links } from './helper'

import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <nav className={styles.navbar}>
        {links.map((el: ILink) => <Link className={styles.link} key={el.title} href={el.href}>{el.title}</Link>)}
      </nav>
    </header>
  )
}

export default Header
