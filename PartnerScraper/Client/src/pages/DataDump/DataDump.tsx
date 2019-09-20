import * as React from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { useState, useEffect } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '../../shared/FirstPageIcon';
import KeyboardArrowLeft from '@material-ui/core/es/internal/svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/core/es/internal/svg-icons/KeyboardArrowRight';
import LastPageIcon from '../../shared/LastPageIcon';
import X from '../../shared/X'
import Checkmark from '../../shared/Checkmark'

const useStyles1 = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexShrink: 0,
			color: theme.palette.text.secondary,
			marginLeft: theme.spacing(2.5),
		},
	}),
);

interface Scrape {
	id: string,
	scanId: string,
	partnerId: string,
	partnerId: string,
	isLive: boolean,
	partnerName: string,
	createdDate: string,
	modifiedDate: string,
	url: string,
	upc: string,
}

interface TablePaginationActionsProps {
	count: number;
	page: number;
	rowsPerPage: number;
	onChangePage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
	const classes = useStyles1("");
	const theme = useTheme();
	const { count, page, rowsPerPage, onChangePage } = props;

	function handleFirstPageButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		onChangePage(event, 0);
	}

	function handleBackButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		onChangePage(event, page - 1);
	}

	function handleNextButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		onChangePage(event, page + 1);
	}

	function handleLastPageButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	}

	return (
		<div className={classes.root}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
				{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</div>
	);
}

const useStyles2 = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			marginTop: theme.spacing(3),
		},
		table: {
			minWidth: 500,
		},
		tableWrapper: {
			overflowX: 'auto',
		},
	}),
);

const DataDump = () => {
	const classes = useStyles2();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [details, setDetails] = useState([]);
	const [badResponse, setBadResponse] = useState(null);
	const rows = details;

	// This method acts as "componentDidMount" lifecycle method, by passing [details, upc] as the second argument you trigger the method after details/upc gets assigned a value.
	useEffect(() => {
		getScrapes();
	}, []); // UseEffect

	// Function gets scrape history from the database to render in table.
	const getScrapes = async () => {
		try {
			const response = await fetch(`${process.env.BaseURL}${process.env.GetScrapesURL}`);

			if (!response.ok) {
				throw Error(response.statusText);
			} // if
			const json = await response.json();
			setDetails(json);
			// This catch assigns the error message to State so it can render the error on the page
		} catch (error) {
			setBadResponse(error.toString());
			console.log(error.toString());
		} // catch
	} //getScrapes

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	function handleChangePage(
		event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
		newPage: number,
	) {
		setPage(newPage);
	}

	function handleChangeRowsPerPage(
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	}

	// This function takes a DateTime object parameter and returns an easier to read string of the date
	const formatDate = (dateString: string) => {
		let date: string = dateString.toString();
		return new Date(date).toLocaleString();
	} // formatDate(dateString)

	// This method loops through the full array of Scrapes and adds a row for each
	const renderScrapes = () => {
		return Object.values(details.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)).map((scrape: Scrape) => {
			return <TableRow key={scrape.id}>
				<TableCell>{scrape.upc}</TableCell>
				<TableCell align="right">{scrape.partnerName}</TableCell>
				<TableCell align="right">{scrape.isLive ? <Checkmark /> : <X />}</TableCell>
				<TableCell align="right" colSpan={2}>{scrape.url}</TableCell>
				<TableCell align="right">{`${formatDate(scrape.createdDate)}`}</TableCell>
				<TableCell align="right">{`${formatDate(scrape.modifiedDate)}`}</TableCell>
			</TableRow >;
		})
	}  // renderScrapes

	const renderTable = () => {
		let datadump;
		if (badResponse !== null) {
			datadump = <p className="badResponse">{badResponse}</p>;
		} else (details.length > 0) {
			datadump = <React.Fragment>
				<Paper className={classes.root} id="dataDump">
					<div className={classes.tableWrapper}>
						<Table className={classes.table}>
							<TableBody>
									<TableRow>
										<TableCell id="tableHeader" colSpan={7}>Full Scrape History</TableCell>
									</TableRow>
								<TableRow>
									<TableCell>UPC</TableCell>
									<TableCell align="right">Partner Name</TableCell>
									<TableCell align="right">Was it live?</TableCell>
									<TableCell align="right" colSpan={2}>Searched URL</TableCell>
									<TableCell align="right">Created Date</TableCell>
									<TableCell align="right">Modified Date</TableCell>
								</TableRow >
								{renderScrapes()}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TablePagination
										rowsPerPageOptions={[10, 25, 50]}
										colSpan={7}
										count={rows.length}
										rowsPerPage={rowsPerPage}
										page={page}
										SelectProps={{
											inputProps: { 'aria-label': 'rows per page' },
											native: true,
										}}
										onChangePage={handleChangePage}
										onChangeRowsPerPage={handleChangeRowsPerPage}
										ActionsComponent={TablePaginationActions}
									/>
								</TableRow>
							</TableFooter>
						</Table>
					</div>
				</Paper>
			</React.Fragment>;
		} //else
		return datadump
	}; // renderTable

	return (
		<React.Fragment>
			{renderTable()}
		</React.Fragment>
	);
}

export default DataDump;