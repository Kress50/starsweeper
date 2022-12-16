import React, { useState, useContext } from "react";
import { Route, Routes } from "react-router";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import Index from "./pages/Index";
import GameContext from "./store/game-context";
import Rules from "./components/Layout/Rules";
import Highscores from "./components/Layout/Highscores";
import LoginModal from "./components/Layout/LoginModal";
import Signup from "./pages/Signup";
import Signin from "./pages/Login";
import AuthContext from "./store/auth-context";

function App() {
	const ctx = useContext(GameContext);
	const authCtx = useContext(AuthContext);
	const [isRulesShown, setIsRulesShown] = useState(false);
	const [isHighscoresShown, setIsHighscoresShown] = useState(false);

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
			{!authCtx.isLoggedIn && !authCtx.isLoggedGuest && (
				<LoginModal></LoginModal>
			)}
			{ctx.hasStarted && <Header showModals={shownHandler} />}
			<Routes>
				<Route path="/" element={<Index shownHandler={shownHandler} />}></Route>
				<Route path="/signin" element={<Signin />}></Route>
				<Route path="/signup" element={<Signup />}></Route>
				<Route path="*" element={<Index />}></Route>
			</Routes>
			{isRulesShown && <Rules></Rules>}
			{isHighscoresShown && <Highscores></Highscores>}
			<Footer />
		</React.Fragment>
	);
}

export default App;
