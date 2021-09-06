import React, { useState } from "react";
import { apiRequest } from "./apiHelpers";
import "./App.css";

function App() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpText, setOtpText] = useState("");
  const [otpState, setOtpState] = useState({
    otpGenerated: false,
    otpValidated: false,
  });

  const onPhoneEnter = (e: any) => {
    setPhoneNumber(e.target.value);
  };

  const onOTPEnter = (e: any) => {
    setOtpText(e.target.value);
  };

  const generateOtp = async () => {
    const res = await apiRequest({
      url: `${process.env.REACT_APP_API_URL}/generate-otp/${phoneNumber}`,
      method: "GET",
    });
    if (res && res.status === 200) {
      console.log(res);
      const existObj = { ...otpState };
      existObj.otpGenerated = true;
      setOtpState(existObj);
    }
  };

  const validateOtp = async () => {
    const res = await apiRequest({
      url: `${process.env.REACT_APP_API_URL}/validate-otp/${phoneNumber}/${otpText}`,
      method: "GET",
    });
    if (res && res.status === 200) {
      const data = res.data;
      if (data.valid) {
        setPhoneNumber("");
        setOtpText("");
        const existObj = { ...otpState };
        existObj.otpValidated = true;
        existObj.otpGenerated = false;
        setOtpState(existObj);
        alert("OTP Validated.");
      } else {
        alert("Incorrect OTP.");
      }
    } else {
      alert("Error.");
    }
  };

  return (
    <div className="App">
      {otpState.otpGenerated === false ? (
        <>
          <label>Enter your phone number to sign in:</label>
          <br />
          <input
            type="text"
            value={phoneNumber}
            onChange={onPhoneEnter}
          ></input>
          <br />
          <button type="button" className="signIn" onClick={generateOtp}>
            Sign In!
          </button>
        </>
      ) : (
        <>
          <label>Enter OTP:</label>
          <br />
          <input type="text" value={otpText} onChange={onOTPEnter}></input>
          <br />
          <button type="button" className="signIn" onClick={validateOtp}>
            Validate Otp!
          </button>
        </>
      )}
    </div>
  );
}

export default App;
