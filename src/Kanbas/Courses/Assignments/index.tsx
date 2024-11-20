import { BsGripVertical, BsPlus } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { GiNotebook } from "react-icons/gi";
import { IoEllipsisVertical } from "react-icons/io5";
import { useNavigate, useParams } from "react-router";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment, setAssignments} from "./reducer";
import * as courseClient from "../client";
import * as assignmentsClient from "./client"
import { HiMagnifyingGlass } from "react-icons/hi2";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useEffect } from "react";
export default function Assignments() {
  const { cid } = useParams();
  const assignments = useSelector((state: any) => 
    state.assignmentsReducer.assignments.filter(
        (assignment: any) => assignment.course === cid
    )
);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchAssignments = async () => {
    const assignments = await courseClient.findAssignmentsForCourse(cid as string)
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  },[])
  const handleAddAssignmentClick = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments/new`); 
  };

  const deleteButton = async (assignmentId: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      await assignmentsClient.deleteAssignment(assignmentId);
        dispatch(deleteAssignment(assignmentId));
    }
};
  return (
    <div id="wd-assignments" className="text-nowrap">
    <div id="wd-modules-controls" className="text-nowrap">
      {isFaculty && (
        <>
      <button id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end"
      onClick={handleAddAssignmentClick}>
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment</button>
      <div className="dropdown d-inline me-1 float-end">
        <button id="wd-publish-all-btn" className="btn btn-lg btn-secondary"
          type="button" >
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Group</button>

      </div>
      </>
      )}
      {/* Implement the View Progress and Collapse All buttons with IDs wd-view-progress and wd-collapse-all */}
      <div
        className="me-1"
        style={{ position: 'relative', display: 'inline-block' }}
      >
        <HiMagnifyingGlass
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none', // Optional: allows clicks to pass through the icon
            color: '#aaa', // Optional: change icon color
          }}
        />
        <input
          id="wd-search-assignment"
          className="form-control form-control-lg"
          placeholder="Search..."
          style={{
            paddingLeft: '35px', // Space for the icon
          }}
        />
      </div>

    </div>
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
          {isFaculty && (
            <>
          <BsPlus className="fs-4 me-2" />
          <IoEllipsisVertical className="fs-4" />
          </>
          )}
        </div>
      </div>

      <ul className="wd-lessons list-group rounded-0">
        {assignments
        // .filter(
        //   (assignment:any) => assignment.course === cid
        // )
        .map((assignment:any) => (
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
            {isFaculty && (
            <>
                <div className="float-end">
                <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteButton(assignment._id)}/>
                <GreenCheckmark />
                <IoEllipsisVertical className="fs-4" />
              </div>
            </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
