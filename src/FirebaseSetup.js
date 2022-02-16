/*eslint-disable */
//
//  FirebaseSetup.js
//  Raedam
//
//  Created on 5/1/2021. Modified on 5/1/2021 by Ryan Kirkpatrick.
//  Copyright © 2021 Raedam. All rights reserved.
//
// Setup firebase and common firebase related functions

import firebase from "firebase";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const SwalReact = withReactContent(Swal);

const firebaseConfig = {
  apiKey: "AIzaSyAxdGbBiX_L9uIu0KotlTbWzgH9roIVnls",
  authDomain: "generic-sensor-display.firebaseapp.com",
  projectId: "generic-sensor-display",
  storageBucket: "generic-sensor-display.appspot.com",
  messagingSenderId: "78111896061",
  appId: "1:78111896061:web:bfc529f670583b2160e994"
};

const devConfig = {};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
	firebase.analytics();
}

const auth = firebase.auth();
const database = firebase.firestore();

// Functions
async function signIn() {
	const email = document.getElementById("emailInput").value;
	const password = document.getElementById("passwordInput").value;

	if (email.length <= 0 || password.length <= 0) {
		presentError("Error", "Please enter all fields", "warning", "Ok");
		auth.signOut();
	}
	return await auth
		.signInWithEmailAndPassword(email, password)
		.then((user) => {
			localStorage.setItem("authUser", JSON.stringify(user));
			return user;
		})
		.catch(function (error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			if (errorCode === "auth/wrong-password") {
				presentError("Error", "Password entered is incorrect", "error", "Ok");
			} else {
				// TODO log error to firebase logger
				presentError(
					"Error",
					"Something went wrong while signing in",
					"error",
					"Ok"
				);
			}
		});
}

function signOut(history) {
	auth.signOut().then(
		() => {
			localStorage.removeItem("authUser");
			history.push("/");
		},
		(error) => {
			// TODO log error to firebase logger
			presentError(
				"Error",
				"Something went wrong while signing out",
				"error",
				"Ok"
			);
		}
	);
}

function forgotPassword() {
	SwalReact.fire({
		title: "Enter your email",
		input: "email",
		showCancelButton: true,
	}).then((result) => {
		auth
			.sendPasswordResetEmail(result.value)
			.then(function () {
				presentError("Email Sent", " ", "success", "Ok");
			})
			.catch(function (error) {
				// TODO log error to firebase logger
				presentError(
					"Error",
					"Something went wrong while sending email",
					"error",
					"Ok"
				);
			});
	});
}

function presentError(Title, Text, Icon, Button) {
	SwalReact.fire({
		title: Title,
		text: Text,
		icon: Icon,
		confirmButtonText: Button,
	});
}

export default firebase;
export { auth, database, signIn, signOut, forgotPassword };
