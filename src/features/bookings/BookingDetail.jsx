import styled from "styled-components";

// import BookingDataBox from "./BookingDataBox";
import Row from "../../components/Row";
import Heading from "../../components/Heading";
import Tag from "../../components/Tag";
import ButtonGroup from "../../components/ButtonGroup";
import Button from "../../components/Button";
import ButtonText from "../../components/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../components/Spinner";
import BookingDataBox from "./BookingDataBox";
import { useNavigate } from "react-router-dom";

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function BookingDetail() {
	const navigate = useNavigate();

	// Custom hooks
	const { booking, isLoading } = useBooking();
	const moveBack = useMoveBack();

	// Conditional render
	if (isLoading) return <Spinner />;

	// Derived State
	const { status, id: bookingId } = booking;

	const statusToTagName = {
		unconfirmed: "blue",
		"checked-in": "green",
		"checked-out": "silver",
	};

	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Booking #{bookingId}</Heading>
					<Tag type={statusToTagName[status]}>
						{status.replace("-", " ")}
					</Tag>
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<ButtonGroup>
				<Button variation="secondary" onClick={moveBack}>
					Back
				</Button>
				{status === "unconfirmed" && (
					<Button
						onClick={() => {
							navigate(`/checkin/${bookingId}`);
						}}
					>
						Check in
					</Button>
				)}
			</ButtonGroup>
		</>
	);
}

export default BookingDetail;
