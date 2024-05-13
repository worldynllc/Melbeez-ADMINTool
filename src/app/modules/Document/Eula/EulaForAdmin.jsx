import React, { useState } from "react";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import "../../../../.././node_modules/react-quill/dist/quill.snow.css";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "../../../.././_metronic/_partials/controls";
import { getEulaPolicy } from "../../.././services/configService";

export const EulaForAdmin = () => {
  const [bodyText, setBodyText] = useState("");
  useEffect(() => {
    getEulaPolicy()
      .then((data) => data.json())
      .then((data) => {
        let htmlContent  = atob(data.result.base64Content);
        setBodyText(htmlContent);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Card style = {{marginTop : "-40px"}}>
        <CardHeader title={`Eula`}></CardHeader>
        <CardBody>
          <ReactQuill
            theme="snow"
            placeholder="Write something...!"
            className="h-400px"
            value={bodyText}
          />
        </CardBody>
        <CardFooter className="text-right" style={{marginTop : 45}}>
        </CardFooter>
      </Card>
    </>
  );
};
