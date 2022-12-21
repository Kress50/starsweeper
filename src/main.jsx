import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GameContextProvider } from "./store/game-context";
import { AuthContextProvider } from "./store/auth-context";
import { CssVarsProvider } from "@mui/joy";
import "@fontsource/public-sans";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthContextProvider>
			<GameContextProvider>
				<BrowserRouter>
					<CssVarsProvider defaultMode="dark">
						<App />
					</CssVarsProvider>
				</BrowserRouter>
			</GameContextProvider>
		</AuthContextProvider>
	</React.StrictMode>
);
