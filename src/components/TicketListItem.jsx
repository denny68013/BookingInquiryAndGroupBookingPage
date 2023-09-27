import React, { Component } from "react";

function TicketListItem(props) {
  return (
    <li className="list-group-item d-flex row mx-0 ">
      <div className="col-5 col-md-6 orderListText">
        <div className="row">
          <div className="col-12 col-md-6">一般入館</div>
          <div className="col-12 col-md-6 text-md-start"> {props.type}</div>
        </div>
      </div>
      <div className="col-3 col-md-2 orderListText align-self-center">
        {props.num}
      </div>
      <div className="col-4 orderListText align-self-center">
        TWD ${props.num * props.price}
      </div>
    </li>
  );
}

export default TicketListItem;
