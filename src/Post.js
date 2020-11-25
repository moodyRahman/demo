import Box from '@material-ui/core/Box';

function Post(props) {

	return (
		<Box m={2}>
			{props.title}
			<br />
			{props.body}
		</Box>
	);
}

export default Post;