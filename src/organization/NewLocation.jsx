import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router";

import firebase, { database } from "../FirebaseSetup";
import { SwalFail } from "../common/SweetAlert";

export default function NewLocation() {
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const handleAddressChange = (event) => setAddress(event.target.value);
	const handleNameChange = (event) => setName(event.target.value);
	const history = useHistory();
	const { params } = useRouteMatch();

	const organization = params.organization.replaceAll("-", " ");

	const submitHandler = (event) => {
		event.preventDefault();

		createLocation(name, address, params.organization)
			.then(() => history.push(`/${params.organization}/facilities`))
			.catch((err) => {
				SwalFail(undefined, err);
			});
	};

	async function createLocation(name, address) {
		database
			.collection("Companies")
			.doc(organization)
			.collection("Data")
			.doc(name)
			.set({
				Active: true,
				Address: address,
				Capacity: {
					Available: 0,
					Capacity: 0,
				},
				"Floor Data": {},
				Pricing: {
					Day: "",
					Hour: "",
					Minute: "",
				},
				"Spot Types": {
					ADA: false,
					EV: false,
					Hourly: false,
					Leased: false,
					Permit: false,
				},
			});
		database
			.collection("Companies")
			.doc(organization)
			.update({
				Locations: firebase.firestore.FieldValue.arrayUnion(name),
			});
	}

	return (
		<div className="tp-services" id="container">
			<div className="container">
				<div className="row">
					{/* TODO animate-box was causing issues with below div */}
					<div className="col-md-12 text-center">
						<div className="main" id="main">
							<h1
								id="structureTitle"
								style={{ paddingTop: "50px", paddingBottom: "50px" }}
							>
								Add location to {organization}
							</h1>
							<form name="Create Location" onSubmit={submitHandler}>
								<div className="form-group">
									<label htmlFor="name">Name</label>
									<input
										id="name"
										type="text"
										name="name"
										onChange={handleNameChange}
										value={name}
										placeholder="Location Name"
										className="form-control"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="address">Address</label>
									<input
										id="address"
										type="text"
										name="address"
										value={address}
										placeholder="Street Address"
										className="form-control"
										onChange={handleAddressChange}
									></input>
								</div>
								<Link className="btn btn-danger mr-1" to={`/`}>
									Cancel
								</Link>
								<button type="submit" className="btn btn-primary">
									Submit
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
