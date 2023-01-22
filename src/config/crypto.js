var CryptoJS = require("crypto-js");

 
const encode = (data) =>{
    return CryptoJS.AES.encrypt(JSON.stringify(data), String(process.env.REACT_APP_KEY_CRYPTO)).toString();
}

const decode = (data) =>{   
    let bytes = CryptoJS.AES.decrypt(data, String(process.env.REACT_APP_KEY_CRYPTO));  
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

export {
    encode,
    decode
}