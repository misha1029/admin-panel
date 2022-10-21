import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { MovieService } from '../../../services/movie/movie.service'
import { ViewsService } from '../../../services/views/views.service'
import { Layaut } from '../../ui/Layout/Layaut'

import styles from './Movie.module.scss'
import { Reviews } from './reviews/Reviews'

const Movie = () => {
	const { query } = useRouter()

	const movieId = Number(query?.id)

	const { data: movie, isLoading } = useQuery(
		['get movie', query?.id],
		() => MovieService.getMovieById(movieId),
		{
			enabled: !!movieId, // тоько если существует movieId
			select: ({ data }) => data,
		}
	)

	const { mutateAsync } = useMutation(['update count opened'], () =>
		ViewsService.updateViews(movieId.toString())
	)

	useEffect(() => {
		if (movieId) mutateAsync()
	}, [movieId])

	return (
		<Layaut title={`${movie?.name} - Cinema`}>
			<div className={styles.wrapper}>
				<div className={styles.poster}>
					{movie?.poster && (
						<Image
							className={styles.image}
							src={movie?.poster || ''}
							alt={movie?.name}
							width={220}
							height={330}
							layout="responsive"
						/>
					)}
				</div>
				<div className={styles.detail}>
					<h1 className={styles.heading}>{movie?.name}</h1>
					<div className={styles.rating}>{movie?.rating?.toFixed(1)}</div>
					<div className={styles.title}>About movie</div>
					<ul>
						<li>
							<span>Fees in the world</span>
							<span>${movie?.fees.toLocaleString()}</span>
						</li>
					</ul>
					<Reviews
						movieId={movieId}
						reviews={movie?.review || []}
						isLoading={isLoading}
					/>
				</div>
			</div>
		</Layaut>
	)
}

export default Movie
