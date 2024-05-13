import React, { useState } from "react";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import "../../../../.././node_modules/react-quill/dist/quill.snow.css";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "../../../.././_metronic/_partials/controls";
import { reqPrivacyPolicy } from "../../../services/configService";

export const PrivacyforAdmin = () => {
  const [bodyText, setBodyText] = useState("");
  useEffect(() => {
    reqPrivacyPolicy()
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
      <CardHeader title="Privacy Policy"></CardHeader>
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
