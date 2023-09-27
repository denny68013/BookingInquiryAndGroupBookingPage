import React, { Component, useContext } from "react";
// import "../styles/groupBookingCustom.css";
// import "../styles/bookingInquiry.css";
import { useState, useEffect } from "react";
import InputField from "./InputField";
import AccorditionTicket from "./AccorditionTicket";
import axios from "axios";
import TicketList from "./TicketList";
import TicketOption from "./TicketOption";
import "animate.css";
// // import "../assets/all.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function BookingInquiry() {
  const [inputQueryField, setInputQueryField] = useState({
    orderPersonId: "",
    orderPersonPhone: "",
  });

  const handleChangeEvent = (e) =>
    setInputQueryField({ ...inputQueryField, [e.target.name]: e.target.value });

  const [orderTicketId, setOrderTicketId] = useState("");

  const handleChangeEvent2 = (e) => {
    setOrderTicketId(e.target.value);
    let url = "http://localhost:2407/bookingInquiryTicket";
    let sendData = {
      orderTicketId: e.target.value,
    };

    axios
      .post(url, sendData)
      .then(function (response) {
        setIsLoading(true);
        setTicketDataArray(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };
  const [orderData, setOrderData] = useState([{}]);
  const [ticketDataArray, setTicketDataArray] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    let url = "http://localhost:2407/bookingInquiry";
    let sendData = {
      orderPersonId: inputQueryField.orderPersonId,
      orderPersonPhone: inputQueryField.orderPersonPhone,
    };
    axios
      .post(url, sendData)
      .then(function (response) {
        setIsLoading(true);
        setOrderData(response.data.orderData);
        setTicketDataArray(response.data.ticketData);
        if (response.data.orderData.length > 0) {
          setOrderTicketId(response.data.orderData[0].order_id);
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        setNotFoundShow(true);
        // alert("訂票資訊輸入有誤，請檢查輸入資訊！");
        // console.log(error);
      });
  };
  const [orderDataFiltered, setOrderDataFiltered] = useState([]);

  useEffect(() => {
    const filteredData = orderData.filter(
      (item) => item.order_id === orderTicketId
    );
    setOrderDataFiltered(filteredData);
    console.log(filteredData);
  }, [orderTicketId, orderData]);

  const [isLoading, setIsLoading] = useState(false);
  const [isReload, setIsReload] = useState(false);

  let handleRefund = () => {
    setRefundCheckShow(false);
    let url = "http://localhost:2407/bookingInquiryRefund";
    let sendData = {
      refundTicketId: refundTicketId,
    };
    axios
      .patch(url, sendData)
      .then(function (response) {
        // alert("退票成功！");
        setRefundSuccessShow(true);
        console.log(response);
        console.log("修改成功");
        setOrderData(orderData);

        // setTicketDataArray(ticketDataArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let handleResearch = () => {
    window.location = "/bookingInquiry";
    // setOrderData([]);
    // setTicketDataArray([]);
  };
  const [refundTicketId, setRefundTicketId] = useState([]);

  const handleClick = (e) => {
    console.log(e.target.id);
    if (refundTicketId.indexOf(e.target.id) == -1) {
      setRefundTicketId([...refundTicketId, e.target.id]);
    } else {
      const updatedRefundTicketId = refundTicketId.filter(
        (id) => id !== e.target.id
      );
      setRefundTicketId(updatedRefundTicketId);
    }
    console.log(refundTicketId);
  };

  const [refundCheckShow, setRefundCheckShow] = useState(false);
  const [notTicketSelectedShow, setNotTicketSelectedShow] = useState(false);
  const handleNotTicketSlectedModalClose = () =>
    setNotTicketSelectedShow(false);
  const handleRefundCheckModalClose = () => setRefundCheckShow(false);
  const handleRefundCheckShow = () => {
    if (refundTicketId.length == 0) {
      setNotTicketSelectedShow(true);
    } else {
      setRefundCheckShow(true);
    }
  };

  const handleRefundSuccessShowModalClose = () => {
    setRefundSuccessShow(false);
    window.location = "/bookingInquiry";
  };

  const [refundSuccessShow, setRefundSuccessShow] = useState(false);

  const [notFoundShow, setNotFoundShow] = useState(false);
  const handleNotFoundModalClose = () => setNotFoundShow(false);
  return (
    <div className="myBG">
      <div className="blackBG"></div>
      <div className="container testContext">
        <div
          className={"bookingInquiryBody " + (isLoading ? "finLoading" : "")}
        >
          <div className="container groupBookingContainer text-center ">
            {/* <video className="videoTag" autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video> */}

            <br />
            <h2 className="text-center bookingInquiryTitle mb-5 animate__animated animate__fadeInUp">
              訂票記錄查詢
            </h2>
            <form>
              <InputField
                title="訂票人身份證"
                type="password"
                name="orderPersonId"
                handleChangeEvent={handleChangeEvent}
              />
              <InputField
                title="訂票人電話"
                type="tel"
                name="orderPersonPhone"
                handleChangeEvent={handleChangeEvent}
              />

              <br />
              <br />

              <button
                type="button"
                className="btn btn-outline-light rounded-0 p-3 animate__animated animate__fadeInUp inquiryBtn "
                onClick={handleSubmit}
              >
                查詢
              </button>
            </form>
            <br />
            <br />
            <br />
            {isLoading ? (
              <div className="animate__animated animate__fadeInUp">
                <div className="row tickeyInquiryTitle mb-5">
                  <div className="col-12 col-md-6 text-center text-md-start">
                    <p>訂單編號</p>
                  </div>
                  <div className="col-12 col-md-6">
                    <select
                      name="”orderSerialNumber”"
                      className="bookingInputInquiryOption text-center text-md-start "
                      onChange={handleChangeEvent2}
                    >
                      {orderData.map(function (item, index) {
                        return (
                          <TicketOption
                            key={index}
                            orderId={item.order_id}
                            pickUpMethod={item.ticket_pickup_method}
                          />
                        );
                      })}
                    </select>
                  </div>
                </div>
                <br />

                {orderDataFiltered.map(function (item, index) {
                  return (
                    <TicketList
                      key={index}
                      orderId={item.order_id}
                      orderTime={item.order_time}
                      customerName={item.customer_name}
                      pickUpPersonName={item.pickup_person_name}
                      date={item.date}
                      session={item.session}
                      adultTicketNum={item.adult_tickets}
                      studentTicketNum={item.student_tickets}
                      childTicketNum={item.child_tickets}
                      charityTicketNum={item.charity_tickets}
                      pickupMethod={item.ticket_pickup_method}
                      className="animate__animated animate__fadeInUp"
                      valid={item.valid}
                    />
                  );
                })}

                <div
                  className="accordion accordion-flush"
                  id="accordionPanelsStayOpenExample"
                >
                  {ticketDataArray.map(function (item, index) {
                    return (
                      <AccorditionTicket
                        key={index}
                        index={index}
                        type={item.ticket_type}
                        ticketId={item.ticket_id}
                        qrcode={item.qrcode}
                        handleClick={handleClick}
                        valid={item.valid}
                      />
                    );
                  })}
                </div>
                <hr />
                <br />
                <br />
                <div className="row gx-0 justify-content-center">
                  <div className="col-12 col-md-6 mb-4 mb-md-0">
                    <button
                      type="button"
                      className="btn btn-outline-light rounded-0 p-3 inquiryBtn"
                      onClick={handleResearch}
                    >
                      清空並再次查詢
                    </button>
                  </div>
                  <div className="col-12 col-md-6 text-center">
                    {/* <button
                  type="button"
                  className="btn btn-outline-light rounded-0 p-3 inquiryBtn"
                  data-bs-toggle="modal"
                  data-bs-target="#refundModal"
                >
                  退票
                </button> */}

                    <Button
                      onClick={handleRefundCheckShow}
                      className="btn btn-outline-light rounded-0 p-3 inquiryBtn"
                    >
                      退票
                    </Button>

                    {/* <p className="refundText mt-3">僅供整筆訂單全部退票</p>
                <p className="refundText">如需部分退票請至「聯絡我們」頁面</p> */}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* <button
            type="button"
            onClick={() => {
              setRefundSuccessShow(true);
            }}
          >
            Launch demo modal
          </button> */}

          <Modal
            show={notTicketSelectedShow}
            onHide={handleNotTicketSlectedModalClose}
            className="refundModal"
          >
            <Modal.Header closeButton>
              <Modal.Title className="refundModalText">
                退票操作警告
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>請先選擇要退票的票券！</Modal.Body>
            <Modal.Footer>
              <Button
                variant="warning"
                onClick={handleNotTicketSlectedModalClose}
                className="rounded-0"
              >
                確定
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={refundSuccessShow}
            onHide={handleRefundSuccessShowModalClose}
            className="refundModal"
          >
            <Modal.Header closeButton>
              {/* <Modal.Title className="refundModalText">
                退票操作警告
              </Modal.Title> */}
            </Modal.Header>
            <Modal.Body>退票成功！</Modal.Body>
            <Modal.Footer>
              <Button
                variant="warning"
                onClick={handleRefundSuccessShowModalClose}
                className="rounded-0"
              >
                確定
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={refundCheckShow}
            onHide={handleRefundCheckModalClose}
            className="refundModal"
          >
            <Modal.Header closeButton>
              <Modal.Title className="refundModalText">
                退票操作警告
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              您確定要退票嗎？
              <br></br>
              每筆票券退票會酌收票價面額 10% 手續費
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="warning"
                onClick={handleRefundCheckModalClose}
                className="rounded-0"
              >
                取消
              </Button>
              <Button
                variant="danger"
                onClick={handleRefund}
                className="rounded-0"
              >
                確定
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={notFoundShow}
            onHide={handleNotFoundModalClose}
            className="text-center notFoundModalText"
          >
            {/* <Modal.Header closeButton>
              <Modal.Title className="refundModalText">
                退票操作警告
              </Modal.Title>
            </Modal.Header> */}
            <Modal.Body>
              查無票券或訂票資訊輸入有誤，
              <br></br>
              請檢查輸入資訊！
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <Button
                variant="warning"
                onClick={handleNotFoundModalClose}
                className="rounded-0"
              >
                確定
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default BookingInquiry;
