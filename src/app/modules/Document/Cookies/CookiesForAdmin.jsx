import React, { useState } from "react";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import "../../../../.././node_modules/react-quill/dist/quill.snow.css";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter
} from "../../../.././_metronic/_partials/controls";
import { getCookiePolicy } from "../../.././services/configService";

export const CookiePolicyForAdmin = () => {
  const [bodyText, setBodyText] = useState("");
  useEffect(() => {
    getCookiePolicy()
      .then((data) => data.json())
      .then((data) => {
        let htmlContent  = atob(data.result.base64Content);
        setBodyText(htmlContent);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Card className="h-100" style = {{marginTop : "-40px"}}>
        <CardHeader title={`Cookie Policy`}></CardHeader>
        <CardBody>
          <ReactQuill
            theme="snow"
            placeholder="Write something...!"
            className="h-450px"
            value={bodyText}
          />
        </CardBody>
        <CardFooter className="text-right" style={{marginTop : 45}}>
        </CardFooter>
      </Card>
    </>
  );
};
