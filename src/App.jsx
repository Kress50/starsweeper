import React, { useContext } from "react";
import { Route, Routes } from "react-router";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import Index from "./pages/Index";
import GameContext from "./store/game-context";
import Authenticate from "./pages/Authenticate";
import StarsBackground from "./components/StarsBackground";
import { CssBaseline } from "@mui/joy";

function App() {
	const ctx = useContext(GameContext);

	return (
		<React.Fragment>
			<CssBaseline />
			<StarsBackground />
			{ctx.hasStarted && <Header />}
			<Routes>
				<Route path="/" element={<Index />}></Route>
				<Route path="/authenticate" element={<Authenticate />}></Route>
				<Route path="*" element={<Index />}></Route>
			</Routes>
			<Footer />
		</React.Fragment>
	);
}

export default App;
