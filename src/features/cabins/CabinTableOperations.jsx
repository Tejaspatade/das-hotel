import React from "react";

import TableOperations from "../../components/TableOperations";
import Filter from "../../components/Filter";

const CabinTableOperations = () => {
	return (
		<TableOperations>
			<Filter
				filterField="discount"
				options={[
					{ value: "all", label: "All" },
					{ value: "no-discount", label: "No Discount" },
					{ value: "with-discount", label: "With Discount" },
				]}
			/>
		</TableOperations>
	);
};

export default CabinTableOperations;
