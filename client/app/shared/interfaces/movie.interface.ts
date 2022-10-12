import { IReview } from './review.interface'

export interface IMovie {
	id: number
	name: string
	rating: number | null // или число либо null
	poster: string
	views: number
	reviews?: IReview[]
	fees: number
}

export interface IMovieDto extends Pick<IMovie, 'name' | 'fees' | 'poster'> {} // входные данные которые мы отпровляем на сервак
