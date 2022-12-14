import React, { useState, useContext } from "react";
import { Route, Routes } from "react-router";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import Index from "./pages/Index";
import GameContext from "./store/game-context";
import Rules from "./components/Layout/Rules";
import Highscores from "./components/Layout/Highscores";
import Login from "./pages/Login";
import LoginModal from "./components/Layout/LoginModal";

function App() {
	const ctx = useContext(GameContext);
	const [isRulesShown, setIsRulesShown] = useState(false);
	const [isHighscoresShown, setIsHighscoresShown] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isGuest, setIsGuest] = useState(false);

	function shownHandler(e) {
		e.preventDefault();

		if (e.target.innerText === "Rules") setIsRulesShown(true);
		if (e.target.innerText === "Highscores") setIsHighscoresShown(true);
		return;
	}

	function guestHandler(e) {
		e.preventDefault();
		setIsLoggedIn(true);
		setIsGuest(true);
	}

	return (
		<React.Fragment>
			{!isLoggedIn && !isGuest && (
				<LoginModal onLoginGuest={guestHandler}></LoginModal>
			)}
			{ctx.hasStarted && <Header showModals={shownHandler} />}
			<Routes>
				<Route path="/" element={<Index shownHandler={shownHandler} />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="*" element={<Index />}></Route>
			</Routes>
			{isRulesShown && <Rules></Rules>}
			{isHighscoresShown && <Highscores></Highscores>}
			<Footer />
		</React.Fragment>
	);
}

export default App;
