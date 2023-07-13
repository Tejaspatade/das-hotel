import styled from "styled-components";

import Row from "../../components/Row";
import Heading from "../../components/Heading";
import ButtonGroup from "../../components/ButtonGroup";
import Button from "../../components/Button";
import ButtonText from "../../components/ButtonText";
import Spinner from "../../components/Spinner";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useEffect, useState } from "react";
import Checkbox from "../../components/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";

const Box = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`;

function CheckinBooking() {
	// React hooks
	const [confirmPayment, setConfirmPayment] = useState(false);
	const [addBreakfast, setAddBreakFast] = useState(false);

	// Custom Hooks
	const moveBack = useMoveBack();
	const { booking, isLoading } = useBooking();
	const { checkin, isCheckingin } = useCheckin();

	useEffect(() => {
		setConfirmPayment(booking?.isPaid ?? false);
	}, [booking]);

	// Conditional Render
	if (isLoading) return <Spinner />;

	// Derived State
	const {
		id: bookingId,
		guests,
		totalPrice,
		// numGuests,
		// hasBreakfast,
		// numNights,
	} = booking;

	// Handler Functions
	function handleCheckin() {
		if (!confirmPayment) return;

		// Mutate Query Function
		checkin(bookingId);
	}

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Check in booking #{bookingId}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<Box>
				<Checkbox
					checked={addBreakfast}
					onChange={() => setConfirmPayment((c) => !c)}
				>
					Add breakfast?
				</Checkbox>
			</Box>
			<Box>
				<Checkbox
					checked={confirmPayment}
					onChange={() => setConfirmPayment((c) => !c)}
					id="confirm"
					disabled={confirmPayment || isCheckingin}
				>
					I confirm that {guests.fullName} has paid the total amount
					of {formatCurrency(totalPrice)}.
				</Checkbox>
			</Box>

			<ButtonGroup>
				<Button
					onClick={handleCheckin}
					disabled={!confirmPayment || isCheckingin}
				>
					Check in booking #{bookingId}
				</Button>
				<Button variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default CheckinBooking;
