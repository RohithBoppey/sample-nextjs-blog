import {
	ApolloClient,
	InMemoryCache,
	gql,
} from "@apollo/client";

import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";

import Blog from "./components/Blog";

export default function Home() {
	const client = new ApolloClient({
		uri: "http://localhost:1337/graphql",
		cache: new InMemoryCache(),
	});

	const getBlogDetails = async () => {
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
		console.log(res);
		setBlogs(res);
		// console.log(result.data.blogPosts.data);
		return;
	};

	// const client = ...
	useEffect(() => {
		getBlogDetails();
	}, []);

	const [blogs, setBlogs] = useState();
	// console.log(blogs);
	return (
			
			<div className={styles.container}>
				{blogs && <Blog blogs={blogs} />}
			</div>
		
	);
}
