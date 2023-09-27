import React, { useContext, useEffect } from "react";
import InputField from "./InputField";
// import "../assets/all.scss";
import { useState } from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";
import DATE from "./DateSelect";
import SessionButton from "./SessionButton";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function GroupBooking() {
  const navigate = useHistory();
  const [inputField, setInputField] = useState({
    name: "",
    adultTicketNum: 0,
    studentTicketNum: 0,
    childTicketNum: 0,
    charityTicketNum: 0,
    phone: "",
    email: "",
    date: "",
    session: 0,
    note: "",
  });

  const [isChecked, setIsChecked] = useState(0);
  const isCheckedHandler = (event) => {
    if (event.target.checked) {
      setIsChecked(1);
    } else {
      setIsChecked(0);
    }
  };
  const handleSubmit = (event) => {
    let totalTicketNum =
      parseInt(inputField.adultTicketNum) +
      parseInt(inputField.studentTicketNum) +
      parseInt(inputField.childTicketNum) +
      parseInt(inputField.charityTicketNum);
    if (isChecked !== 1) {
      setNotCheckPrivacyShow(true);
      event.preventDefault();
    } else if (
      inputField.phone == "" ||
      inputField.email == "" ||
      inputField.name == "" ||
      isEmailValid == false
    ) {
      setIsEmptyShow(true);
      event.preventDefault();
    } else if (totalTicketNum < 15) {
      setTicketLimitShow(true);
      event.preventDefault();
    } else {
      event.preventDefault();
      let url = "http://localhost:2407/groupBooking";
      let sendData = {
        contactName: inputField.name,
        adultTicket: inputField.adultTicketNum,
        studentTicket: inputField.studentTicketNum,
        childTicket: inputField.childTicketNum,
        charityTicket: inputField.charityTicketNum,
        contactPhone: inputField.phone,
        contactEmail: inputField.email,
        selectedDate: selectedDATEOption,
        selectedSession: selectedSessionOption,
        noteText: inputField.note,
      };
      console.log(sendData);
      axios
        .post(url, sendData)
        .then(function (response) {
          if ((response.status = 200)) {
            console.log("send work!");
            window.location = "/groupBookingFin";
            // navigate.push("/groupBookingFin");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    // if (isChecked === 1) {
    //   let totalTicketNum =
    //     parseInt(inputField.adultTicketNum) +
    //     parseInt(inputField.studentTicketNum) +
    //     parseInt(inputField.childTicketNum) +
    //     parseInt(inputField.charityTicketNum);
    //   console.log(totalTicketNum);
    //   if (isEmailValid && !isNameEmpty && !isPhoneEmpty && !isPhoneEmpty) {
    //     if (totalTicketNum < 15) {
    //       // console.log(totalTicketNum);
    //       setTicketLimitShow(true);

    //       event.preventDefault();
    //     } else {
    //       event.preventDefault();
    //       let url = "http://localhost:2407/groupBooking";
    //       let sendData = {
    //         contactName: inputField.name,
    //         adultTicket: inputField.adultTicketNum,
    //         studentTicket: inputField.studentTicketNum,
    //         childTicket: inputField.childTicketNum,
    //         charityTicket: inputField.charityTicketNum,
    //         contactPhone: inputField.phone,
    //         contactEmail: inputField.email,
    //         selectedDate: selectedDATEOption,
    //         selectedSession: selectedSessionOption,
    //         noteText: inputField.note,
    //       };
    //       console.log(sendData);
    //       axios
    //         .post(url, sendData)
    //         .then(function (response) {
    //           if ((response.status = 200)) {
    //             // window.location = "/groupBookingFin";
    //             navigate.push("/groupBookingFin");
    //           }
    //         })
    //         .catch(function (error) {
    //           console.log(error);
    //         });
    //     }
    //   } else {
    //     alert("尚有欄位未填寫完成！");
    //   }
    // } else {
    //   setNotCheckPrivacyShow(true);
    // }
  };

  const [isEmailValid, setIsEmailValid] = useState(true);
  const handleChangeEvent = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  // 抓目前資料庫中可選購的日期作為options
  const [DateSelect, setDateSelect] = useState([]);

  const selectOptions = async () => {
    let url = "http://localhost:2407/Ticket/Cart/DateSelect";
    await axios
      .get(url)
      .then(function (response) {
        let DateData = response.data.data.map(function (element) {
          return element.date.substr(0, 10);
        });

        // 刪掉重複的
        const uniqueDateData = DateData.filter((value, index, self) => {
          return self.indexOf(value) === index;
        });

        console.log(uniqueDateData);
        setDateSelect(uniqueDateData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    selectOptions();
  }, []);
  // 調查場次是否available
  let [disabledSession, setdisabledSession] = useState({
    nine: 0,
    twelve: 0,
    fifteen: 0,
  });
  const sessionAvailable = async (e) => {
    console.log(disabledSession);
    console.log(disabledSession.nine);

    let posturl = "http://localhost:2407/Ticket/Cart/SessionSelect";

    let Session = [];
    await axios
      .post(posturl, { date: e })
      .then(function (response) {
        Session = response.data.data;
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    if (Array.isArray(Session)) {
      const expectedSessions = [9, 12, 15];

      // 初始化一个对象，用于跟踪哪些会话需要禁用
      let sessionsToDisable = {};

      expectedSessions.forEach((ses) => {
        // 默认为需要禁用
        sessionsToDisable[ses] = true;

        // 如果会话在 Session 数组中存在，则不需要禁用
        if (Session.some((item) => item.session === ses)) {
          sessionsToDisable[ses] = false;
        }
      });

      // 更新 disabledSession，只禁用需要禁用的会话
      setdisabledSession((prevState) => ({
        ...prevState,
        nine: sessionsToDisable[9] ? 1 : 0,
        twelve: sessionsToDisable[12] ? 1 : 0,
        fifteen: sessionsToDisable[15] ? 1 : 0,
      }));
    }
  };

  // 選場次

  const [selectedSessionOption, setselectedSessionOption] = useState("9");
  const SessionHandler = (event) => {
    setselectedSessionOption(event.target.value);
    console.log(event.target.value);
  };
  // 選日期
  const [selectedDATEOption, setselectedDATEOption] = useState(DateSelect);
  const DATEHandler = (event) => {
    setselectedDATEOption(event.target.value);
    sessionAvailable(event.target.value);
  };
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isPhoneEmpty, setIsPhoneEmpty] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);

  const [notCheckPrivacyShow, setNotCheckPrivacyShow] = useState(false);
  const handleNotCheckPrivacyModalClose = () => setNotCheckPrivacyShow(false);

  const [ticketLimitShow, setTicketLimitShow] = useState(false);
  const handleTicketLimitModalClose = () => setTicketLimitShow(false);

  const [isEmptyShow, setIsEmptyShow] = useState(false);
  const handleIsEmptyModalClose = () => setIsEmptyShow(false);
  return (
    <div className="myBG">
      <div className="blackBG"></div>
      <div className="container testContext">
        <div className="groupBookingBody">
          <div className="container groupBookingContainer text-center">
            <h2 className="text-center groupBookingInfoTitle">團體預約</h2>
            <div className="text-center groupBookingInfoNotice mb-5">
              * 打星號為必填，團體預約總票數合計需達到15張票（含）以上
            </div>
            <form className="formContainer">
              <InputField
                title="聯絡人姓名*"
                type="text"
                name="name"
                handleChangeEvent={handleChangeEvent}
                placeholder="請輸入聯絡人姓名"
                handleBlurEvent={(e) => {
                  if (e.target.value.length > 0) {
                    setIsNameEmpty(false);
                    console.log("OK");
                  } else {
                    setIsNameEmpty(true);
                    console.log("不得為0");
                  }
                }}
                isEmpty={isNameEmpty}
                errMessage="姓名不得為空白"
              />
              <InputField
                title="成人"
                type="number"
                name="adultTicketNum"
                handleChangeEvent={(e) => {
                  if (e.target.value < 0) {
                    e.target.value = 0;
                    setInputField({ ...inputField, [e.target.name]: 0 });
                  } else {
                    setInputField({
                      ...inputField,
                      [e.target.name]: e.target.value,
                    });
                    console.log(e.target.value);
                  }
                }}
                minNum={0}
                placeholder="請輸入欲參加成人人數"
              />
              <InputField
                title="學生"
                type="number"
                name="studentTicketNum"
                handleChangeEvent={(e) => {
                  if (e.target.value < 0) {
                    e.target.value = 0;
                    setInputField({ ...inputField, [e.target.name]: 0 });
                  } else {
                    setInputField({
                      ...inputField,
                      [e.target.name]: e.target.value,
                    });
                    console.log(e.target.value);
                  }
                }}
                minNum={0}
                placeholder="請輸入欲參加學生人數"
              />
              <InputField
                title="孩童"
                type="number"
                name="childTicketNum"
                handleChangeEvent={(e) => {
                  if (e.target.value < 0) {
                    e.target.value = 0;
                    setInputField({ ...inputField, [e.target.name]: 0 });
                  } else {
                    setInputField({
                      ...inputField,
                      [e.target.name]: e.target.value,
                    });
                    console.log(e.target.value);
                  }
                }}
                minNum={0}
                placeholder="請輸入欲參加孩童人數"
              />
              <InputField
                title="博愛"
                type="number"
                name="charityTicketNum"
                handleChangeEvent={(e) => {
                  if (e.target.value < 0) {
                    e.target.value = 0;
                    setInputField({ ...inputField, [e.target.name]: 0 });
                  } else {
                    setInputField({
                      ...inputField,
                      [e.target.name]: e.target.value,
                    });
                    console.log(e.target.value);
                  }
                }}
                minNum={0}
                placeholder="請輸入欲參加符合博愛票人數"
              />
              <InputField
                title="電話*"
                type="tele"
                name="phone"
                handleChangeEvent={handleChangeEvent}
                placeholder="請輸入電話號碼"
                handleBlurEvent={(e) => {
                  if (e.target.value.length > 0) {
                    setIsPhoneEmpty(false);
                    console.log("OK");
                  } else {
                    setIsPhoneEmpty(true);
                    console.log("不得為0");
                  }
                }}
                isEmpty={isPhoneEmpty}
                errMessage="電話不得為空白"
              />
              <InputField
                title="信箱*"
                type="email"
                name="email"
                handleChangeEvent={handleChangeEvent}
                placeholder="請輸入電子郵件"
                handleBlurEvent={(e) => {
                  if (e.target.value.length > 0) {
                    setIsEmailEmpty(false);
                    console.log("OK");
                    const { name, value } = e.target;
                    console.log(e.target.name);

                    // 在這裡使用正則表達式進行驗證;
                    let isValid = true;

                    const regex =
                      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/; // 電子郵件的正則表達式示例
                    isValid = regex.test(value);
                    if (!isValid) {
                      setIsEmailValid(false);
                      console.log("失敗");
                    } else {
                      setIsEmailValid(true);
                      console.log("成功");
                    }
                  } else {
                    setIsEmailEmpty(true);
                    console.log("不得為0");
                  }
                }}
                isEmpty={isEmailEmpty}
                errMessage={isEmailEmpty ? "電子郵件不得為空白" : null}
                isValid={isEmailValid}
                validMessage="請輸入有效的電子郵件"
              />
              <div className="animate__animated animate__fadeInUp">
                <div className="row inputForm mb-5">
                  <div className="col-12 col-md-6 text-center text-md-start">
                    <label htmlFor="nameInput" className="d-inline-block">
                      預約日期
                    </label>
                  </div>
                  <div className="col-12 col-md-6 text-center text-md-start">
                    {DateSelect.length > 0 && (
                      <select
                        name="date"
                        id="date"
                        className="selectGroupBookingSession"
                        onChange={DATEHandler}
                      >
                        {DateSelect.map(function (item, index) {
                          return <DATE key={index} date={item} order={index} />;
                        })}
                      </select>
                    )}
                  </div>
                </div>
              </div>

              <div className="row inputForm mb-5">
                <div className="col-12 col-md-6 text-center text-md-start mb-3 mb-md-0">
                  <label htmlFor="dateInput" className="d-inline-block">
                    預約場次
                  </label>
                </div>
                <div className="col-12 col-md-6 text-center text-md-start">
                  <SessionButton
                    SessionHandler={SessionHandler}
                    selectedSessionOption={selectedSessionOption}
                    disabledSession={disabledSession}
                  ></SessionButton>
                  {/* <select
              name="session"
              className="selectGroupBookingSession"
              onChange={(e) =>
                setInputField({
                  ...inputField,
                  [e.target.name]: e.target.value,
                })
              }
              value="none"
            >
              <option value="none">請選擇場次</option>
              <option value="9">09:00</option>
              <option value="12">12:00</option>
              <option value="15">15:00</option>
            </select> */}
                </div>
              </div>
              <br />
              <div className="row inputForm mb-5">
                <div className="col-12 col-md-6 text-center text-md-start mb-3 mb-md-0">
                  <label htmlFor="noteInput" className="d-inline-block">
                    備註說明
                  </label>
                </div>
                <div className="col-12 col-md-6 text-center text-md-start">
                  <textarea
                    id="noteInput"
                    cols="21"
                    rows="3"
                    name="note"
                    className="border-0 border-bottom d-inline-block groupBookingNote"
                    onChange={(e) =>
                      setInputField({
                        ...inputField,
                        [e.target.name]: e.target.value,
                      })
                    }
                    placeholder="請輸入其他想補充的資訊"
                  ></textarea>
                </div>
              </div>
              <div className="ro text-start">
                <div className="mb-5 col-12 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="privacyCheck"
                    onChange={isCheckedHandler}
                  />
                  <label className="form-check-label" htmlFor="privacyCheck">
                    我已閱讀並同意「隱私權政策條款」
                  </label>
                  <p className="privacyText">
                    當您填表完成簽名或勾選﹝我已閱讀並同意﹞並送出資料時，即表示您已閱讀、了解並同意本聲明暨同意書的所有內容，且您瞭解此一同意符合個人資料保護法及相關法規之要求，具有書面同意主辦單位／承辦單位蒐集、處理及利用您個人資料之效果。
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-outline-light rounded-0 p-3 me-md-5 orderBtn"
                onClick={handleSubmit}
              >
                送出
              </button>
            </form>
          </div>
        </div>
        <Modal
          show={notCheckPrivacyShow}
          onHide={handleNotCheckPrivacyModalClose}
          className="text-center notFoundModalText"
        >
          {/* <Modal.Header closeButton>
              <Modal.Title className="refundModalText">
                退票操作警告
              </Modal.Title>
            </Modal.Header> */}
          <Modal.Body className="">請先勾選隱私同意事項</Modal.Body>
          <Modal.Footer className="justify-content-center">
            <Button
              variant="warning"
              onClick={handleNotCheckPrivacyModalClose}
              className="rounded-0"
            >
              確定
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={ticketLimitShow}
          onHide={handleTicketLimitModalClose}
          className="text-center notFoundModalText"
        >
          {/* <Modal.Header closeButton>
              <Modal.Title className="refundModalText">
                退票操作警告
              </Modal.Title>
            </Modal.Header> */}
          <Modal.Body>團體預約總票數需要達到15張（含）以上</Modal.Body>
          <Modal.Footer className="justify-content-center">
            <Button
              variant="warning"
              onClick={handleTicketLimitModalClose}
              className="rounded-0"
            >
              確定
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={isEmptyShow}
          onHide={handleIsEmptyModalClose}
          className="text-center notFoundModalText"
        >
          {/* <Modal.Header closeButton>
              <Modal.Title className="refundModalText">
                退票操作警告
              </Modal.Title>
            </Modal.Header> */}
          <Modal.Body>尚有必填欄位未填寫完成或不是有效的電子信箱！</Modal.Body>
          <Modal.Footer className="justify-content-center">
            <Button
              variant="warning"
              onClick={handleIsEmptyModalClose}
              className="rounded-0"
            >
              確定
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default GroupBooking;
// -----------

// const [name, setName] = useState("");
// const [adultTicketNum, setAdultTicketNum] = useState(0);
// const [studentTicketNum, setStudentTicketNum] = useState(0);
// const [childTicketNum, setChildTicketNum] = useState(0);
// const [charityTicketNum, setCharityTicketNum] = useState(0);
// const [phone, setPhone] = useState("");
// const [email, setEmail] = useState("");
// const [date, setDate] = useState("");
// const [session, setSession] = useState(0);
// const [note, setNote] = useState("");

// -----------
// className GroupBooking extends Component {
//   state = {
//     groupBooking: {
//       contact_person_name: "測試",
//       adult_tickets: 0,
//       student_tickets: 0,
//       child_tickets: 0,
//       charity_tickets: 0,
//       contact_person_phone: 0,
//       contact_person_email: "apple@gmail.com",
//       session: 15,
//       form_submission_time: 0,
//     },
//   };
//   render() {
//     return (
//       <div classNameName="container groupBookingContainer text-center">
//         <h2 classNameName="text-center groupBookingInfoTitle mb-5">團體預約</h2>
//         <form>
//           <div classNameName="row groupForm mb-5">
//             <div classNameName="col-6 text-start">
//               <label htmlFor="nameInput" classNameName="d-inline-block">
//                 聯絡人姓名
//               </label>
//             </div>
//             <div classNameName="col-6">
//               <input
//                 type="text"
//                 classNameName="border-0 border-bottom d-inline-block"
//                 id="nameInput"
//               />
//             </div>
//           </div>
//           <br />
//           <br />
//           <div classNameName="row groupForm mb-5">
//             <div classNameName="col-6 text-start">
//               <label htmlFor="adultInput" classNameName="d-inline-block">
//                 成人
//               </label>
//             </div>
//             <div classNameName="col-6">
//               <input
//                 type="number"
//                 classNameName="border-0 border-bottom d-inline-block"
//                 id="adultInput"
//               />
//             </div>
//           </div>
//           <div classNameName="row groupForm mb-5">
//             <div classNameName="col-6 text-start">
//               <label htmlFor="studentInput" classNameName="d-inline-block">
//                 學生
//               </label>
//             </div>
//             <div classNameName="col-6">
//               <input
//                 type="number"
//                 classNameName="border-0 border-bottom d-inline-block"
//                 id="studentInput"
//               />
//             </div>
//           </div>
//           <div classNameName="row groupForm mb-5">
//             <div classNameName="col-6 text-start">
//               <label htmlFor="childInput" classNameName="d-inline-block">
//                 孩童
//               </label>
//             </div>
//             <div classNameName="col-6">
//               <input
//                 type="number"
//                 classNameName="border-0 border-bottom d-inline-block"
//                 id="childInput"
//               />
//             </div>
//           </div>
//           <div classNameName="row groupForm mb-5">
//             <div classNameName="col-6 text-start">
//               <label htmlFor="elderInput" classNameName="d-inline-block">
//                 博愛
//               </label>
//             </div>
//             <div classNameName="col-6">
//               <input
//                 type="number"
//                 classNameName="border-0 border-bottom d-inline-block"
//                 id="elderInput"
//               />
//             </div>
//           </div>
//           <br />
//           <br />
//           <div classNameName="row groupForm mb-5">
//             <div classNameName="col-6 text-start">
//               <label htmlFor="telephoneInput" classNameName="d-inline-block">
//                 電話
//               </label>
//             </div>
//             <div classNameName="col-6">
//               <input
//                 type="tel"
//                 classNameName="border-0 border-bottom d-inline-block"
//                 id="telephoneInput"
//               />
//             </div>
//           </div>
//           <br />
//           <div classNameName="row groupForm mb-5">
//             <div classNameName="col-6 text-start">
//               <label htmlFor="emailInput" classNameName="d-inline-block">
//                 信箱
//               </label>
//             </div>
//             <div classNameName="col-6">
//               <input
//                 type="email"
//                 classNameName="border-0 border-bottom d-inline-block"
//                 id="emailInput"
//               />
//             </div>
//           </div>
//           <br />
//           <div classNameName="row groupForm mb-5">
//             <div classNameName="col-6 text-start">
//               <label htmlFor="dateInput" classNameName="d-inline-block">
//                 預約日期
//               </label>
//             </div>
//             <div classNameName="col-6">
//               <input
//                 type="date"
//                 classNameName="border-0 border-bottom d-inline-block"
//                 id="dateInput"
//               />
//             </div>
//           </div>
//           <br />
//           <div classNameName="row groupForm mb-5">
//             <div classNameName="col-6 text-start">
//               <label htmlFor="dateInput" classNameName="d-inline-block">
//                 預約場次
//               </label>
//             </div>
//             <div classNameName="col-6">
//               <select name="”orderSerialNumber”">
//                 <option value="0900">09:00</option>
//                 <option value="1200" selected>
//                   12:00
//                 </option>
//                 <option value="1500" selected>
//                   15:00
//                 </option>
//               </select>
//             </div>
//           </div>
//           <br />
//           <div classNameName="row groupForm mb-5">
//             <div classNameName="col-6 text-start">
//               <label htmlFor="noteInput" classNameName="d-inline-block">
//                 備註說明
//               </label>
//             </div>
//             <div classNameName="col-6">
//               <textarea
//                 name="note"
//                 id="noteInput"
//                 cols="21"
//                 rows="3"
//                 classNameName="border-0 border-bottom d-inline-block"
//               ></textarea>
//             </div>
//           </div>
//           <br />
//           <div classNameName="ro text-start">
//             <div classNameName="mb-3 col-12 form-check">
//               <input
//                 type="checkbox"
//                 classNameName="form-check-input"
//                 id="exampleCheck1"
//               />
//               <label classNameName="form-check-label" for="exampleCheck1">
//                 我已閱讀並同意「隱私權政策條款」
//               </label>
//               <p classNameName="privacyText">
//                 當您填表完成簽名或勾選﹝我已閱讀並同意﹞並送出資料時，即表示您已閱讀、了解並同意本聲明暨同意書的所有內容，且您瞭解此一同意符合個人資料保護法及相關法規之要求，具有書面同意主辦單位／承辦單位蒐集、處理及利用您個人資料之效果。
//               </p>
//             </div>
//           </div>
//           <br />
//           <button type="" classNameName="btn btn-outline-dark rounded-0 p-3 me-5">
//             <a href="" classNameName="text-dark text-decoration-none orderBtn">
//               送出
//             </a>
//           </button>
//         </form>
//       </div>
//     );
//   }
// }

// export default GroupBooking;
