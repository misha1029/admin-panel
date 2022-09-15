import React, { FC, PropsWithChildren } from 'react'

import { Meta } from '../../../utils/meta/Meta'
import { IMeta } from '../../../utils/meta/meta.interface'

import { Header } from './Header/Header'

import styles from './Layout.module.scss'

export const Layaut: FC<PropsWithChildren<IMeta>> = ({ children, ...meta }) => {
	return (
		<>
			<Meta {...meta} />
			<div>
				<Header />
				<main className = {styles.main}>{children}</main>
			</div>
		</>
	)
}
