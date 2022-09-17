import type { AppProps } from 'next/app'

import '../app/assets/styles/globals.scss'
import AuthProviders from '../app/providers/auth-providers/AuthProviders'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthProviders>
			<Component {...pageProps} />
		</AuthProviders>
	)
}

export default MyApp
