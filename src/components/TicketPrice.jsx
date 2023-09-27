import React from "react";
import { useHistory } from "react-router-dom";

const TicketPrice = () => {
  const navigate = useHistory();
  const handleOnClick = () => {
    window.location = "/groupBooking";
    // navigate.push("/groupBooking");
  };

  return (
    <div className="myBG">
      <div className="blackBG"></div>
      <div className="container testContext">
        <div className="ticketPricePageBody">
          <div className="container-fluid ticketPricePageContainer">
            {/* <video className="videoTag" autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video> */}
            <br />
            <h2 className="text-center bookingInfoTitle mb-5 ">
              預約訂票｜票價資訊
            </h2>
            <div className="container-fluid text-center ticketInfoContainer ">
              <div className="d-block d-sm-none">
                <div className="mb-5">
                  <div className="mb-1 row ">
                    <div className="col-12">一般入館</div>
                    <div className="col-12"> 限18歲(含)以上成人使用</div>
                  </div>
                  <div className="mb-3 row mt-2">
                    <div className="col-6 ticketType ">成人票</div>
                    <div className="col-6 ticketPrice "> NT$300</div>
                  </div>
                </div>
                <div className="mb-5">
                  <div className="mb-1 row ">
                    <div className="col-12">一般入館</div>
                    <div className="col-12">
                      限12歲(含)以上持學生證之學生適用
                    </div>
                  </div>
                  <div className="mb-3 row mt-2">
                    <div className="col-6 ticketType ">學生票</div>
                    <div className="col-6 ticketPrice "> NT$250</div>
                  </div>
                </div>
                <div className="mb-5">
                  <div className="mb-1 row ">
                    <div className="col-12">一般入館</div>
                    <div className="col-12">
                      限4歲(含)以上及未滿12歲兒童適用
                    </div>
                  </div>
                  <div className="mb-3 row mt-2">
                    <div className="col-6 ticketType ">孩童票</div>
                    <div className="col-6 ticketPrice "> NT$200</div>
                  </div>
                </div>
                <div className="mb-5">
                  <div className="mb-1 row ">
                    <div className="col-12">一般入館</div>
                    <div className="col-12 ">
                      <div className="container-fluid text-center charityLimitText">
                        限持有身心障礙證明者、身心障礙者的1位陪同者、孕婦、滿65歲以上長者適用
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 row mt-2">
                    <div className="col-6 ticketType ">博愛票</div>
                    <div className="col-6 ticketPrice "> NT$200</div>
                  </div>
                </div>
                <div className="mb-5">
                  <div className="mb-1 row ">
                    <div className="col-12">一般入館</div>
                    <div className="col-12">15人以上適用</div>
                  </div>
                  <div className="mb-3 row mt-2">
                    <div className="col-12 ticketType mb-3">團體票</div>
                    <div className="container groupTicketPriceContainer">
                      <div className="col-12   text-center border p-3 ">
                        <div className="container groupContainer">
                          <div className="row">
                            <div className="col-6 groupTicket">
                              <span className="groupTicketType">成人票</span>
                              <br />
                              <span>NT$250</span>
                            </div>
                            <div className="col-6 groupTicket">
                              <span className="groupTicketType">學生票</span>
                              <br />
                              <span>NT$200</span>
                            </div>
                            <div className="col-6 groupTicket">
                              <span className="groupTicketType">孩童票</span>
                              <br />
                              <span>NT$150</span>
                            </div>
                            <div className="col-6 groupTicket">
                              <span className="groupTicketType">博愛票</span>
                              <br />
                              <span>NT$150</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-none d-sm-block">
                <div className="mb-3 row">
                  <div className="col-2 col-md-3"></div>
                  <div className="text-start  col-4 col-md-3  ticketTypeContainer">
                    <p className="mb-0 ">一般入館</p>
                    <p className="ticketType ">成人票</p>
                  </div>
                  <div className="text-start ps-3 col-6">
                    <p className="mb-0">限18歲(含)以上成人使用</p>
                    <p className="ticketType">NT$300</p>
                  </div>
                </div>
                <div className="mb-3 row">
                  <div className="col-2 col-md-3"></div>
                  <div className="text-start   col-4 col-md-3  ticketTypeContainer">
                    <p className="mb-0 ">一般入館</p>
                    <p className="ticketType ">學生票</p>
                  </div>
                  <div className="text-start ps-3 col-6">
                    <p className="mb-0">限12歲(含)以上持學生證之學生適用</p>
                    <p className="ticketType">NT$250</p>
                  </div>
                </div>
                <div className="mb-3 row">
                  <div className="col-2 col-md-3"></div>
                  <div className="text-start   col-4 col-md-3  ticketTypeContainer">
                    <p className="mb-0 ">一般入館</p>
                    <p className="ticketType ">孩童票</p>
                  </div>
                  <div className="text-start ps-3 col-6">
                    <p className="mb-0">限4歲(含)以上及未滿12歲兒童適用</p>
                    <p className="ticketType">NT$200</p>
                  </div>
                </div>
                <div className="mb-3 row">
                  <div className="col-2 col-md-3"></div>
                  <div className="text-start  col-4 col-md-3  ticketTypeContainer">
                    <p className="mb-0 ">一般入館</p>
                    <p className="ticketType mt-sm-4 mt-md-0">博愛票</p>
                  </div>
                  <div className="text-start ps-3 col-6">
                    <p className="mb-0 ">
                      限持有身心障礙證明者、身心障礙者的1位陪同者、孕婦、滿65歲以上長者適用
                    </p>
                    <p className="ticketType">NT$200</p>
                  </div>
                </div>
                <div className="mb-3 row">
                  <div className="col-2 col-md-3"></div>
                  <div className="text-start   col-4 col-md-3  ticketTypeContainer">
                    <p className="mb-0 ">一般入館</p>
                    <p className="ticketType ">團體票</p>
                  </div>
                  <div className="text-start ps-3 col-6">
                    <div className="col-12 text-start border p-3 pb-4">
                      <div className="container groupContainer">
                        <p className="groupLimit">15人以上適用</p>
                        <div className="row">
                          <div className="col-6 groupTicket">
                            <span className="groupTicketType">成人票</span>
                            <br />
                            <span>NT$250</span>
                          </div>
                          <div className="col-6 groupTicket">
                            <span className="groupTicketType">學生票</span>
                            <br />
                            <span>NT$200</span>
                          </div>
                          <div className="col-6 groupTicket">
                            <span className="groupTicketType">孩童票</span>
                            <br />
                            <span>NT$150</span>
                          </div>
                          <div className="col-6 groupTicket">
                            <span className="groupTicketType">博愛票</span>
                            <br />
                            <span>NT$150</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <button className="btn btn-outline-light rounded-0 p-3 me-5 orderBtn">
                一般訂票
              </button>
              <button className="btn btn-outline-light rounded-0 p-3">
                <div
                  onClick={handleOnClick}
                  className=" text-decoration-none orderBtn"
                >
                  團體預約
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPrice;
