import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const trimContent = (s) => {
	if(s.length > 50){

		return s.slice(0,50) + "...";
	}
	// console.log(s.slice(0,50));
	return s
}


function FeaturedPost(props) {
	const { post } = props;

	return (
		<Grid item xs={12} md={6}>
			<CardActionArea component="a" href={`/blog/${post.id}`}>
				<Card sx={{ display: "flex" }}>
					<CardContent sx={{ flex: 1 }}>
						<Typography component="h2" variant="h5">
							{post.title}
						</Typography>
						<Typography variant="subtitle1" color="text.secondary">
							{post.date}
						</Typography>
						<Typography variant="subtitle1" paragraph>
							{trimContent(post.description)}
						</Typography>
						{/* <Link variant="subtitle1" href={`/blog/${post.id}`}> */}
							<Typography variant="subtitle1" color="primary">
								Continue reading...
							</Typography>
						{/* </Link> */}
					</CardContent>
					<CardMedia
						component="img"
						sx={{
							width: 160,
							display: { xs: "none", sm: "block" },
						}}
						image={post.image}
						alt={post.imageLabel}
					/>
				</Card>
			</CardActionArea>
		</Grid>
	);
}

FeaturedPost.propTypes = {
	post: PropTypes.shape({
		date: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		imageLabel: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
	}).isRequired,
};

export default FeaturedPost;
