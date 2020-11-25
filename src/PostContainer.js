import 'fontsource-roboto';
import Post from "./Post"
import { useState, useEffect, setIsLoaded } from 'react';

function PostContainer({posts})
{

	return(
		posts.map(post=> <Post title={post.title} body={post.body}></Post>)
	);
}

export default PostContainer;