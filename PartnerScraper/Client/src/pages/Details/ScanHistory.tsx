import * as React from "react";
import { useState } from "react";
import { createStyles, makeStyles, withStyles } from "@material-ui/core/styles";
import Checkmark from "../../shared/Checkmark";
import Collapse, { Panel } from "rc-collapse";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import X from "../../shared/X";

interface ScanProps {
	scanHistory: Scan[];
}

interface Scan {
	id: string;
	upc: string;
	createdDate: string;
	modifiedDate: string;
	scrapes: Scrape[];
}

interface Scrape {
	id: string;
	scanId: string;
	partnerId: number;
	isLive: boolean;
	url: string;
	upc: string;
	createdDate: string;
	modifiedDate: string;
	partnerName: string;
}

// Formatting for the header table cells
const StyledTableCell = withStyles(() =>
	createStyles({
		head: {
			backgroundColor: "black",
			color: "white",
			fontSize: 14,
			textAlign: "center"
		}
	})
)(TableCell); //StyledTableCell

// Formatting for the Table and Panels
const useStyles = makeStyles(() =>
	createStyles({
		root: {
			width: "100%",
			borderRadius: "5px",
			marginTop: 15,
			marginLeft: "auto",
			marginRight: "auto"
		},
		table: {
			width: "100%"
		},
		goodScan: {
			border: "5px solid #1affb2"
		},
		badScan: {
			border: "5px solid #f00"
		},
		mixedScan: {
			border: "5px solid #ffff66"
		}
	})
); // useStyles

// This component will take in a ScanHistory array and create an accordion with a Panel for each Scan. Each Panel of the accordion will expand to show a table of Scrapes belonging to that Scan
const ScanHistory = (props: ScanProps) => {
	const [accordion, setAccordion] = useState(false);
	const [activeKey, setActiveKey] = useState("");
	const classes = useStyles("");

	// This method watched for clicked Panels and triggers them to expand
	function onChange(activeKey: string) {
		setActiveKey(activeKey);
	} // onChange

	// This method loops through the full array of Scans and for each Scan it creates an accordion Panel with a collapsed Table inside for the Scans.
	const renderHistory = () => {
		return Object.values(props.scanHistory).map((scan: Scan) => {
			return (
				<Panel
					header={`${formatDate(scan.createdDate)}`}
					key={scan.id}
					className={scanHealth(scan.scrapes)}
				>
					<Paper className={classes.root}>
						<Table className={classes.table}>
							<TableHead>
								<TableRow className={classes.root}>
									<StyledTableCell align="right">Partner Name</StyledTableCell>
									<StyledTableCell align="right">Was it live?</StyledTableCell>
									<StyledTableCell align="right" colSpan={2}>
										Searched URL
									</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>{renderScrapesFromEachScan(scan.scrapes)}</TableBody>
						</Table>
					</Paper>
				</Panel>
			);
		});
	}; // renderHistory

	// This loops through the array of Scrapes within each Scan which comes in as a parameter. Then it renders the data in rows beneath the parent accordion Panel
	const renderScrapesFromEachScan = (scrapes: Scrape[]) => {
		return Object.values(scrapes).map(function(scrape: Scrape) {
			return (
				<TableRow key={scrape.id}>
					<TableCell>{scrape.partnerName}</TableCell>
					<TableCell align="right">
						{scrape.isLive ? <Checkmark /> : <X />}
					</TableCell>
					<TableCell align="right" colSpan={2}>
						{scrape.url}
					</TableCell>
				</TableRow>
			);
		});
	}; //renderScrapesFromEachScan(scrapes)

	// This function takes a DateTime object parameter and returns an easier to read string of the date
	const formatDate = (dateString: string) => {
		let date: string = dateString.toString();
		return new Date(date).toLocaleString();
	}; // formatDate(dateString)

	// This function takes in the scrapes array for each Scan, it determines if the Scrapes are all good, all bad or mixed.  It will change the panel colors to accordingly, all good=green, all bad=red, mixed=yellow
	const scanHealth = (scrapes: Scrape[]) => {
		let count: number = 0;
		let health: string = classes.mixedScan;

		scrapes.forEach(scrape => {
			scrape.isLive ? count++ : null;
		});

		// this part checks if there are zero good scans or all good scans, then changed the class name of the Panel to Red, Green or Yellow
		if (count === 0) {
			health = classes.badScan;
		} else if (count === scrapes.length) {
			health = classes.goodScan;
		}	// elseif

		return health;
	}; // scanHealth(scrapes)

	return (
		<Collapse accordion={accordion} onChange={onChange} activeKey={activeKey}>
			<Panel
				header={`Full scan history for UPC: ${props.scanHistory[0].upc}`}
				className="rc-collapse-header"
				disabled={true}
			/>
			{renderHistory()}
		</Collapse>
	);
}; //ScanHistory

export default ScanHistory;
