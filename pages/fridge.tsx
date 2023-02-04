import React from 'react'
import { NextPage } from 'next'
import ComponentWrapper from '@/components/ComponentWrapper'

import FridgePage from '@/components/Fridge'

const Fridge: NextPage = () => {
  return (<ComponentWrapper><FridgePage/></ComponentWrapper>)
}

export default Fridge
