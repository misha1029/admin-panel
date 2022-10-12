import React, { FC } from 'react'

import { Layaut } from '../../ui/Layout/Layaut'
import { MovieItem } from '../../ui/MovieItem/MovieItem'

import styles from './Home.module.scss'
import { IHome } from './home.interfafe'

export const Home: FC<IHome> = ({ newMovies }) => {
	return (
		<Layaut title="Cinema">
			<h1 className={styles.heading}>Newest movies</h1>
			<div className = {styles.catalog}>
				{newMovies.length ? (
					newMovies.map((movie) => <MovieItem key={movie.id} movie={movie} />)
				) : (
					<div> Movie not found</div>
				)}
			</div>
		</Layaut>
	)
}
