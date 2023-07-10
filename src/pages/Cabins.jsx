import { useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Row from "../components/Row";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
	const [showForm, setShowForm] = useState(false);

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All cabins</Heading>
			</Row>
			<Row>
				<CabinTable />
			</Row>

			<Button onClick={() => setShowForm((curr) => !curr)}>
				Add New Cabin
			</Button>

			{showForm && <CreateCabinForm />}
		</>
	);
}

export default Cabins;
