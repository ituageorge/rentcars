import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Divider, DatePicker, Checkbox } from "antd";

// import moment from "moment";
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
  const dispatch = useDispatch();

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setCar(cars.find((car) => car._id === params.carid));

      // console.log('car1234', car)
    }

    if (driver) {
      setTotalAmount((totalAmount) => totalAmount + 30 * totalHours);
    } else {
      setTotalAmount(totalHours * car.rentPerHour);
    }
  }, [car.rentPerHour, cars, dispatch, driver, params.carid, totalHours]);

  const selectTimeSlots = (value, dateString) => {
    console.log('values', value)
    console.log('dateString', dateString)
    
    console.log('moment12', (value[0]).format("YYYY-MM-DD HH:mm"))
    console.log('moment', (value[1]).format("YYYY-MM-DD HH:mm"))

    setFrom((value[0]).format("YYYY-MM-DD HH:mm"));
    setTo((value[1]).format("YYYY-MM-DD HH:mm"));


    setTotalHours(value[1].diff(value[0], "hours"));
  };

  const bookNow = () => {
    const reqObj = {
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
  };

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Col lg={10} sm={24} xs={24}>
          <img src={car.image} alt="ghghdhdh" className="carimg2 bs1" />
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
            // format="MMM DD yyyy HH:mm"
            format="YYYY-MM-DD HH:mm"
            onChange={selectTimeSlots}
           
          />
          <br />
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

            <button className="btn1" onClick={bookNow}>
              Book Now
            </button>
          </div>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default BookYourCar;

