import { motion } from 'framer-motion'
import React, { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaRegUserCircle } from 'react-icons/fa'


import { useAuth } from '../../../../../hooks/useAuth'
import { useOutside } from '../../../../../hooks/useOutside'
import { AuthService } from '../../../../../services/auth/auth.service'
import { FADE_IN, menuAnimation } from '../../../../../utils/animation/fade'
import { Button } from '../../../Button/Button'
import Field from '../../../Field/Field'
import { UserAvatar } from '../../../UserAvatar/UserAvatar'

import styles from './LoginForm.module.scss'
import { IAuthFields, validEmail } from './login-form.interface'
import { useMutation } from '@tanstack/react-query'

export const LoginForm: FC = () => {
	const { ref, setIsShow, isShow } = useOutside(false)

	const [type, setType] = useState<'login' | 'register'>('login')

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<IAuthFields>({
		mode: 'onChange',
	})

	const { user, setUser } = useAuth()

	const { mutate: loginSync } = useMutation(
		['login'],
		(data: IAuthFields) => AuthService.login(data.email, data.password), // делаем запрос на сервер получаем куки и сохраняем ЮЗЕРА в ЛОКАЛСТОРДЖ

		{
			onSuccess(data) { // при саксесе обновляем состояние нашего контекста
				if (setUser) setUser(data.user)
				reset() // чистим поля у формы
				setIsShow(false) // закрываем окошко
			},
		}
	)

	const { mutate: registerSync } = useMutation(
		['register'],
		(data: IAuthFields) => AuthService.login(data.email, data.password),

		{
			onSuccess(data) {
				if (setUser) setUser(data.user)
				reset() 
				setIsShow(false)
			},
		}
	)

	const onSubmit: SubmitHandler<IAuthFields> = (data) => {
		if (type === 'login') loginSync(data)
		else if (type === 'register') registerSync(data)
	}

	return (
		<div className={styles.wrapper} ref={ref}>
			{user ? (
				<UserAvatar
					title="Перейти в админку"
					link="/dashbord"
					avatarPath={user.avatarPath || ''}
				/>

			) : (
				<button onClick={() => setIsShow(!isShow)} className={styles.button}>
					<FaRegUserCircle />
				</button>
			)}

			<motion.div initial = {false} animate={isShow ? 'open' : 'closed'} variants={menuAnimation}>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<Field
						{...register('email', {
							required: 'Email is require',
							pattern: {
								value: validEmail,
								message: 'Please enter a valid email address',
							},
						})}
						placeholder="Email"
						error={errors.email}
					/>
					<Field
						{...register('password', {
							required: 'Password is require',
							minLength: {
								value: 6,
								message: 'Min length should more 6 symbols',
							},
						})}
						placeholder="Password"
						error={errors.password}
						type={'password'}
					/>
					<div className={styles.loginButton}>
						<Button onClick={() => setType('login')}>Login</Button>
					</div>
					<button
						className={styles.register}
						onClick={() => setType('register')}
					>
						Register
					</button>
				</form>
			</motion.div>
		</div>
	)
}
