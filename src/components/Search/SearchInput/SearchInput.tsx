import React from 'react'

import styles from './SearchInput.module.scss'

interface SearchInputProps {
  title: string,
  isExternalWebsite: boolean,
  setState: React.Dispatch<React.SetStateAction<{ title: string, isExternalWebsite: boolean }>>
}

const SearchInput: React.FC<SearchInputProps> = ({
  title,
  isExternalWebsite,
  setState
}) => {
  const setInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      title: e.target.value
    }))
  }

  const changeWebsite = () => {
    setState((prev) => ({
      ...prev,
      isExternalWebsite: !prev.isExternalWebsite
    }))
  }

  return (
    <div className={styles.input}>
      <input type='text' value={title} onChange={setInput} />
      <button onClick={changeWebsite}>{isExternalWebsite ? 'website' : 'users'}</button>
    </div>
  )
}

export default SearchInput
