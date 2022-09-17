import { motion } from 'framer-motion'
import React, { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaRegUserCircle } from 'react-icons/fa'

import { useAuth } from '../../../../../hooks/useAuth'
import { useOutside } from '../../../../../hooks/useOutside'
import { FADE_IN, menuAnimation } from '../../../../../utils/animation/fade'
import { Button } from '../../../Button/Button'
import Field from '../../../Field/Field'
import { UserAvatar } from '../../../UserAvatar/UserAvatar'

import styles from './LoginForm.module.scss'
import { IAuthFields, validEmail } from './login-form.interface'

export const LoginForm: FC = () => {
	const { ref, setIsShow, isShow } = useOutside(false)
	 
	React.useEffect (() => {
		setIsShow(false)
	}, [])

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

	const onSubmit: SubmitHandler<IAuthFields> = () => {
		if (type === 'login')
			setUser({
				id: 1,
				email: 'test@gmail.com',
				avatarPath: '/avatar.png',
				name: 'Test Testovich',
			})

		reset()
		setIsShow(false)
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

			<motion.div animate={isShow ? 'open' : 'closed'} variants={menuAnimation}>
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
