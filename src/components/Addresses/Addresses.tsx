import React, { useContext, useState } from "react";
import {
	Alert,
	Button,
	Container,
	Offcanvas,
	Row,
	Table,
} from "react-bootstrap";
import { AppContext } from "../../context";
import { IContextValues } from "../../types";
import AddAddress from "./AddAddress";

interface AddressesProps {}

const Addresses: (props: AddressesProps) => JSX.Element = ({}) => {
	const { addresses, setSelectedAddress, removeAddress, theme } = useContext(
		AppContext
	) as IContextValues;
	const [show, setShow] = useState<boolean>(false);
	const [showAddModal, setShowAddModal] = useState<boolean>(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const selectAddress = (address: string) => {
		setSelectedAddress(address);
		handleClose();
	};

	return (
		<>
			<Row className="justify-content-end p-0 m-0 py-4">
				<Button className="w-auto" variant="primary" onClick={handleShow}>
					Select address
				</Button>
			</Row>

			<Offcanvas
				placement="end"
				show={show}
				style={{ minWidth: 600 }}
				onHide={handleClose}
				backdropClassName={theme === "light" ? "bg-light" : "bg-dark"}
				className={theme === "light" ? "bg-light" : "bg-dark"}
				scroll
			>
				<Offcanvas.Header
					closeButton
					closeVariant={theme === "dark" ? "white" : undefined}
					className={theme === "light" ? "bg-light" : "bg-dark"}
				>
					<Offcanvas.Title className={theme === "light" ? "" : "text-white"}>
						Addresses
					</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body className="p-4 m-0">
					<Row className="justify-content-end p-0 m-0 py-4">
						<Button onClick={() => setShowAddModal(true)} className="w-auto">
							Add address
						</Button>
					</Row>
					<Container fluid>
						{addresses && addresses?.length !== 0 ? (
							<Table striped bordered hover variant={theme} responsive>
								<thead>
									<tr>
										<th>#</th>
										<th>Address</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{addresses?.map((address, i) => (
										<tr
											key={i}
											className="cursor-pointer"
											onClick={() => selectAddress(address)}
										>
											<td>{i + 1}</td>
											<td>{address}</td>
											<td>
												<a
													onClick={(e) => {
														e.stopPropagation();
														removeAddress(i);
													}}
													className="text-danger text-decoration-none"
												>
													Delete
												</a>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						) : (
							<Row className="justify-content-center p-5">
								<Alert variant="warning" className="w-auto">
									Please add some addresses
								</Alert>
							</Row>
						)}
					</Container>
				</Offcanvas.Body>
			</Offcanvas>
			{showAddModal && <AddAddress onHide={() => setShowAddModal(false)} />}
		</>
	);
};

export default Addresses;
