
import { axiosClassic } from '../../api/interceptor'

import { IAuthResponse } from '../../shared/interfaces/user.interface'

import { removeTokensStorage, saveToStorage } from './auth.helper'

export const AuthService = {
    async login(email: string, password: string) { // принимаем на серв email, password
		const response = await axiosClassic.post<IAuthResponse>( // IAuthResponse - то что получаем от сервера
			('/auth/login'),
			{ email, password } // передаём на серв email, password
		)
		if (response.data.accessToken) { // если приходит токер то сохраняем его в хранилище
			saveToStorage(response.data)
		}
		return response.data
	},

	async register(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			('/auth/register'),
			{ email, password }
		)
		if (response.data.accessToken) {
			saveToStorage(response.data)
		}
		return response.data
	},
	logout() {
		removeTokensStorage()
		localStorage.removeItem('user')
	},
}