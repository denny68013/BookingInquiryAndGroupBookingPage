import React from 'react';

function SessionButton(props) {
    return (
        <>


            <div className="col-md-8 col-12 justify-content-center d-flex">
                <div className=''>
                    <div className="fw-semibold mb-2 mt-4 mt-md-0 Cart_date_title ">選擇場次時間</div>


                    <div className='row'>


                        <div className='col-12 col-md-4 justify-content-center d-flex'>

                            <input
                                type="radio"
                                className="btn-check"
                                name="ChooseSession"
                                checked={props.disabledSession.nine ? false : (props.selectedSessionOption === '9' ? true : false)}
                                id="AM9"
                                disabled={props.disabledSession.nine}
                                value="9"
                                autoComplete="off"
                                onChange={props.SessionHandler}
                            />
                            <label className="btn btn-outline-light btn-session" htmlFor="AM9">9:00</label>

                        </div>

                        <div className='col-12 col-md-4 justify-content-center d-flex'>

                            <input
                                type="radio"
                                className="btn-check"
                                name="ChooseSession"
                                checked={props.disabledSession.twelve ? false : (props.selectedSessionOption === '12' ? true : false)}
                                id="PM12"
                                disabled={props.disabledSession.twelve}
                                value="12"
                                autoComplete="off"
                                onChange={props.SessionHandler} />
                            <label className="btn btn-outline-light btn-session" htmlFor="PM12">12:00</label>

                        </div>

                        <div className='col-12 col-md-4 justify-content-center d-flex'>

                            <input
                                type="radio"
                                className="btn-check"
                                name="ChooseSession"
                                checked={props.disabledSession.fifteen ? false : (props.selectedSessionOption === '15' ? true : false)}
                                id="PM15"
                                disabled={props.disabledSession.fifteen}
                                value="15"
                                autoComplete="off"
                                onChange={props.SessionHandler} />
                            <label className="btn btn-outline-light btn-session" htmlFor="PM15">15:00</label>

                        </div>

                    </div>




                </div>
            </div>
        </>

    );
}

export default SessionButton;
