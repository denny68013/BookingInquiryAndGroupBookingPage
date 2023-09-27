import React from "react";

function InputField(props) {
  return (
    <div className="animate__animated animate__fadeInUp">
      <div className="row inputForm mb-5">
        <div className="col-12 col-md-6 text-center text-md-start">
          <label htmlFor="nameInput" className="d-inline-block">
            {props.title}
          </label>
        </div>
        <div className="col-12 col-md-6 text-center text-md-start">
          <input
            type={props.type}
            className="border-0 border-bottom d-inline-block bookingInquiryInput text-center"
            id={props.name + "input"}
            name={props.name}
            required
            onChange={props.handleChangeEvent}
            min={props.minNum}
            placeholder={props.placeholder}
            onBlur={props.handleBlurEvent}
          />

          {props.isEmpty ? (
            <div className="isEmptyText mb-0 animate__animated  animate__flash">
              {props.errMessage}
            </div>
          ) : null}
          {props.isValid ? null : (
            <div className="isEmptyText mb-0 animate__animated  animate__flash">
              {props.validMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InputField;
