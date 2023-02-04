import React, {PropsWithChildren}from 'react'
import Header from '@/components/Header'

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
