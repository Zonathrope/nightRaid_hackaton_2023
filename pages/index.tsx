import type { NextPage } from 'next'
import ComponentWrapper from '@/components/ComponentWrapper/ComponentWrapper'

import HomePage from '@/components/Home'

const Home: NextPage = () => {
  return (<ComponentWrapper><HomePage/></ComponentWrapper>)
}

export default Home
