import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { useMediaQuery } from "react-responsive";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function TicketType({ TicketContent, disabled, AvailableCheck2 }) {

    const [Count, setCount] = useState(0);
    const [checked, setChecked] = useState(false);
    const [noTicketshow, setNoTicketShow] = useState(false);
    const handleNoTicketShow = () => setNoTicketShow(true);
    const handleNoTicketClose = () => setNoTicketShow(false);
    const [chooseTicketTypeshow, setChooseTicketTypeshow] = useState(false);
    const handlechooseTicketTypeshow = () => setChooseTicketTypeshow(true);
    const handlechooseTicketTypeClose = () => setChooseTicketTypeshow(false);

    const Minus = () => {

        if (checked === false) {
            handlechooseTicketTypeshow();
        }
        else {
            let NewCount = Count - 1;

            if (NewCount < 0) {
                NewCount = 0;
            }

            setCount(NewCount);
        }
    }


    const Increment = async () => {

        if (checked === false) {
            handlechooseTicketTypeshow();
        }
        else {


            let isAvailable = await AvailableCheck2(true);

            if (isAvailable) {

                let NewCount = Count + 1;

                if (NewCount > 15) {
                    NewCount = 15;
                }

                setCount(NewCount);
            } else {
                handleNoTicketShow();
            }


        }
    }

    const AutoTicketCount = (e) => {

        if (checked === false) {
            handlechooseTicketTypeshow();

        } else {

            let NewCount = parseInt(e.target.value);

            if (NewCount < 0) {
                NewCount = 0;
            } else if (NewCount > 15) {
                NewCount = 15;
            }

            setCount(NewCount);
        }

    }

    useEffect(() => {
        if (disabled) {
            let NewCount = 0;
            setCount(NewCount);
        }

        if (!checked) {
            let NewCount = 0;
            setCount(NewCount);
        }
    }, [disabled, checked]);



    const CheckIfItsNaN = (e) => {
        let NewCount = isNaN(e.target.value) ? 0 : parseInt(e.target.value);
        setCount(NewCount);
    }


    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    return (
        <Fragment>

            {(isMobile === false) ?

                (<div className="card1 mt-3" key={TicketContent.id}>
                    <div className="d-flex row mx-0 align-items-center">

                        <div className="col-3 CartListText d-flex form-check align-items-center">


                            <input type="checkbox" className="flex-grow-0 form-check-input" id={`${TicketContent.Label}Ticket`}
                                onChange={(e) => setChecked(e.target.checked)}

                                checked={checked} disabled={disabled} />

                            <div className="flex-grow-1">
                                <label htmlFor={`${TicketContent.Label}Ticket`}>
                                    <div className=' normalEntry'>
                                        一般入館
                                    </div>
                                    <div className="fw-semibold TicketName">
                                        {TicketContent.Name}
                                    </div>
                                </label>
                            </div>



                        </div>

                        <div className="col-3 CartListText ps-0" id={`${TicketContent.Label}Ticket_Price`}>
                            {`TWD $${TicketContent.TicketPrice}`}
                        </div>


                        <div className="col-3 d-flex justify-content-center pe-0">

                            <button className="btn btn-light  CartBtn CartListText"
                                id={`${TicketContent.Label}TicketMinus`}
                                onClick={Minus}
                                disabled={disabled}
                            >-</button>

                            <input className="CartCount CartListText hide-arrows  InputValueforTicket"
                                value={Count} type="number" min="0" max="15"
                                id={`${TicketContent.Label}Ticket_Count`}
                                onChange={AutoTicketCount}
                                onBlur={CheckIfItsNaN}
                                disabled={disabled} />

                            <button className="btn btn-light CartBtn CartListText"
                                id={`${TicketContent.Label}TicketPlus`}
                                onClick={Increment}
                                disabled={disabled}
                            >+</button>

                        </div>

                        <div className="col-3 CartListText pe-0" id={`${TicketContent.Label}Ticket_priceAmount`}>

                            {`TWD $${isNaN(Count) ? 0 : Count * TicketContent.TicketPrice}`}

                        </div>

                    </div>


                </div>)

                :

                (<div className="card1 mt-3" key={TicketContent.id}>
                    <div className="d-flex row mx-0 align-items-center justify-content-center">


                        <div className='row align-items-center justify-content-center'>
                            <div className="col-7 CartListText d-flex form-check align-items-center">

                                <input type="checkbox" className="flex-grow-0 form-check-input" id={`${TicketContent.Label}Ticket`}
                                    onChange={(e) => setChecked(e.target.checked)}
                                    checked={checked} disabled={disabled} />

                                <div className="flex-grow-1">
                                    <label htmlFor={`${TicketContent.Label}Ticket`}>
                                        <div className='px-2 normalEntry'>
                                            一般入館
                                        </div>
                                        <div className="fw-semibold TicketName">
                                            {TicketContent.Name}
                                        </div>
                                    </label>
                                </div>

                            </div>

                            <div className="col-5 d-flex justify-content-center align-items-center">

                                <div className="d-flex justify-content-center align-items-center">
                                    <button className="btn btn-light  CartBtn CartListText"
                                        id={`${TicketContent.Label}TicketMinus`}
                                        onClick={Minus}
                                        disabled={disabled}
                                    >-</button>

                                    <input className="CartCount CartListText hide-arrows  InputValueforTicket"
                                        value={Count} type="number" min="0" max="15"
                                        id={`${TicketContent.Label}Ticket_Count`}
                                        onChange={AutoTicketCount}
                                        onBlur={CheckIfItsNaN}
                                        disabled={disabled} />

                                    <button className="btn btn-light CartBtn CartListText"
                                        id={`${TicketContent.Label}TicketPlus`}
                                        onClick={Increment}
                                        disabled={disabled}
                                    >+</button>
                                </div>
                            </div>

                        </div>
                        <div className='row align-items-center justify-content-center d-flex'>
                            <div className="col-7 CartListText text-center" id={`${TicketContent.Label}Ticket_Price`}>
                                {`TWD $${TicketContent.TicketPrice}`}
                            </div>

                            <div className="col-5 CartListText text-center" id={`${TicketContent.Label}Ticket_priceAmount`}>

                                {`小計 TWD $${isNaN(Count) ? 0 : Count * TicketContent.TicketPrice}`}

                            </div>
                        </div>
                    </div>
                </div>)
            }

            <Modal show={chooseTicketTypeshow} onHide={handlechooseTicketTypeClose} className="modalAlert rounded-0">

                <Modal.Body className="text-center text-dark">請勾選票券種類！</Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="warning" onClick={handlechooseTicketTypeClose}
                        className="rounded-0"
                    >
                        確定
                    </Button>

                </Modal.Footer>
            </Modal>


            <Modal show={noTicketshow} onHide={handleNoTicketClose} className="modalAlert">

                <Modal.Body className="text-center text-dark">票券已無所選數量！</Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="warning" onClick={() => setNoTicketShow(false)}
                        className="rounded-0"
                    >
                        確定
                    </Button>

                </Modal.Footer>
            </Modal>


        </Fragment>
    )
}



export default TicketType;