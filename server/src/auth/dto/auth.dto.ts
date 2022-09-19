// dto - данные которые приходят к нам из вне, мы их должны свалидировать

import { IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsString()
	email: string

	@MinLength(6, { message: 'Password cannot be less than 6 characters' })
	@IsString()
	password: string
}