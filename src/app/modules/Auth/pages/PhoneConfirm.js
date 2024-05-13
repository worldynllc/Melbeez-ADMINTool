import React, { useState, useEffect } from "react";
import logoImg from "./logos/loginLogo.png";
import useSearchParams from "use-search-params";
import { Card } from '@material-ui/core';

export default function PhoneConfirm() {
  const decodeUriComponent = require('decode-uri-component');
  const [searchParams, setSearchParams] = useSearchParams();
  setSearchParams.get()
  
  var fields = (decodeUriComponent(searchParams)).split('&');
  let phonefromurl = fields[0];
  let codeFromurl = fields[1];
  let userType = fields[2];
  
  phonefromurl = phonefromurl && phonefromurl.substr(12,);
  codeFromurl = codeFromurl && codeFromurl.substr(5,);
  userType = userType && userType.substr(7,);


  
  const [errorMessage, setErrorMessage] = useState('');
 
  useEffect(()=> {
    const reqoption = {
      method: "GET",
      headers: { "Content-Type": "application/json", "melbeez-platform": "AdminPortal", },
    };
    fetch(
      `${process.env.REACT_APP_API_URL}/api/user/phone/verify?PhoneNumber=${phonefromurl}&Code=${codeFromurl}&IsUser=${userType}`,
      reqoption
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (result.result == true) {
          setErrorMessage(<h4><img src="https://www.nicepng.com/png/detail/262-2627516_clipart-cross-tick-green-tick-png-icon.png" alt="img" style={{width: "30px", height: "30px"}} /> &nbsp; &nbsp;Phone verification has been done successfully.</h4>)   
        }
        else {
          setErrorMessage(<div className="text-danger text-center mb-5"><h4><img src="https://png.monster/wp-content/uploads/2022/01/png.monster-456-370x280.png" alt="img" style={{ width: "30px", height: "30px" }} />Phone Verification Failed Re-try with New Link</h4></div>)
        }
      })
      .catch((error) => {
        console.log({ error });
      })
    } ,[])

    return (
        <>
             <div style={{marginTop: "90px"}} className="container  col-5"> 
                <img className="d-block mx-auto img-fluid w-50 mb-20" src={logoImg} alt="" />
                <h2 className='text-center' >Thank You </h2>
                <br />
                <Card className='container'>
                    <div className="text-center">
                        <br />
                        {errorMessage && <div className="text-center mb-5"> {errorMessage} </div>}
                        <br />
                    </div>
                </Card>
            </div>
        </>
    )
}
