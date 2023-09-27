import React, { useEffect } from "react";

import TicketListItem from "./TicketListItem";

function TicketList(props) {
  //   console.log(props.adultTicketNum);
  let adultTN = props.adultTicketNum ? props.adultTicketNum : 0;
  let studentTN = props.studentTicketNum ? props.studentTicketNum : 0;
  let childTN = props.childTicketNum ? props.childTicketNum : 0;
  let charityTN = props.charityTicketNum ? props.charityTicketNum : 0;
  useEffect(() => {
    console.log(props.valid);
  }, []);
  return (
    <div className="infoFieldInquiry rounded-0">
      <h5 className="pt-2 orderListTitle">訂單明細</h5>
      <br />
      <div className="orderContent row ">
        <span className="col-6 text-end">訂單編號：</span>
        <span className="col-6 text-start ps-0">{props.orderId}</span>
      </div>
      <div className="orderContent row">
        <span className="col-6 text-end">訂購時間：</span>
        <span className="col-6 text-start ps-0">
          {props.orderTime.slice(0, 10)}
        </span>
      </div>
      <div className="orderContent row">
        <span className="col-6 text-end">訂票人：</span>
        <span className="col-6 text-start ps-0">{props.customerName}</span>
      </div>
      {props.pickUpPersonName != 0 ? (
        <div className="orderContent row">
          <span className="col-6 text-end">取票人：</span>
          <span className="col-6 text-start ps-0">
            {props.pickUpPersonName}
          </span>
        </div>
      ) : null}
      <br />
      <div className="admissionTimeBox row rounded-0">
        <span className=" text-center">入場時間</span>
        <span className=" text-center">
          {new Date(props.date).getFullYear() +
            " 年 " +
            (new Date(props.date).getMonth() + 1) +
            " 月 " +
            new Date(props.date).getDate() +
            "  日  " +
            props.session +
            ":00"}
        </span>
      </div>
      <br />
      <div className="card rounded-0">
        <div className="card-header d-flex row mx-0 border">
          <div className="col-5 col-md-6 orderListText">商品</div>
          <div className="col-3 col-md-2 orderListText">數量</div>
          <div className="col-4 col-md-4 orderListText">小計</div>
        </div>
        <ul className="list-group list-group-flush">
          {props.adultTicketNum ? (
            <TicketListItem
              num={props.adultTicketNum}
              type={"成人票"}
              price={300}
            />
          ) : null}
          {props.studentTicketNum ? (
            <TicketListItem
              num={props.studentTicketNum}
              type={"學生票"}
              price={250}
            />
          ) : null}
          {props.childTicketNum ? (
            <TicketListItem
              num={props.childTicketNum}
              type={"孩童票"}
              price={200}
            />
          ) : null}
          {props.charityTicketNum ? (
            <TicketListItem
              num={props.charityTicketNum}
              type={"博愛票"}
              price={200}
            />
          ) : null}
        </ul>
      </div>
      <div className="d-flex my-3 orderTicketTotal justify-content-center justify-content-md-end">
        <div className="">訂單總計</div>
        <div className="ms-3">
          TWD $
          {adultTN * 300 + studentTN * 250 + childTN * 200 + charityTN * 200}
        </div>
      </div>
      {props.valid === 2 ? (
        <div className="d-flex justify-content-center isRefundText fw-bold border">
          <div>本筆訂單已退票</div>
        </div>
      ) : null}
      {props.pickupMethod === "S" ? (
        <div className="d-flex justify-content-center fw-bold noticeText">
          <div>＊請持取票人證件至本館 1F 服務台取票後憑票入館</div>
        </div>
      ) : null}
    </div>
  );
}

export default TicketList;
