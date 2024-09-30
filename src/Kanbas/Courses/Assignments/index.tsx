import { BsGripVertical, BsPlus } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { IoMdArrowDropdown } from "react-icons/io";
import { GiNotebook } from "react-icons/gi";
import { IoEllipsisVertical } from "react-icons/io5";
import Assignmentscontrol from "./Assignmentscontrol";

export default function Assignments() {
  return (
    <div id="wd-assignments" className="text-nowrap">
      <Assignmentscontrol /><br /><br />

      <li className="wd-title list-group-item p-0 mb-5 fs-5 border-gray">
        <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
          <BsGripVertical className="me-2 fs-3" />
          <IoMdArrowDropdown className="me-2 fs-3" />
          <span className="fw-bold">ASSIGNMENTS</span>

          <div className="float-end ms-auto d-flex align-items-center">
            <p
              className="wd-rounded-corners-all-around wd-border-solid m-0"
              style={{
                display: "inline-block",
                padding: "2px 6px",
                marginRight: "10px",
              }}
            >
              40% of Total
            </p>
            <BsPlus className="fs-4 me-2" />
            <IoEllipsisVertical className="fs-4" />
          </div>
        </div>

        <ul className="wd-lessons list-group rounded-0">
          <li className="wd-lesson list-group-item d-flex align-items-center p-3 ps-1" style={{ color: "grey" }}>
            <BsGripVertical className="me-2 fs-3" />
            <GiNotebook className="me-2 fs-3" style={{ color: "green" }} />
            <div className="flex-grow-1">
              <a className="wd-assignment-link fw-bold" href="#/Kanbas/Courses/1234/Assignments/123" style={{
        color: 'black',       
        textDecoration: 'none' 
      }}>A1</a>
              <br />
              <span style={{ color: "red" }}>Multiple Modules</span> | <b>Not available until</b> May 6 at 12:00am |
              <br />
              <b>Due</b> May 13 at 11:59pm | 100 pts
            </div>
            <LessonControlButtons />
         </li>


         <li className="wd-lesson list-group-item d-flex align-items-center p-3 ps-1" style={{ color: "grey" }}>
            <BsGripVertical className="me-2 fs-3" />
            <GiNotebook className="me-2 fs-3" style={{ color: "green" }} />
            <div className="flex-grow-1">
              <a className="wd-assignment-link fw-bold" href="#/Kanbas/Courses/1234/Assignments/123" style={{
        color: 'black',       
        textDecoration: 'none' 
      }}>A2</a>
              <br />
              <span style={{ color: "red" }}>Multiple Modules</span> | <b>Not available until</b> May 13 at 12:00am |
              <br />
              <b>Due</b> May 20 at 11:59pm | 100 pts
            </div>
            <LessonControlButtons />
          </li>

          <li className="wd-lesson list-group-item d-flex align-items-center p-3 ps-1" style={{ color: "grey" }}>
            <BsGripVertical className="me-2 fs-3" />
            <GiNotebook className="me-2 fs-3" style={{ color: "green" }} />
            <div className="flex-grow-1" >
              <a className="wd-assignment-link fw-bold" href="#/Kanbas/Courses/1234/Assignments/123" style={{
        color: 'black',       
        textDecoration: 'none' 
      }}>A3</a>
              <br />
              <span style={{ color: "red" }}>Multiple Modules</span> | <b>Not available until</b> May 20 at 12:00am |
              <br />
              <b>Due</b> May 27 at 11:59pm | 100 pts
            </div>
            <LessonControlButtons />
          </li>
        </ul>
      </li>
    </div>
  );
}
