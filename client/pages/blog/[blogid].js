import React, { useEffect, useState } from "react";

import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	gql,
} from "@apollo/client";

import Comment from "../components/Comment";

import { useRouter } from "next/router";
import { Box, Grid, Link, Paper, Typography } from "@mui/material";

const blogDetails = () => {
	const router = useRouter();

	const [blogData, setBlogData] = useState();

	const client = new ApolloClient({
		uri: "http://localhost:1337/graphql",
		cache: new InMemoryCache(),
	});

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
		let blogId = router.query.blogid;
		console.log(blogId);
		getBlogDetails(blogId);
	}, [router.query.blogid]);

	console.log(blogData && blogData.id);

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
			<Box style={{ margin: 40 }}>
				{(blogData) && (
					<>
						<Typography variant="h5" color="black" paragraph>
							All Comments :
						</Typography>
						{blogData.attributes.comments ? blogData.attributes.comments.comment.map(c => (<Comment useremail = {c.useremail} comment = {c.comment}/>)) : <p>No Comments</p>}
					</>
				)}
			</Box>
		</>
	);
};

export default blogDetails;
