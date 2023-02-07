import React from 'react'
import AuthorizationPage from '@/components/Authorization/Authorization'

import ComponentWrapper from '@/components/ComponentWrapper'

const Authorization = () => {
  return (
    <ComponentWrapper isLogin>
      <AuthorizationPage/>
    </ComponentWrapper>
  )
}

export default Authorization
