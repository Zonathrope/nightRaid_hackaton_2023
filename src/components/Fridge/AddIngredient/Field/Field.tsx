import React from 'react'

import styles from './Field.module.scss'

interface FieldProps {
  placeholder: string,
  name: string,
  value: string,
  errors?: string,
  isTouched?: boolean,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
}

const Field: React.FC<FieldProps> = (props) => {
  const {
    placeholder,
    errors,
    name,
    isTouched,
    value,
    onBlur,
    onChange
  } = props
  return (
    <div className={styles.input}>
      <label htmlFor={name}>{placeholder}</label>
      <input type='text' name={name} placeholder={placeholder} value={value} onBlur={onBlur} onChange={onChange} />
      <div className={styles.error}>{errors && isTouched ? <>{errors}</> : null}</div>
    </div>
  )
}

export default Field
