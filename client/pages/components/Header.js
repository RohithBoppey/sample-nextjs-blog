import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Header(props) {
	const { sections, title } = props;

	return (
		<React.Fragment>
			<Toolbar sx={{ borderBottom: 1, borderColor: "divider" }} >
				<Typography
					component="h2"
					variant="h5"
					color="inherit"
					align="center"
					noWrap
					sx={{ flex: 1 }}>
					{title}
				</Typography>

				<Link href = '/login'>
					<Button variant="outlined" size="large">
						Sign up
					</Button>
				</Link>
			</Toolbar>
			
		</React.Fragment>
	);
}


export default Header;
