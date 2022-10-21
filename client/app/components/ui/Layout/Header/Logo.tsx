import Link from 'next/link'
import React from 'react'

import styles from './Header.module.scss'

export const Logo = () => {
	return (
		<Link href="/">
			<a className={styles.logo}>Cinema online</a>
		</Link>
	)
}
