import Logo from '@/svg/logo'
import React from 'react'
import Link from 'next/link'
import useUser from '@/hooks/user'
import { Link as ILink, links } from './helper'

import styles from './Header.module.scss'

const Header = () => {
  const {
    data,
    refetch
  } = useUser()
  const { isAuthorized } = data || {}
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <nav className={styles.navbar}>
        {links
        .filter((link) => (link.secured || link.isLogin ? (link.secured && isAuthorized) || (link.isLogin && !isAuthorized) : true))
        .map((el: ILink) => <Link onClick={el.handler ? () => {
          el.handler()
          refetch()
        } : null} className={styles.link}
                                  key={el.title} href={el.href}>{el.title}</Link>)}
      </nav>
    </header>
  )
}

export default Header
