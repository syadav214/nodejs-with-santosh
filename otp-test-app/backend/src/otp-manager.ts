interface otpInterface {
    phoneNumber: String,
    otp: number,
    createdAt: number
}

interface otpValidate {
    valid: boolean,
    msg: string
}

const map = new Map();
const expireInSec: number = 60;

function getRandom(): number {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCurrentTimeStamp(): number {
    return Math.floor(Date.now() / 1000);
}

export function generateOTP(phoneNumber: String): otpInterface {
    if (map.has(phoneNumber)) {
        const existingOtpObj: otpInterface = map.get(phoneNumber);
        const currentTime: number = getCurrentTimeStamp();
        if (currentTime <= existingOtpObj.createdAt + expireInSec) {
            return map.get(phoneNumber);
        }
    }

    const otpObj: otpInterface = {
        phoneNumber: phoneNumber,
        otp: getRandom(),
        createdAt: getCurrentTimeStamp()
    }
    map.set(phoneNumber, otpObj);
    return otpObj;
}

export function validatedOTP(phoneNumber: String, otp: number): otpValidate {
    const otpValid: otpValidate = {
        valid: false,
        msg: "OTP expired."
    }
    if (map.has(phoneNumber)) {
        const existingOtpObj: otpInterface = map.get(phoneNumber);
        const currentTime: number = getCurrentTimeStamp();

        if (currentTime <= existingOtpObj.createdAt + expireInSec
            && existingOtpObj.otp === otp
        ) {
            otpValid.valid = true;
            otpValid.msg = "OTP valid for the phone number"
        } else {
            map.delete(phoneNumber);
        }
    }
    return otpValid;
}

