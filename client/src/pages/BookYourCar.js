import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars } from "../redux/actions/carsActions";
import Spinner from "../components/Spinner";
import { bookCar } from "../redux/actions/bookingActions";

const { RangePicker } = DatePicker;

function BookYourCar() {
  const params = useParams();
  const { cars } = useSelector((state) => state.carsReducer);

  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState({});
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setdriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [rebook, setReBookModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setCar(cars.find((c) => c._id === params.carid));
      // console.log('car1234', car)
    }
  }, [cars, dispatch, params]);

  useEffect(() => {
    setTotalAmount(
      driver
        ? totalHours * 30 + totalHours * car.rentPerHour
        : totalHours * car.rentPerHour
    );

    // setTotalAmount(driver ? totalAmount + (totalHours * 30) : totalHours * car.rentPerHour);
  }, [driver, totalHours, car, totalAmount]);

  const selectTimeSlots = (values) => {
    // console.log("values", values[0].$d);
    // console.log("ccars", cars);

    const selectedFrom = moment(values[0].$d, "Day, DD Month YYYY HH:MM:SS");
    const selectedTo = moment(values[1].$d, "Day, DD Month YYYY HH:MM:SS");

    setFrom(moment(values[0].$d)._i);
    setTo(moment(values[1].$d)._i);

    // console.log("Togggslottiimme", to);

    setTotalHours(selectedTo.diff(selectedFrom, "hours"));

    RebookModal(values);
  };

  const RebookModal = (values) => {
    const selectedFrom = moment(values[0].$d);
    const selectedTo = moment(values[1].$d);

    const conflictingBooking = car.bookedTimeSlots.find((booking) => {
      // console.log("booking", booking);
      return (
        selectedFrom.isBetween(booking.from, booking.to) ||
        selectedTo.isBetween(booking.from, booking.to)
      );
    });
    if (conflictingBooking) {
      setReBookModal(true);
    } else {
      return true;
    }
  };

  function onToken(token) {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };
    dispatch(bookCar(reqObj));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Col lg={10} sm={24} xs={24}>
          <img src={car.image} alt="my car" className="carimg2 bs1" />
        </Col>
        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider type="horizontal" dashed>
            Car Info
          </Divider>
          <div style={{ textAlign: "right" }}>
            <p>{car.name}</p>
            <p>{car.rentPerHour} Rent Per Hour /.</p>
            <p>Fuel Type: {car.fuelType} </p>
            <p>Max Persons : {car.capacity}</p>
          </div>
          <Divider type="horizontal" dashed>
            Select Time Slots
          </Divider>

          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD YYYY HH:mm"
            onChange={selectTimeSlots}
          />
          <br />
          <button
            className="btn1 mt-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            See booked slots
          </button>

          {from && to && (
            <div>
              <p>
                Total Hours : <b>{totalHours}</b>
              </p>
              <p>
                Rent Per Hour : <b>{car.rentPerHour}</b>
              </p>
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setdriver(true);
                  } else {
                    setdriver(false);
                  }
                }}
              >
                Driver Required
              </Checkbox>
              <h3>Total Amount : {totalAmount}</h3>

              <StripeCheckout
                shippingAddress
                token={onToken}
                currency="NGN"
                amount={totalAmount * 100}
                stripeKey="pk_test_8QLSNth79cohItDIpVojRMZ400Z1j0IfvK"
              >
                <button className="btn1">Book Now</button>
              </StripeCheckout>
            </div>
          )}
        </Col>
        {car.name && (
          <Modal
            open={showModal}
            closable={false}
            footer={false}
            title="Booked time slots"
          >
            <div className="p-2">
              {car.bookedTimeSlots.map((slot, i) => {
                console.log("slot", slot);
                console.log("fromslot", from);
                console.log("toslot", to);

                return (
                  <button key={i} className="btn1 mt-2">
                    {slot.from} - {slot.to}
                  </button>
                );
              })}
              <div className="text-right mt-5">
                <button
                  className="btn1"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  close
                </button>
              </div>
            </div>
          </Modal>
        )}

        <Modal
          open={rebook}
          closable={false}
          footer={false}
          title="Booked time slots"
        >
          <div className="p-2">
            <div>
              <h3>This time has already been booked.</h3>
              <p>
                <Link onClick={document.location.reload}>
                  <b>Click here for re-booking</b>
                </Link>
              </p>
              <Link to="/">
                <b>Click here for the home page</b>{" "}
              </Link>
            </div>
            <div className="text-right mt-5">
              <button
                className="btn1"
                onClick={() => {
                  setReBookModal(false);
                }}
              >
                close
              </button>
            </div>
          </div>
        </Modal>
      </Row>
    </DefaultLayout>
  );
}

export default BookYourCar;
