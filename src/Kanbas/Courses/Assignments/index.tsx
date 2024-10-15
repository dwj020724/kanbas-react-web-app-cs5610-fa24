import { BsGripVertical, BsPlus } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { IoMdArrowDropdown } from "react-icons/io";
import { GiNotebook } from "react-icons/gi";
import { IoEllipsisVertical } from "react-icons/io5";
import Assignmentscontrol from "./Assignmentscontrol";
import { useParams } from "react-router";
import * as db from "../../Database";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments.filter(
    (assignment) => assignment.course === cid
  );

  return (
    <div id="wd-assignments" className="text-nowrap">
      <Assignmentscontrol />
      <br />
      <br />

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
        {assignments.map((assignment) => (
          <li
            key={assignment._id}
            className="wd-lesson list-group-item d-flex align-items-center p-3 ps-1"
            style={{ color: "grey" }}
          >
            <BsGripVertical className="me-2 fs-3" />
            <GiNotebook className="me-2 fs-3" style={{ color: "green" }} />
            <div className="flex-grow-1">
              <a
                className="wd-assignment-link fw-bold"
                href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
              >
                {assignment.title}
              </a>
              <br />
              <span style={{ color: "red" }}>Multiple Modules</span> |{" "}
              <b>Not available until</b> {assignment.available_date} |
              <br />
              <b>Due</b> {assignment.due_date} | {assignment.points} pts
            </div>
            <LessonControlButtons />
          </li>
        ))}
      </ul>
    </div>
  );
}
