import React, { useEffect, useRef, useState } from "react";

import { ApolloClient, InMemoryCache, gql, useMutation, ApolloProvider } from "@apollo/client";

import Comment from "../components/Comment";

import SendIcon from "@mui/icons-material/Send";

import { useRouter } from "next/router";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";

const blogDetails = () => {
	const router = useRouter();

	const [blogData, setBlogData] = useState();

	const useremailRef = useRef();
	const commentRef = useRef();
	
	const client = new ApolloClient({
		uri: "http://localhost:1337/graphql",
		cache: new InMemoryCache(),
	});

	const CREATE_COMMENT = gql`
			mutation UpdateBlog($id: ID!, $comments: JSON!) {
				updateBlogPost(id: $id, data: { comments: $comments }) {
					data {
						id
						attributes {
							title
							createdAt
							description
							comments
						}
					}
				}
			}
		`;
		
	const [createCommentFunction, { data, loading, error }] = useMutation(CREATE_COMMENT);


	const getBlogDetails = async (blogId) => {
		const result = await client.query({
			query: gql`
				query {
					blogPosts {
						data {
							id
							attributes {
								title
								description
								createdAt
								comments
							}
						}
					}
				}
			`,
		});
		const res = result.data.blogPosts.data;

		let blog = null;

		for (const i in res) {
			console.log(res[i].id, blogId);
			if (res[i].id == blogId) {
				blog = res[i];
			}
		}

		console.log(blog);
		setBlogData(blog);
		return;
	};
	//
	useEffect(() => {
		let temp = router.query.blogid;
		console.log(temp);
		getBlogDetails(temp);
	}, [router.query.blogid]);


	const submitHandler = async (event) => {
		event.preventDefault();
		// console.log(useremailRef.current.value, commentRef.current.value);

		if(useremailRef.current.value.length === 0 || useremailRef.current.value.length === 0){
			alert('Please enter non-empty and valid useremail and comment');
			return;
		}


		if(!useremailRef.current.value.includes('@')){
			alert('Please enter valid username');
			return;
		}

		const newComment = {
			comment: commentRef.current.value,
			useremail: useremailRef.current.value,
		};

		
		// submit to backend	
		
		let prevComments = null;
		if(blogData.attributes.comments !== null){
			prevComments = Array.from(blogData.attributes.comments.comment)
		}else{
			prevComments = [];
		}
		
		console.log(prevComments, typeof(prevComments));
		prevComments.push(newComment);
		createCommentFunction({ variables: { id: blogData.id, comments : {comment : prevComments}} });
		console.log("hello");
		window.location.reload();
	};

	return (
		<>
			<Paper
				sx={{
					position: "relative",
					backgroundColor: "grey.800",
					color: "#f7f3f2",
					mb: 4,
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
					backgroundImage: `url(https://source.unsplash.com/random)`,
				}}>
				{/* Increase the priority of the hero background image */}
				{
					<img
						style={{ display: "none" }}
						src="https://source.unsplash.com/random"
						alt="Random Image"
					/>
				}
				<Box
					sx={{
						position: "absolute",
						top: 0,
						bottom: 0,
						right: 0,
						left: 0,
						backgroundColor: "rgba(0,0,0,.3)",
					}}
				/>
				<Grid container>
					<Grid item md={6}>
						<Box
							sx={{
								position: "relative",
								p: { xs: 3, md: 6 },
								pr: { md: 0 },
							}}>
							<Typography
								component="h1"
								variant="h3"
								color="inherit"
								gutterBottom>
								{blogData && blogData.attributes.title}
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</Paper>
			<Box style={{ margin: 40 }}>
				<Typography
					style={{ whiteSpace: "pre-wrap" }}
					variant="h5"
					color="black"
					paragraph>
					{`${blogData && blogData.attributes.description}`}
				</Typography>
				{/* // <h1>This is blog id : {blogData ? blogData.id : 0}</h1> */}
			</Box>

			{/* Comments section */}
			<Box style={{ margin: 40 }} align="center">
				<Typography variant="h5" color="black" paragraph>
					Add a new Comment :
				</Typography>
				<Box
					style={{
						display: "grid",
					}}>
					<TextField
						id="outlined-disabled"
						placeholder="someone@something.com"
						style={{
							gridColumn: "1",
							width: "80%",
						}}
						inputRef={useremailRef}
					/>
					<TextField
						id="standard-textarea"
						label="Add a new Comment"
						placeholder="Placeholder"
						multiline
						variant="standard"
						style={{
							gridColumn: "2",
						}}
						inputRef={commentRef}
					/>
					<br></br>
					<br></br>
				</Box>
				<Button
					variant="contained"
					endIcon={<SendIcon />}
					onClick={submitHandler}>
					Send
				</Button>
			</Box>
			<Box style={{ margin: 40 }}>
				{blogData && (
					<>
						<Typography variant="h5" color="black" paragraph>
							All Comments :
						</Typography>
						{blogData.attributes.comments ? (
							blogData.attributes.comments.comment.map(
								(c, pos) => (
									<Comment
										useremail={c.useremail}
										comment={c.comment}
										key={pos}
									/>
								)
							)
						) : (
							<p>No Comments</p>
						)}
					</>
				)}
			</Box>
		</>
	);
};

export default blogDetails;
