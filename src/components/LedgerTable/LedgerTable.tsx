import { createRef, useContext, useEffect, useRef, useState } from "react";
import { Alert, Container, Row, Table } from "react-bootstrap";
import { getWalletInformation } from "./methods";
import { AppContext } from "../../context";
import { IContextValues } from "../../types";
import { useLoader } from "../../services";
import CenterLoader from "../CenterLoader/CenterLoader";

interface LedgerTableProps {}

const LedgerTable: (props: LedgerTableProps) => JSX.Element = ({}) => {
	const { theme, selectedAddress } = useContext(AppContext) as IContextValues;
	const { loading, invokeApi } = useLoader(false);
	const [data, setData] = useState<any>([]);
	const [error, setError] = useState<any>(false);
	const timer = useRef<any>();

	useEffect(() => {
		if (selectedAddress) {
			if (timer.current) clearInterval(timer.current);
			const getBalanceData = (turnLoaderOn?: boolean) => {
				invokeApi(
					{
						api: () => {
							setError(false);
							turnLoaderOn && setData([]);
							return getWalletInformation(selectedAddress);
						},
						callBack: setData,
						errorCallback: setError,
					},
					turnLoaderOn
				);
			};
			getBalanceData(true);
			timer.current = setInterval(() => getBalanceData(false), 10000);
		}
	}, [selectedAddress]);

	return (
		<Container>
			{loading ? (
				<CenterLoader />
			) : error ? (
				<Row className="justify-content-center">
					<Alert
						className="w-auto"
						variant={theme === "dark" ? "dark" : "info"}
					>
						There was some error getting information for the address. Please
						make sure you have the right address
					</Alert>
				</Row>
			) : data.length !== 0 ? (
				<Table striped bordered hover variant={theme} responsive>
					<thead>
						<tr>
							<th>#</th>
							<th>Token Name</th>
							<th>Balance</th>
						</tr>
					</thead>
					<tbody>
						{data.map((item: any, index: number) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{item.name}</td>
								<td>{item.balance}</td>
							</tr>
						))}
					</tbody>
				</Table>
			) : (
				<Row className="justify-content-center">
					<Alert
						className="w-auto"
						variant={theme === "dark" ? "dark" : "info"}
					>
						Please select some address to show its information
					</Alert>
				</Row>
			)}
		</Container>
	);
};

export default LedgerTable;
