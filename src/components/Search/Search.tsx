import React, { useState } from 'react'
import { useGetMeals } from '@/queries/meals'
import SearchInput from '@/components/Search/SearchInput/SearchInput'
import useDebounce from '@/components/Search/SearchInput/helper'

import styles from './Search.module.scss'

const Search = () => {
  const [state, setState] = useState({
    title: '',
    isExternalWebsite: true
  })
  const debouncedTitle = useDebounce(state.title, 300)
  const { data, isLoading } = useGetMeals(debouncedTitle, state.isExternalWebsite)

  return (
    <div className={styles.wrapper}>
      <SearchInput title={state.title} isExternalWebsite={state.isExternalWebsite} setState={setState} />
    </div>
  )
}

export default Search
