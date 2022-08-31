import React from "react";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";

const Comment = (props) => {
	return (
		<Grid item xs={12} md={6}>
			<CardActionArea>
				<Card sx={{ display: "flex" }}>
					<CardContent sx={{ flex: 1 }}>
						<Typography component="h6" size="small">
							{props.useremail}
						</Typography>
						<Typography size = 'large'>
							{props.comment}
						</Typography>
					</CardContent>
				</Card>
			</CardActionArea>
		</Grid>
	);
};

export default Comment;
