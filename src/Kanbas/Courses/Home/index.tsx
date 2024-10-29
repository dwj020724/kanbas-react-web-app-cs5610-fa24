import Modules from "../Modules";
import CourseStatus from "./Status";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { courses } from "../../Database";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
export default function Home() {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  return (
<div className="d-flex" id="wd-home">
<div className="flex-fill">
  
          <Modules />
          </div>
          <div className="d-none d-md-block">
          {isFaculty && (<CourseStatus />)}
          </div>
</div>

  );
}
