import React, { createContext, FC, PropsWithChildren, useState } from 'react'
import { IContext, TypeUserState } from './auth.interface'

export const AuthContext = createContext({} as IContext)

const AuthProviders: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [user, setUser] = useState<TypeUserState>(null)

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProviders;
