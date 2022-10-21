import React, { FC } from 'react'

import { useAuth } from '../../../../hooks/useAuth'
import { IReview } from '../../../../shared/interfaces/review.interface'
import { SkeletonLoader } from '../../../ui/SkeletonLoader'

import { AddReviewForm } from './AddForm/AddReviewForm'
import styles from './Reviews.module.scss'
import { IReviews } from './reviews.interface'
import { ReviewItem } from './ReviewItem'


export const Reviews: FC<IReviews> = ({ movieId, reviews, isLoading }) => {
	const { user } = useAuth()
	return (
		<div className = 'mt-10'>
			<div>{user && <AddReviewForm movieId={movieId} />}</div>
			{isLoading ? (
				<SkeletonLoader />
			) : reviews?.length ? (
				<>
					<div className={styles.grid}>
						{reviews.map((rew) => (
							<ReviewItem review={rew} key={rew.id} />
						))}
					</div>
				</>
			) : (
				<p>Reviews not found!</p>
			)}
		</div>
	)
}
