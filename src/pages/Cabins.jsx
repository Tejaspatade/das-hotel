import Heading from "../components/Heading";
import Row from "../components/Row";
import CabinTable from "../features/cabins/CabinTable";

function Cabins() {
	// Fetching Cabin data with React-Query

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All cabins</Heading>
			</Row>
			<Row>
				<CabinTable />
			</Row>
		</>
	);
}

export default Cabins;
