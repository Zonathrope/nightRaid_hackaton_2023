import React, {PropsWithChildren}from 'react'
import Header from '@/components/Header'

import styles from './ComponentWrapper.module.scss'

const ComponentWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <div>
        <Header />
      </div>
      {children}
    </div>
  )
}

export default ComponentWrapper
