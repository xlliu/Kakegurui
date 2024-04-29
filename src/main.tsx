// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { THEME, TonConnectUIProvider } from '@tonconnect/ui-react';
import "./react-i18next/i18n";

// const manifestUrl = 'https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json';
const manifestUrl = 'https://jeerclub.xyz/tonconnect-manifest.json'
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
			twaReturnUrl: 'https://t.me/KKGurui_bot/KKG'
		}}
	>
		<NextUIProvider>
			<App />
			{/* // dark text-foreground bg-background */}
		</NextUIProvider>
	</TonConnectUIProvider>,
)
