// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { THEME, TonConnectUIProvider } from '@tonconnect/ui-react';

const manifestUrl = 'https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json';

ReactDOM.createRoot(document.getElementById('root')!).render(
	// <TonConnectUIProvider manifestUrl={manifestUrl}>
	<TonConnectUIProvider
		manifestUrl={manifestUrl}
		uiPreferences={{ theme: THEME.DARK, borderRadius: "s"}}
		walletsListConfiguration={{
			includeWallets: [
				{
					appName: "safepalwallet",
					name: "SafePal",
					imageUrl: "https://s.pvcliping.com/web/public_image/SafePal_x288.png",
					aboutUrl: "https://www.safepal.com/download",
					jsBridgeKey: "safepalwallet",
					platforms: ["ios", "android", "chrome", "firefox"]
				},
				{
					appName: "tonwallet",
					name: "TON Wallet",
					imageUrl: "https://wallet.ton.org/assets/ui/qr-logo.png",
					aboutUrl: "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
					universalLink: "https://wallet.ton.org/ton-connect",
					jsBridgeKey: "tonwallet",
					bridgeUrl: "https://bridge.tonapi.io/bridge",
					platforms: ["chrome", "android"]
				}
			]
		}}
		actionsConfiguration={{
			twaReturnUrl: 'https://t.me/DemoDappWithTonConnectBot/demo'
		}}
	>
		<NextUIProvider>
			<App />
			{/* // dark text-foreground bg-background */}
		</NextUIProvider>
	</TonConnectUIProvider>,
)
