import Heading from "../components/Heading";
import Row from "../components/Row";
import BookingTable from "../features/bookings/BookingTable";

function Bookings() {
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All bookings</Heading>
			</Row>
			<BookingTable />
		</>
	);
}

export default Bookings;
