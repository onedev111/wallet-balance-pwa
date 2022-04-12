import { Formik } from "formik";
import React, { useContext } from "react";
import { Button, Form, Modal, Row } from "react-bootstrap";
import { AppContext } from "../../context";
import { IContextValues } from "../../types";
import * as Yup from "yup";

interface AddAddressProps {
	onHide: any;
}

const AddAddress: (props: AddAddressProps) => JSX.Element = ({ onHide }) => {
	const { addAddress, theme } = useContext(AppContext) as IContextValues;

	return (
		<Modal
			onHide={onHide}
			show
			backdropClassName={theme}
			animation={false}>
			<Formik
				onSubmit={({ address }) => {
					addAddress(address);
					onHide();
				}}
				validationSchema={Yup.object().shape({
					address: Yup.string().required("Please enter a valid address"),
				})}
				initialValues={{
					address: "",
				}}>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
				}) => (
					<Form onSubmit={handleSubmit}>
						<Modal.Header
							closeButton
							closeVariant={theme === "dark" ? "white" : undefined}
							className={theme === "light" ? "bg-light" : "bg-dark text-white"}>
							Add a new address
						</Modal.Header>
						<Modal.Body className={theme === "light" ? "bg-light" : "bg-dark"}>
							<Form.Group className="mb-3">
								<Form.Label className={theme === "light" ? "bg-light" : "bg-dark text-white"}>
									Wallet Address
								</Form.Label>
								<Form.Control
									autoFocus
									value={values.address}
									name="address"
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder="Enter wallet address"
									className={theme === "light" ? "bg-light" : "bg-dark text-white"}
								/>
								{touched.address && errors.address && (
									<p className="text-danger ">{errors.address}</p>
								)}
							</Form.Group>
						</Modal.Body>
						<Modal.Footer className={theme === "light" ? "bg-light" : "bg-dark"}>
							<Row className="justify-content-end w-100">
								<Button
									type="submit"
									className="w-auto me-2"
									variant="info">
									Save
								</Button>
								<Button onClick={onHide} className="w-auto" variant="danger">
									Cancel
								</Button>
							</Row>
						</Modal.Footer>
					</Form>
				)}
			</Formik>
		</Modal>
	);
};

export default AddAddress;
