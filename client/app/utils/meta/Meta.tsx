import Head from 'next/head'
import React, { FC } from 'react'

import { IMeta } from './meta.interface'

export const Meta: FC<IMeta> = ({ description, title }) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<link rel="shortcut icon" href="/tv.png" type="image/png" />
				{description ? (
					<meta
						itemProp="description"
						name="description"
						content={description}
					/>
				) : (
					<meta name="robots" content="noindex, nofollow" />
				)}
			</Head>
		</>
	)
}
