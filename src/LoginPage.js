import 'fontsource-roboto';
import { FormControl, Input, InputLabel, Button } from '@material-ui/core';
import { useState, useEffect, setIsLoaded } from 'react';




function LoginPage() {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	const getdata = (evt) => {
		evt.preventDefault();
		fetch("http://localhost:5000/api", {
			headers: {
				'Authorization': localStorage.getItem("token")
			}
		}).then( res => res.json())
		.then(
			(result) => {
				console.log(result)
			}
		)
	}

	const logout = (evt) =>{
		localStorage.removeItem("token");
	}

	const submit = (evt) => {
		evt.preventDefault();
		const data = {
			username: name,
			"password": password
		};
		fetch("http://localhost:5000/auth", {
			method: 'POST', // *GET, POST, PUT, DELETE, etc
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data) // body data type must match "Content-Type" header
		})
			.then(res => res.json())
			.then(
				(result) => {
					if (result.status == 200) {
						localStorage.setItem('token', result.token);
						console.log("LOGGED IN")
					}

					else {
						console.log("BAD CREDENTIALS")
					}
					console.log(result)
				}
			)
		console.log(name, password)
	}

	return (
		<>
		<form>

			<FormControl>
				<InputLabel htmlFor="username">username</InputLabel>
				<Input id="username" onChange={e => setName(e.target.value)} />

			</FormControl>
			<br />
			<FormControl>
				<InputLabel htmlFor="password">password</InputLabel>
				<Input id="password" onChange={e => setPassword(e.target.value)} />
			</FormControl>

			<Button onClick={submit}>
				SUBMIT
		</Button>
		</form>

		<br />
		<br />

		<Button onClick={logout}>
			LOGOUT
		</Button>

		<br />
		<br />

		<Button onClick={getdata}>
			GET DATA
		</Button>
		</>
	);
}


export default LoginPage;