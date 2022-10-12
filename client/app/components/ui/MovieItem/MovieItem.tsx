import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

import { IMovie } from '../../../shared/interfaces/movie.interface'

import styles from './MovieItem.module.scss'

export const MovieItem: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<Link href={`/movie/${movie.id}`}>
			<a className={styles.item}>
				{movie.rating && (
					<div className={styles.rating}>{movie.rating.toFixed(1)}</div>
				)}
				<div className={styles.poster}>
					<Image
						src={movie.poster}
						alt={movie.name}
						width={220}
						height={330}
						layout="responsive"
					/>
				</div>
				<div className={styles.heading}>{movie.name}</div>
			</a>
		</Link>
	)
}
