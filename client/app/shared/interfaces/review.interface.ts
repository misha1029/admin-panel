import { IMovie } from "./movie.interface"
import { IUser } from "./user.interface"

export interface IReview {
    id: number
    user: IUser
    movie: IMovie
    description: string
}