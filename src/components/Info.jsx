import React, { Fragment, useState, useContext, useEffect } from 'react';
import InputFieldPay from './InputFieldPay';
import axios from 'axios';
import PickUpButton from './PickUpButton';
import { ContextA } from "./ContextA";
import { useHistory } from "react-router-dom";
import { useBeforeunload } from 'react-beforeunload';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function Info() {
    const navigate = useHistory();

    const { OrderPass, setOrderPass } = useContext(ContextA);
    const { OrderID, setOrderID } = useContext(ContextA);
    const { OrderDate, setOrderDate } = useContext(ContextA);
    const { OrderSession, setOrderSession } = useContext(ContextA);
    const { timeleft, setTimeleft } = useContext(ContextA);
    const { cancelTicket } = useContext(ContextA);
    const { cancelOrderChangeremain } = useContext(ContextA);
    const { startTimer } = useContext(ContextA);
    const { timeStartClear, setTimeStartClear } = useContext(ContextA);
    const { timeoutID, setTimeoutID } = useContext(ContextA);
    const { timeoutExecuted, setTimeoutExecuted } = useContext(ContextA);


    const [somethingWrongShow, setSomethingWrongShow] = useState(false);
    const handleSomethingWrongShow = () => setSomethingWrongShow(true);
    const handleSomethingWrongClose = () => setSomethingWrongShow(false);

    const [isNotCompletedShow, setIsNotCompletedShow] = useState(false);
    const handleIsNotCompletedShow = () => setIsNotCompletedShow(true);
    const handleIsNotCompletedClose = () => setIsNotCompletedShow(false);

    const [privacyShow, setPrivacyShow] = useState(false);
    const handlePrivacyShow = () => setPrivacyShow(true);
    const handlePrivacyClose = () => setPrivacyShow(false);

    const [overTimeShow, setOverTimeShow] = useState(false);
    const handleOverTimeShow = () => setOverTimeShow(true);
    const handleOverTimeClose = () => setOverTimeShow(false);



    let NewOrderPass = [0, 0, 0, 0];

    for (let i = 0; i < OrderPass.length; i++) {
        switch (OrderPass[i].Name) {
            case '成人票':
                NewOrderPass[0] = OrderPass[i].count;
                break;
            case '學生票':
                NewOrderPass[1] = OrderPass[i].count;
                break;
            case '孩童票':
                NewOrderPass[2] = OrderPass[i].count;
                break;
            case '博愛票':
                NewOrderPass[3] = OrderPass[i].count;
                break;


        }
    }


    const [inputFieldPay, setInputFieldPay] = useState({

        BuyerEmail: "",
        BuyerName: "",
        BuyerPhone: "",
        BuyerID: "",
        ticket_pickup_method: "",
        PickUpName: "",
        PickUpID: "",

    });


    const [isCheckedInfo, setIsCheckedInfo] = useState(0);
    const isCheckedHandlerInfo = (event) => {
        if (event.target.checked) {
            setIsCheckedInfo(1);
        } else {
            setIsCheckedInfo(0);
        }
    };

    const [selectedOption, setSelectedOption] = useState('E');
    function PickUpHandler(event) {
        setSelectedOption(event.target.value);
    }

    const handleChangeEventInfo = (e) =>
        setInputFieldPay({ ...inputFieldPay, [e.target.name]: e.target.value });

    const handleSubmitInfo = (event) => {
        if (isCheckedInfo == 1) {
            if (isEmailValid && isIDValid && !isIDEmpty && !isNameEmpty && !isEmailEmpty && !isPhoneEmpty) {
                if (selectedOption == 'E') {
                    event.preventDefault();
                    let url = "http://localhost:2407/Ticket/Info";
                    let sendData = {
                        order_id: (OrderID) ? (OrderID) : Math.random() * 100,
                        customer_email: inputFieldPay.BuyerEmail,
                        customer_name: inputFieldPay.BuyerName,
                        customer_phone: inputFieldPay.BuyerPhone,
                        customer_id_number: inputFieldPay.BuyerID,
                        ticket_pickup_method: selectedOption,
                        pickup_person_name: (inputFieldPay.PickUpName) ? (inputFieldPay.PickUpName) : 0,
                        pickup_person_id_number: (inputFieldPay.PickUpID) ? (inputFieldPay.PickUpName) : 0,
                        date: OrderDate,
                        session: OrderSession,
                        adult_tickets: NewOrderPass[0],
                        student_tickets: NewOrderPass[1],
                        child_tickets: NewOrderPass[2],
                        charity_tickets: NewOrderPass[3],
                        valid: 1
                    };
                    console.log(sendData);
                    axios
                        .post(url, sendData)
                        .then(function (response) {
                            if ((response.status = 200)) {

                                let NowTime = document.getElementById('time').innerText;
                                setTimeleft(NowTime);



                                navigate.push("/Ticket/CreditCard");

                                console.log("OK");

                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                            handleSomethingWrongShow();
                        });
                } else {
                    if (isPKIDValid && !isPKNameEmpty && !isPKIDEmpty) {
                        event.preventDefault();
                        let url = "http://localhost:2407/Ticket/Info";
                        let sendData = {
                            order_id: (OrderID) ? (OrderID) : Math.random() * 100,
                            customer_email: inputFieldPay.BuyerEmail,
                            customer_name: inputFieldPay.BuyerName,
                            customer_phone: inputFieldPay.BuyerPhone,
                            customer_id_number: inputFieldPay.BuyerID,
                            ticket_pickup_method: selectedOption,
                            pickup_person_name: (inputFieldPay.PickUpName) ? (inputFieldPay.PickUpName) : 0,
                            pickup_person_id_number: (inputFieldPay.PickUpID) ? (inputFieldPay.PickUpName) : 0,
                            date: OrderDate,
                            session: OrderSession,
                            adult_tickets: NewOrderPass[0],
                            student_tickets: NewOrderPass[1],
                            child_tickets: NewOrderPass[2],
                            charity_tickets: NewOrderPass[3],
                            valid: 1

                        };
                        console.log(sendData);
                        axios
                            .post(url, sendData)
                            .then(function (response) {
                                if ((response.status = 200)) {

                                    let NowTime = document.getElementById('time').innerText;
                                    setTimeleft(NowTime);

                                    navigate.push("/Ticket/CreditCard");

                                    console.log("OK");

                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                                handleSomethingWrongShow();
                            });
                    } else {
                        handleIsNotCompletedShow();
                    }
                }
            } else {
                handleIsNotCompletedShow();
            }
        } else {
            handlePrivacyShow();
        }
    };


    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isIDValid, setIsIDValid] = useState(true);
    const [isPKIDValid, setIsPKIDValid] = useState(true);
    const [isNameEmpty, setIsNameEmpty] = useState(true);
    const [isPKNameEmpty, setIsPKNameEmpty] = useState(true);
    const [isPhoneEmpty, setIsPhoneEmpty] = useState(true);
    const [isEmailEmpty, setIsEmailEmpty] = useState(true);
    const [isIDEmpty, setIsIDEmpty] = useState(true);
    const [isPKIDEmpty, setIsPKIDEmpty] = useState(true);


    useEffect(() => {
        let tenMinutes = 60 * 10,
            display = document.querySelector('#time');
        startTimer(tenMinutes, display);
        console.log('123');
        TimeBegin();
    }, []);



    let NewTimeID;

    const TimeBegin = async () => {

        setTimeStartClear(true);

        NewTimeID = setTimeout(async () => {
            if (!timeoutExecuted) {
                setTimeoutExecuted(true);

                await cancelTicket();
                await cancelOrderChangeremain();
                handleOverTimeShow();
                window.location = "/Ticket/Cart";
            }

        }, 600000);

        console.log(NewTimeID);
        setTimeoutID(NewTimeID);
    }



    useBeforeunload(OrderPass.length !== 0 ? async (event) => {
        if (!timeoutExecuted) {

            event.preventDefault();
            await cancelTicket();
            await cancelOrderChangeremain();
        }
    } : null)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);



    return (
        <Fragment>
            <div className="testpage">
                <div className="bgImg"></div>


                <div className='InfoContainer container'>

                    <div className="d-flex justify-content-center p-5">
                        <div className="title_ticket">
                            購票 - 填寫資料

                        </div>
                    </div>


                    <div className="d-flex justify-content-center">
                        <div className="shoppingSOPbox">
                            <div
                                className="text-light shoppingSOP"
                            >
                                選購
                                <br />
                                票券
                            </div>

                            <div className="linebox">
                                <div className="line"></div>
                            </div>

                            <div
                                className="shoppingSOP bg-warning text-dark "
                            >
                                填寫
                                <br />
                                資料
                            </div>

                            <div className="linebox">
                                <div className="line"></div>
                            </div>

                            <div
                                className="shoppingSOP"
                            >
                                線上
                                <br />
                                付款
                            </div>

                            <div className="linebox">
                                <div className="line"></div>
                            </div>

                            <div
                                className="shoppingSOP"
                            >
                                訂單
                                <br />
                                確認
                            </div>
                        </div>
                    </div>

                    <div className="shoppingInfo">
                        <form action="" >
                            <div className='d-flex justify-content-center pb-4 text-center'>

                                <div className='Timer'>請在 <span id="time">10:00</span> 內完成資料填寫與付款流程，逾時將清除選購票券！</div>
                            </div>

                            <div className='FieldTitle mb-md-4 mb-0'>基本資料</div>

                            <div className="infoField animate__animated animate__fadeInUp">


                                <InputFieldPay
                                    title="訂票人 Email*"
                                    type="email"
                                    name="BuyerEmail"
                                    required={true}
                                    handleChangeEvent={handleChangeEventInfo}
                                    placeholder="請輸入電子郵件"
                                    handleBlurEvent={(e) => {
                                        if (e.target.value.length > 0) {
                                            setIsEmailEmpty(false);
                                            console.log("OK");
                                            const { name, value } = e.target;
                                            console.log(e.target.name);

                                            // 在這裡使用正則表達式進行驗證;
                                            let isValid = true;

                                            const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/; // 電子郵件的正則表達式示例
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
                                    validMessage={isEmailValid ? null : "請輸入有效的電子郵件"}
                                />

                                <InputFieldPay
                                    title="訂票人 姓名*"
                                    type="text"
                                    name="BuyerName"
                                    required={true}
                                    handleChangeEvent={handleChangeEventInfo}
                                    placeholder="請輸入訂票人姓名"
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
                                    errMessage={isNameEmpty ? "姓名不得為空白" : null}
                                    isValid={true}

                                />

                                <InputFieldPay
                                    title="訂票人 電話*"
                                    type="tel"
                                    name="BuyerPhone"
                                    required={true}
                                    handleChangeEvent={handleChangeEventInfo}
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
                                    errMessage={isPhoneEmpty ? "電話不得為空白" : null}
                                    isValid={true}
                                />

                                <InputFieldPay
                                    title="訂票人 身分證*"
                                    type="text"
                                    name="BuyerID"
                                    required={true}
                                    handleChangeEvent={handleChangeEventInfo}
                                    pattern="[A-Z]{1}[0-9]{9}"
                                    placeholder="請輸入身分證字號"
                                    handleBlurEvent={(e) => {
                                        if (e.target.value.length > 0) {
                                            setIsIDEmpty(false);
                                            console.log("OK");
                                            const { name, value } = e.target;
                                            console.log(e.target.name);

                                            // 在這裡使用正則表達式進行驗證;
                                            let isValid = true;

                                            const regex = /^[A-Z][1-2][0-9]{8}$/;
                                            isValid = regex.test(value);
                                            if (!isValid) {
                                                setIsIDValid(false);
                                                console.log("失敗");
                                            } else {
                                                setIsIDValid(true);
                                                console.log("成功");
                                            }
                                        } else {
                                            setIsIDEmpty(true);
                                            console.log("不得為0");
                                        }
                                    }}
                                    isEmpty={isIDEmpty}
                                    errMessage={isIDEmpty ? "身分證字號不得為空白" : null}
                                    isValid={isIDValid}
                                    validMessage="請輸入有效的身分證字號"
                                />


                            </div>

                            <div className="infoField justify-content-center">
                                <div className="FieldTitle">請選擇取票方式</div>

                                <div className="btn-group justify-content-center d-flex"
                                    role="group"
                                    aria-label="Basic radio toggle button group"
                                >

                                    <PickUpButton selectedOption={selectedOption} PickUpHandler={PickUpHandler}></PickUpButton>

                                </div>
                                {
                                    (selectedOption == 'S') ?
                                        <div className="mt-3">

                                            <InputFieldPay
                                                title="取票人 姓名*"
                                                type="text"
                                                name="PickUpName"
                                                required={true}
                                                handleChangeEvent={handleChangeEventInfo}
                                                placeholder="請輸入取票人姓名"
                                                handleBlurEvent={(e) => {
                                                    if (e.target.value.length > 0) {
                                                        setIsPKNameEmpty(false);
                                                        console.log("OK");
                                                    } else {
                                                        setIsPKNameEmpty(true);
                                                        console.log("不得為0");
                                                    }
                                                }}
                                                isEmpty={isPKNameEmpty}
                                                errMessage={isPKNameEmpty ? "姓名不得為空白" : null}
                                                isValid={true}
                                            />

                                            <InputFieldPay
                                                title="取票人 身分證*"
                                                type="text"
                                                name="PickUpID"
                                                required={true}
                                                handleChangeEvent={handleChangeEventInfo}
                                                pattern="[A-Z]{1}[0-9]{9}"
                                                placeholder="請輸入身分證字號"
                                                handleBlurEvent={(e) => {
                                                    if (e.target.value.length > 0) {
                                                        setIsPKIDEmpty(false);
                                                        console.log("OK");
                                                        const { name, value } = e.target;
                                                        console.log(e.target.name);

                                                        // 在這裡使用正則表達式進行驗證;
                                                        let isValid = true;

                                                        const regex = /^[A-Z][1-2][0-9]{8}$/;
                                                        isValid = regex.test(value);
                                                        if (!isValid) {
                                                            setIsPKIDValid(false);
                                                            console.log("失敗");
                                                        } else {
                                                            setIsPKIDValid(true);
                                                            console.log("成功");
                                                        }
                                                    } else {
                                                        setIsPKIDEmpty(true);
                                                        console.log("不得為0");
                                                    }
                                                }}
                                                isEmpty={isPKIDEmpty}
                                                errMessage={isPKIDEmpty ? "身分證字號不得為空白" : null}
                                                isValid={isPKIDValid}
                                                validMessage="請輸入有效的身分證字號"
                                            />
                                        </div> :
                                        null
                                }


                            </div>

                            <div className="infoField">
                                <div className="FieldTitle">購買須知</div>
                                <div className='px-2'>
                                    <ul>
                                        <li>未滿 4 歲的兒童可免費入場，需有家長陪同入場。</li>
                                        <li>下訂時請以「票券使用日」為主，下訂後即無法變更，敬請留意。</li>
                                        <li>訂單一次最高訂購上限為 6 張，每日場次數量為限量販售，售完為止；團體預約請洽 AquaR 官網。</li>
                                        <li>訂單恕不接受部分變更，若需變更入場日及場次請整筆重新下訂。</li>
                                        <li>長者票（博愛票）適用對象：限持有身心障礙證明者、身心障礙者的1位陪同者、孕婦、滿65歲以上長者適用。</li>
                                        <li>本館禁止攜帶外食、寵物，可攜帶開水。</li>
                                        <li>館內提供嬰兒車租借，未提供輪椅租借，敬請旅客見諒。</li>
                                        <li>請務必於訂購時確認訂購之票種是否正確，資格是否符合。</li>
                                        <li>此商品恕無法使用任何折扣券，敬請見諒。</li>
                                        <li>購票時請主動出示相關證件供售票處工作人員驗證，相關證件說明如下：學生票：本人有效學生證正本(若為應屆畢業生則提供當年度正式入學通知單或註冊單及攜帶身分證)。兒童票、長者票（博愛票）：身心障礙證明、孕婦健康手冊、國民身分證或政府核發附有照片、身分證字號及出生年、月、日等足以證明身分證件。
                                        </li>
                                    </ul>
                                </div>
                                <div className="FieldTitle pt-4 pb-1">票券使用規則</div>
                                <div className='ps-2 pe-3'>
                                    <ul>
                                        <li>現場請出示電子票證 QRcode 或紙本票券，憑券入場</li>

                                    </ul>
                                </div>
                                <div className="form-check d-flex justify-content-center py-3">

                                    <div className="p-3">
                                        <input
                                            type="checkbox"
                                            id="AgreetoPay"
                                            className="form-check-input"
                                            onChange={isCheckedHandlerInfo}
                                            required={true}
                                        />
                                        <label htmlFor="AgreetoPay" className="form-check-label fs-6">我已詳閱活動資訊並同意隱私權政策暨資料蒐集處理及利用</label>
                                    </div>

                                </div>

                            </div>

                            <div className="d-flex justify-content-center pb-5">
                                <button
                                    type="button"
                                    className="btn btn-outline-light rounded-0 p-3 animate__animated animate__fadeInUp"
                                    id="PayOnline"
                                    onClick={handleSubmitInfo}
                                >線上付款
                                </button>
                            </div>
                        </form>
                    </div>





                </div>
            </div>


            <Modal show={somethingWrongShow} onHide={handleSomethingWrongClose} className="modalAlert">

                <Modal.Body className="text-center text-dark">發生一些問題，請重新選購！</Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="warning" onClick={handleSomethingWrongClose}
                        className="rounded-0"
                    >
                        確定
                    </Button>

                </Modal.Footer>
            </Modal>


            <Modal show={isNotCompletedShow} onHide={handleIsNotCompletedClose} className="modalAlert">

                <Modal.Body className="text-center text-dark">尚有欄位未填寫完成！</Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="warning" onClick={handleIsNotCompletedClose}
                        className="rounded-0"
                    >
                        確定
                    </Button>

                </Modal.Footer>
            </Modal>

            <Modal show={privacyShow} onHide={handlePrivacyClose} className="modalAlert">

                <Modal.Body className="text-center text-dark">請先勾選隱私同意事項！</Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="warning" onClick={handlePrivacyClose}
                        className="rounded-0"
                    >
                        確定
                    </Button>

                </Modal.Footer>
            </Modal>


            <Modal show={overTimeShow} onHide={handleOverTimeClose} className="modalAlert">

                <Modal.Body className="text-center text-dark">付款時間超過，票券已被清除，請重新選購！</Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="warning" onClick={handleOverTimeClose}
                        className="rounded-0"
                    >
                        確定
                    </Button>

                </Modal.Footer>
            </Modal>



        </Fragment>
    )

}


export default Info;