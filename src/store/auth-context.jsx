import { signInWithPopup } from "firebase/auth";
import { createContext, useContext, useState } from "react";
import { auth, providerGoogle } from "../../firebase-config";

const AuthContext = createContext({
	user: {},
	isLoggedIn: false,
	isLoggedGuest: false,
	signOutHandler: () => {},
	signInAsGuestHandler: () => {},
	signInWithGoogleHandler: () => {},
});

export function AuthContextProvider(props) {
	const [user, setUser] = useState({
		id: localStorage.getItem("id") || null,
		name: localStorage.getItem("name") || null,
	});
	const [isLoggedIn, setIsLoggedIn] = useState(
		localStorage.getItem("id") ? true : false
	);
	const [isLoggedGuest, setIsLoggedGuest] = useState(false);

	//Sets id and name to localstorage
	function saveToLocalStorageHandler(uid, username) {
		localStorage.setItem("id", uid);
		localStorage.setItem("name", username);
	}

	//Deleted localstorage keys
	function purgeFromLocalStorageHandler() {
		localStorage.removeItem("id");
		localStorage.removeItem("name");
	}

	function signOutHandler() {
		setUser({
			id: null,
			name: null,
		});
		setIsLoggedIn(false);
		setIsLoggedGuest(false);
		purgeFromLocalStorageHandler();
	}

	const signInAsGuestHandler = () => {
		setIsLoggedGuest(true);
	};

	//Google authenticator via firebase
	const signInWithGoogleHandler = () => {
		signInWithPopup(auth, providerGoogle)
			.then((result) => {
				const username = result.user.displayName;
				const uid = result.user.uid;
				setUser({
					id: uid,
					name: username,
				});
				setIsLoggedIn(true);
				saveToLocalStorageHandler(uid, username);
			})
			.catch((error) => {
				alert(`Something went wrong! Error: ${error}`);
			});
	};

	return (
		<AuthContext.Provider
			value={{
				user: user,
				isLoggedIn: isLoggedIn,
				isLoggedGuest: isLoggedGuest,
				signOutHandler: signOutHandler,
				signInAsGuestHandler: signInAsGuestHandler,
				signInWithGoogleHandler: signInWithGoogleHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
