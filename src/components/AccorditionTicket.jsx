import React, { Component } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useMediaQuery } from "react-responsive";

function AccorditionTicket(props) {
  let ticketType = (e) => {
    switch (e) {
      case "A":
        return "成人票";
        break;
      case "S":
        return "學生票";
        break;
      case "K":
        return "孩童票";
        break;
      case "C":
        return "博愛票";
        break;
      default:
        return "錯誤";
        break;
    }
  };
  // const inputElement = document.getElementById(`${props.ticketId}`);
  // inputElement.addEventListener("click", (e) => {
  //   e.stopPropagation();
  //   console.log(e.target.id);
  // });
  const isNotMobile = useMediaQuery({ query: "(min-width: 450px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 450px)" });
  return (
    <div>
      <div className="accordion-item">
        <div
          className="accordion-header row border-bottom"
          id={`panelsStayOpen-heading` + props.index}
        >
          <button
            className="accordion-button accordionTicket"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#panelsStayOpen-collapse` + props.index}
            aria-expanded="false"
            aria-controls={`panelsStayOpen-collapse` + props.index}
          >
            <div className="row w-100 accordionTicketDescription border-top-0">
              <div className="col-12 col-md-3 ">
                {isMobile ? null : (
                  <div>
                    {" "}
                    {props.valid == 2 ? null : (
                      <div className="align-self-center">
                        <input
                          type="checkbox"
                          className="refundInput me-1 form-check-input"
                          id={props.ticketId}
                          data-bs-toggle="collapse"
                          data-bs-target
                          onClick={props.handleClick}
                          name="refundBtn"
                        />
                        <label
                          htmlFor={props.ticketId}
                          data-bs-toggle="collapse"
                          data-bs-target
                        >
                          選擇退票
                        </label>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="col-12 col-md-3 text-start text-md-end">
                一般入館｜{ticketType(props.type)}
              </div>
              <div className="ms-auto col-12 col-md-6 text-start ">
                票券編號：{props.ticketId}
              </div>
            </div>
          </button>
        </div>
        <div
          id={`panelsStayOpen-collapse` + props.index}
          className="accordion-collapse collapse show"
          aria-labelledby={`panelsStayOpen-heading` + props.index}
        >
          <div className="accordion-body flex-column flex-md-row d-md-flex  justify-content-between align-items-end">
            <h2 className="mt-2 mt-md-0 mb-3 mb-md-0 accordtionTicketType">
              {ticketType(props.type)}
            </h2>

            <div className="mb-3 mb-md-0">
              {props.valid == 1 ? (
                <QRCodeSVG value={props.qrcode} className="qrcode" />
              ) : null}
              {props.valid == 2 ? (
                <div className="d-flex justify-content-center isRefundText fw-bold ">
                  <div>本張票券已退票</div>
                </div>
              ) : null}
            </div>

            <div className="mt-auto">入館請出示此條碼</div>

            {isMobile ? (
              <div className="refundContainer mt-2">
                {" "}
                {props.valid == 2 ? null : (
                  <label
                    htmlFor={props.ticketId}
                    data-bs-toggle="collapse"
                    data-bs-target
                    className="refundLabel"
                  >
                    <input
                      type="checkbox"
                      className="refundInput me-1 form-check-input"
                      id={props.ticketId}
                      data-bs-toggle="collapse"
                      data-bs-target
                      onClick={props.handleClick}
                      name="refundBtn"
                    />
                    選擇退票
                  </label>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccorditionTicket;
