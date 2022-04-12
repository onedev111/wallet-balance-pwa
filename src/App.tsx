import { useContext } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Addresses, LedgerTable } from "./components";
import { AppContext } from "./context";
import "./App.scss";
import { IContextValues } from "./types";

function App() {
	const { selectedAddress, theme, setTheme } = useContext(AppContext) as IContextValues;

	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
		localStorage.setItem("theme", theme === "light" ? "dark" : "light");
	};

	return (
		<div className={`app app-${theme}`}>
			<Container className={`pt-3 ${theme === "light" ? "" : "bg-dark"}`}>
				<Row className="w-100 justify-content-end">
					<Form.Check
						type="switch"
						className="w-auto"
						checked={theme === "dark"}
						onChange={toggleTheme}
						label={theme === "dark" ? "Light mode" : "Dark mode"} />
				</Row>
				<Addresses />
				{selectedAddress &&
					<Col className="text-center">
						<p>
							<strong>Showing balance for address: </strong>
							<span>
								{selectedAddress}
							</span>
						</p>
					</Col>}
				<LedgerTable />
			</Container>
		</div>
	);
}

export default App;
