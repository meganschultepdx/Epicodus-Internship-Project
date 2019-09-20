import * as React from "react";
import { createStyles, makeStyles, withStyles } from "@material-ui/core/styles";
import Checkmark from "../../shared/Checkmark";
import Paper from "@material-ui/core/Paper";
import ReusableButton from "../../shared/ReusableButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import X from "../../shared/X";

interface Scan {
	id: string;
	upc: string;
	createdDate: string;
	modifiedDate: string;
	scrapes: Scrape[];
} // Scan

interface ScanProps {
	data: Scan;
	handleScanOnClick: Function;
} // ScanProps

interface Scrape {
	id: string;
	partnerId: string;
	isLive: boolean;
	partnerName: string;
} // Scrape

// Formatting for the header table cells
const StyledTableCell = withStyles(() =>
	createStyles({
		head: {
			backgroundColor: "black",
			color: "white",
			fontSize: 16
		}
	})
)(TableCell); //StyledTableCell

// Formatting for the table
const useStyles = makeStyles(() =>
	createStyles({
		root: {
			width: 600,
			marginTop: 180,
			overflowX: "auto",
			marginLeft: "auto",
			marginRight: "auto"
		},
		table: {
			width: 600
		}
	})
); // useStyles

// Takes in a prop of the most recent Scan search result object from Overview component, then renders a table with the data for each partner and a button to do a start a new Scan
// Need to replace partnerId with the associated partner name and isLive with something nicer to look at
const PartnersAtAGlance = (props: ScanProps) => {
	const classes = useStyles("");
	const rows: Scrape[] = props.data.scrapes;
	const createdDate = new Date(props.data.createdDate).toLocaleString();

	// This function loops through all Scrapes within a Scan and returns a table row for each
	const renderPartnerStatus = () => {
		return rows.map(row => (
			<TableRow key={row.id}>
				<TableCell component="th" scope="row">
					{row.partnerName}
				</TableCell>
				<TableCell align="right">
					{row.isLive ? <Checkmark /> : <X />}
				</TableCell>
			</TableRow>
		));
	};

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<StyledTableCell>UPC: {props.data.upc}</StyledTableCell>
						<StyledTableCell align="right">
							Most recent scan:
							<br />
							{createdDate}
						</StyledTableCell>
						<StyledTableCell align="right">
							<ReusableButton
								className="scrapeButton"
								label="SCRAPE NOW!"
								handleOnClick={props.handleScanOnClick}
								type="button"
							/>
						</StyledTableCell>
					</TableRow>
					<TableRow>
						<TableCell>Partner</TableCell>
						<TableCell align="right">Most recent scan status</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>{renderPartnerStatus()}</TableBody>
			</Table>
		</Paper>
	);
}; //PartnersAtAGlance

export default PartnersAtAGlance;
