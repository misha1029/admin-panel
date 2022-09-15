import React, { FC } from 'react'
import styles from './Header.module.scss'
import { LoginForm } from './LoginForm/LoginForm'
import { Logo } from './Logo'

export const Header: FC = () => {
  return (
    <header className={styles.header}>
        <Logo/>
        <LoginForm/>
    </header>
  )
}
