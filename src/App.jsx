import React, { useContext } from "react";
import { Route, Routes } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Index from "./pages/Index";
import Highscores from "./pages/Highscores";
import GameContext from "./store/game-context";

function App() {
	const ctx = useContext(GameContext);

	return (
		<React.Fragment>
			{ctx.hasStarted && <Header />}
			<Routes>
				<Route path="/" element={<Index />}></Route>
				<Route path="/highscores" element={<Highscores />}></Route>
				<Route path="*" element={<Index />}></Route>
			</Routes>
			<Footer />
		</React.Fragment>
	);
}

export default App;
