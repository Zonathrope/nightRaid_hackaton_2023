import React, { useState } from 'react'
import { useGetMeals } from '@/queries/meals'
import SearchInput from '@/components/Search/SearchInput/SearchInput'
import useDebounce from '@/components/Search/SearchInput/helper'

import styles from './Search.module.scss'
import MealCard from '@/components/Search/MealCard/MealCard'
import { Meal } from '@/server/model'

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
      <div className={styles.cardList}>
        {isLoading ? <>Loading</> : (data || []).map((el: Meal) => <MealCard key={el.id} {...el}/>)}
      </div>
    </div>
  )
}

export default Search
