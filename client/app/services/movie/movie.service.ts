import axios, { axiosClassic } from '../../api/interceptor'
import { IMovie, IMovieDto } from '../../shared/interfaces/movie.interface'

export const MovieService = {
	async getMovieById(id: string) {
		return axiosClassic.get<IMovie>(`/movie/${id}`)
	},

	async getAll(searchTerm?: string) {
		return axiosClassic.get<IMovie[]>(`/movie`, {
			params: searchTerm ? { searchTerm } : {},
		})
	},

	async createMovie() {
		return axios.post<string>('/movie')
	},

	async updateMovie(id: string, body: IMovieDto) {
		return axios.put<IMovie>(`/movie/${id}`, body)
	},

	async deleteMovie(id: string) {
		const result = confirm('Want to delete?')
		if (result) {
			return axios.delete<string>(`/movie/${id}`)
		}
	},
}
