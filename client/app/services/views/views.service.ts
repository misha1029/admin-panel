import { axiosClassic } from '../../api/interceptor'

export const ViewsService = {
	async updateViews(movieId: string) {
		return axiosClassic.patch<any>(`/views/update/${movieId}`) // <> - то что внутри это то что придёт в ответе с сервера
	},
}
