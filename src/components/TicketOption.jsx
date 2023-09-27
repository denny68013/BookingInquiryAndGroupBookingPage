import React from "react";
// import "../assets/bookingInquiry.scss";
function TicketOption(props) {
  let pickUpWord = "";
  if (props.pickUpMethod === "S") {
    pickUpWord = "現場取票";
  } else if (props.pickUpMethod === "E") {
    pickUpWord = "電子票券";
  }
  return (
    <React.Fragment>
      {props.orderId ? (
        <option value={props.orderId} className="ticketIdOption">
          {props.orderId + "-" + pickUpWord}
        </option>
      ) : null}
    </React.Fragment>
  );
}

export default TicketOption;
