import React from "react";
import classes from "./Student.module.css";
import { Button } from "antd";
import "./Student.module.css";
import { Link } from "react-router-dom";

const MainStudentPage: React.FC = (props: any) => {
  return (
    <div className={classes.Main}>
      <div className={classes.buttonWrapper}>
        <Link to={`/student/submit`}>
          <Button size="large">Cross-Check: Submit</Button>
        </Link>
        <Link to={`/student/review`}>
          <Button size="large">Cross-Check: Review</Button>
        </Link>
      </div>
    </div>
  );
};

export default MainStudentPage;
