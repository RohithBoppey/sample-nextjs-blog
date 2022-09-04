import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Footer from "./Footer";

const theme = createTheme();

const getDate = (date) => {
	const dateNew = date.split("T");
	return dateNew[0];
};

export default function Blog(props) {
	const blogs = props.blogs;
	// console.log(blogs);
	let blogsAll = [];
	for (const i in blogs) {
		// console.log(blogs[i].attributes);
		blogsAll.push({
			id: blogs[i].id,
			date: getDate(blogs[i].attributes.createdAt),
			image: "https://source.unsplash.com/random",
			imageLabel: "main image description",
			...blogs[i].attributes,
		});
	}

	blogsAll = blogsAll.sort((a, b) => b.id - a.id);
	console.log(blogsAll);

	const mainFeaturedPost = {
		id: blogsAll[0].id,
		title: blogsAll[0].title,
		description: blogsAll[0].description,
		image: "https://source.unsplash.com/random",
		imageText: "main image description",
		linkText: "Continue reading…",
	};

	blogsAll.shift();
	//   const mainFeaturedPost = {
	//     title: 'Title of a longer featured blog post',
	//     description:
	//       "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
	//     image: 'https://source.unsplash.com/random',
	//     imageText: 'main image description',
	//     linkText: 'Continue reading…',
	//   };

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Container maxWidth="lg">
				<Header title="A simple Blog Website" />
				<main>
					<MainFeaturedPost post={mainFeaturedPost} />
					<Grid container spacing={4}>
						{blogsAll.map((post) => (
							<FeaturedPost key={post.title} post={post} />
						))}
					</Grid>
				</main>
			</Container>
			<Footer
				title="Footer"
				description="Something here to give the footer a purpose!"
			/>
		</ThemeProvider>
	);
}
