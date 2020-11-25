import 'fontsource-roboto';
import Post from "./Post"

function PostContainer({posts})
{

	return(
		posts.map((post, index)=> <Post key={index} title={post.title} body={post.body}></Post>)
	);
}

export default PostContainer;