import React, { Component } from "react";

function GroupBookingFin() {
  const handleSubmit = () => {
    window.location = "/";
  };
  return (
    <React.Fragment>
      <div className="myBG">
        <div className="blackBG"></div>
        <div className="container testContext">
          <div className="groupBookingFinBody">
            <div className="container groupBookingContainer text-center">
              <h2 className="text-center groupBookingInfoTitle mb-5">
                團體預約
              </h2>
              <h2 className="text-center mb-5  groupBookingFinText">
                我們已收到您的申請，並已寄送確認信件到您填寫的信箱
                <br></br>
                AquaR 團隊將會在3-5個工作天與您聯繫
              </h2>
              <button
                type="button"
                className="btn btn-outline-light rounded-0 p-3 orderBtn"
                onClick={handleSubmit}
              >
                回首頁
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default GroupBookingFin;

{
  /* <div className="groupBookingFinBody">
  <div className="container groupBookingContainer text-center">
    <h2 className="text-center groupBookingInfoTitle mb-5">團體預約</h2>
    <h2 className="text-center mb-5  groupBookingFinText">
      我們已收到您的申請
      <br></br>
      AquaR 團隊將會在3-5個工作天與您聯繫
    </h2>
    <button
      type="button"
      className="btn btn-outline-light rounded-0 p-3 "
      onClick={handleSubmit}
    >
      <a href="" className="text-white text-decoration-none orderBtn">
        回首頁
      </a>
    </button>
  </div>
</div>; */
}

// <div className="groupBookingFinBody">
// <div className="container groupBookingContainer text-center">
//   <h2 className="text-center groupBookingInfoTitle mb-5">團體預約</h2>
//   <h2 className="text-center mb-5  groupBookingFinText">
//     我們已收到您的申請
//     <br></br>
//     AquaR 團隊將會在3-5個工作天與您聯繫
//   </h2>
//   <button
//     type="button"
//     className="btn btn-outline-light rounded-0 p-3 "
//     onClick={handleSubmit}
//   >
//     <a href="" className="text-white text-decoration-none orderBtn">
//       回首頁
//     </a>
//   </button>
// </div>
// </div>
