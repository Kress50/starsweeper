import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { createContext, useState } from "react";
import { auth, providerGoogle } from "../../firebase-config";

const AuthContext = createContext({
	user: {},
	isLoggedIn: false,
	isLoggedGuest: false,
	signOutHandler: () => {},
	signInAsGuestHandler: () => {},
	signInWithGoogleHandler: () => {},
	signUpWithEmailHandler: () => {},
	signInWithEmailHandler: () => {},
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
		signOut(auth)
			.then(() => {
				setUser({
					id: null,
					name: null,
				});
				setIsLoggedIn(false);
				setIsLoggedGuest(false);
				purgeFromLocalStorageHandler();
			})
			.catch((error) => {
				console.log(error);
			});
	}

	const signInAsGuestHandler = () => {
		setIsLoggedGuest(true);
		setUser({
			id: null,
			name: "Guest",
		});
	};

	//Google authenticator via firebase
	const signInWithGoogleHandler = () => {
		signInWithPopup(auth, providerGoogle)
			.then((result) => {
				const username = result.user.email.split("@")[0];
				const uid = result.user.uid;
				setUser({
					id: uid,
					name: username,
				});
				setIsLoggedIn(true);
				saveToLocalStorageHandler(uid, username);
			})
			.catch((error) => {
				return `Something went wrong! Error: ${error}`;
			});
	};

	const signUpWithEmailHandler = async (email, password) => {
		try {
			const user = await createUserWithEmailAndPassword(auth, email, password);
			const username = user.user.email.split("@")[0];
			const uid = user.user.uid;
			setUser({
				id: uid,
				name: username,
			});
			setIsLoggedIn(true);
			saveToLocalStorageHandler(uid, username);
		} catch (error) {
			throw error;
		}
	};

	const signInWithEmailHandler = async (email, password) => {
		try {
			const user = await signInWithEmailAndPassword(auth, email, password);
			const username = user.user.email.split("@")[0];
			const uid = user.user.uid;
			setUser({
				id: uid,
				name: username,
			});
			setIsLoggedIn(true);
			saveToLocalStorageHandler(uid, username);
		} catch (error) {
			throw error;
		}
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
				signUpWithEmailHandler: signUpWithEmailHandler,
				signInWithEmailHandler: signInWithEmailHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
