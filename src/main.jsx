import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GameContextProvider } from "./store/game-context";
import { AuthContextProvider } from "./store/auth-context";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthContextProvider>
			<GameContextProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</GameContextProvider>
		</AuthContextProvider>
	</React.StrictMode>
);
