import axios from 'axios'

import { IReview, IReviewDto } from '../../shared/interfaces/review.interface'

export const ReviewService = {
	async createReview(body: IReviewDto) {
		return axios.post<IReview>(`/review`, body) // <> - то что внутри это то что придёт в ответе с сервера
	},
}
