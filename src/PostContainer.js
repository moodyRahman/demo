import 'fontsource-roboto';
import Post from "./Post"
import { useState, useEffect, setIsLoaded } from 'react';

function PostContainer()
{
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch("http://localhost:5000/api")
			.then(res => res.json())
			.then(
				(result) => {
					console.log(result)
					setPosts(result);
				}
			)
	}, [])

	return(
		posts.map(post=> <Post title={post.title} body={post.body}></Post>)
	);
}

export default PostContainer;