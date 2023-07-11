import CabinRow from "./CabinRow";
import Spinner from "../../components/Spinner";
import Table from "../../components/Table";
import Menus from "../../components/Menus";

import { useCabins } from "./useCabins";
import { useSearchParams } from "react-router-dom";

const CabinTable = () => {
	// Router-DOM Hook
	const [searchParams] = useSearchParams();
	const filterValue = searchParams.get("discount") || "all";
	let filteredCabins;

	// Custom Hook(Fetch Cabins w/ React Query)
	const { isLoading, cabins } = useCabins();

	if (filterValue === "all") filteredCabins = cabins;
	if (filterValue === "no-discount")
		filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
	if (filterValue === "with-discount")
		filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

	// Conditional Rendering
	if (isLoading) return <Spinner />;

	return (
		<Menus>
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
					render={(cabin) => (
						<CabinRow key={cabin.id} cabin={cabin} />
					)}
					data={filteredCabins}
				/>
			</Table>
		</Menus>
	);
};

export default CabinTable;
