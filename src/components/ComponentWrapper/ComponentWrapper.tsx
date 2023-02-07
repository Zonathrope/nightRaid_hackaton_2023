import React, { PropsWithChildren, useEffect } from 'react'
import Header from '@/components/Header'
import useUser from '@/hooks/user'
import { useRouter } from 'next/router'

interface ComponentWrapperProps {
  secured?: boolean
  isLogin?: boolean
}

const ComponentWrapper: React.FC<PropsWithChildren & ComponentWrapperProps> = ({
  children,
  secured,
  isLogin
}) => {
  const { data, isLoading } = useUser()
  const { isAuthorized } = data || {}
  const router = useRouter()
  useEffect(() => {
    if (secured && !isAuthorized) {
      router.push('/')
    }
  }, [secured, isAuthorized, router])
  useEffect(() => {
    if (isLogin && isAuthorized) {
      router.push('/')
    }
  }, [isLogin, isAuthorized, router])

  return (
    <div>
      <div>
        <Header />
      </div>
      {isLoading ? null : children}
    </div>
  )
}

export default ComponentWrapper
