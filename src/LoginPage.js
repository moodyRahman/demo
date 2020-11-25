import {useContext, useState} from 'react';
import 'fontsource-roboto';
import Status from "./Status.js"
import PostContainer from "./PostContainer.js"
import {TokenContext} from "./TokenContext.js"
import { FormControl, Input, InputLabel, Button } from '@material-ui/core';




function LoginPage() {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [status, setStatus] = useState("");
	const [posts, setPosts] = useState([]);
	const { token, setToken } = useContext(TokenContext)

	const getdata = (evt) => {
		evt.preventDefault();
		console.log(token)
		fetch("http://localhost:5000/api", {
			headers: {
				'Authorization': token
			}
		}).then(res => res.json())
			.then(
				(result) => {
					setStatus(result.status);
					if (result.status === 200){
						console.log(result);
						setPosts(result.posts);
					}
					else {
						console.log("DENIED");
						setPosts([]);
					}
				}
			)
	}

	const logout = (evt) => {
		setToken("")
	}

	const login = (evt) => {
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
					if (result.status === 200) {
						console.log(token)
						setToken(result.token);

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

				<Button onClick={login}>
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
		<br />
		<br />
		<div>
			<Status status={status}/>
		</div>
		<br />
		<br />

		<PostContainer posts={posts} />
			
		</>
	);
}


export default LoginPage;