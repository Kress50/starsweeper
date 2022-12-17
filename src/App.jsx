import React, { useState, useContext } from "react";
import { Route, Routes } from "react-router";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import Index from "./pages/Index";
import GameContext from "./store/game-context";
import Rules from "./components/Layout/Rules";
import Highscores from "./components/Layout/Highscores";
import Authenticate from "./pages/Authenticate";

function App() {
	const ctx = useContext(GameContext);
	const [isRulesShown, setIsRulesShown] = useState(false);
	const [isHighscoresShown, setIsHighscoresShown] = useState(false);

	function shownHandler(e) {
		e.preventDefault();
		if (e.target.innerText === "Rules") setIsRulesShown(!isRulesShown);
		if (e.target.innerText === "Highscores")
			setIsHighscoresShown(!isHighscoresShown);
		return;
	}

	return (
		<React.Fragment>
			{ctx.hasStarted && <Header showModals={shownHandler} />}
			<Routes>
				<Route path="/" element={<Index shownHandler={shownHandler} />}></Route>
				<Route path="/authenticate" element={<Authenticate />}></Route>
				<Route path="*" element={<Index />}></Route>
			</Routes>
			{isRulesShown && <Rules></Rules>}
			{isHighscoresShown && <Highscores></Highscores>}
			<Footer />
		</React.Fragment>
	);
}

export default App;
