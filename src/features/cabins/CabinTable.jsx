import Spinner from "../../components/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../components/Table";

const CabinTable = () => {
	// Custom Hook(Fetch Cabins w/ React Query)
	const { isLoading, cabins } = useCabins();

	// Conditional Rendering
	if (isLoading) return <Spinner />;

	return (
		<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
			<Table.Header role="row">
				<div></div>
				<div>Cabin</div>
				<div>Capacity</div>
				<div>Price</div>
				<div>Discount</div>
				<div></div>
			</Table.Header>
			<Table.Body
				render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
				data={cabins}
			/>
		</Table>
	);
};

export default CabinTable;
