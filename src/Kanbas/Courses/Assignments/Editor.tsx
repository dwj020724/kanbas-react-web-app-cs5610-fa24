import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import * as db from "../../Database";
export default function AssignmentEditor() {
  const { pathname } = useLocation();
  const assignment_id = pathname.split("/").filter(Boolean).pop();
  const { cid } = useParams();
  const assignments = db.assignments.filter(
    (assignment) => assignment.course === cid
  );
    return (
      <div id="wd-assignments-editor">
        {assignments
        .filter((assignment: any) => assignment._id === assignment_id)
        .map((assignment) => (
        <><div className="mb-3">

            <label htmlFor="wd-assignment-name" className="form-label">
              Assignment Name</label>
            <input id="wd-assignment-name" className="form-control"
              value={assignment.title} />
          </div><div className="mb-3">
              <textarea className="form-control" id="wd-description"
                rows={10} value={assignment.description}></textarea>
            </div><div className="row mb-3">
              <label htmlFor="wd-points" className="col-sm-2 col-form-label">
                Points
              </label>
              <div className="col-sm-10">
                <input className="form-control" id="wd-points" value={assignment.points} />
              </div>
            </div><div className="row mb-3">
              <label htmlFor="wd-points" className="col-sm-2 col-form-label">
                Assignment Group
              </label>
              <div className="col-sm-10">
                <select className="form-select">
                  <option selected>ASSIGNMENTS</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div><div className="row mb-3">
              <label htmlFor="wd-points" className="col-sm-2 col-form-label">
                Display Grade as
              </label>
              <div className="col-sm-10">
                <select className="form-select">
                  <option selected>Percentage</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div><fieldset className="row mb-3">
              <legend className="col-form-label col-sm-2 pt-0">
                Submission Type</legend>
              <div
                className="col-sm-10 wd-rounded-corners-all-around wd-padding-fat"
                style={{
                  border: "1px solid #c3c3c3", 
                  borderRadius: "6px", 
                  padding: "20px", 
                  color: "grey"
                }}
              >
                <select className="form-select" id="wd-submission-type">
                  <option selected>Online</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <br />
                <label style={{ color: "black" }}><b>Online Entry Option</b></label>
                <br /><br />
                <div className="form-check" style={{ color: "black" }}>
                  <input className="form-check-input" type="checkbox"
                    name="gridcheckbox" id="wd-text-entry" value="option1" />
                  <label className="form-check-label" htmlFor="wd-text-entry">
                    Text Entry </label>
                </div>
                <div className="form-check" style={{ color: "black" }}>
                  <input className="form-check-input" type="checkbox"
                    name="gridcheckbox" id="wd-website-url" value="option2" />
                  <label className="form-check-label" htmlFor="wd-website-url">
                    Website URL </label>
                </div>
                <div className="form-check" style={{ color: "black" }}>
                  <input className="form-check-input" type="checkbox"
                    name="gridcheckbox" id="wd-media-recordings" value="option3" />
                  <label className="form-check-label" htmlFor="wd-media-recordings">
                    Media Recording </label>
                </div>
                <div className="form-check" style={{ color: "black" }}>
                  <input className="form-check-input" type="checkbox"
                    name="gridcheckbox" id="wd-student-annotation" value="option4" />
                  <label className="form-check-label" htmlFor="wd-student-annotation">
                    Student Annotation </label>
                </div>
                <div className="form-check" style={{ color: "black" }}>
                  <input className="form-check-input" type="checkbox"
                    name="gridcheckbox" id="wd-file-upload" value="option3" />
                  <label className="form-check-label" htmlFor="wd-file-upload">
                    File Upload </label>
                </div>
              </div>
            </fieldset><fieldset className="row mb-3">
              <legend className="col-form-label col-sm-2 pt-0">
                Assign
              </legend>
              <div
                className="col-sm-10 wd-rounded-corners-all-around wd-padding-fat"
                style={{
                  border: "1px solid #c3c3c3", // Adjust the border color to match the image
                  borderRadius: "6px", // Adjust the radius for rounded corners
                  padding: "20px", // Adjust the padding if needed
                }}
              >
                <label style={{ color: "black" }}>
                  <b>Assign to</b>
                </label>
                <div className="input-group mb-3">
                  <input
                    id="wd-assign-to"
                    value={"Everyone"}
                    className="form-control" />
                </div>

                <label style={{ color: "black" }}>
                  <b>Due</b>
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={assignment.due_date}
                  id="wd-due-date" />
                <br />

                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="wd-available-from">
                      <b>Available from</b>
                    </label>
                    <input
                      type="datetime-local"
                      id="wd-available-from"
                      value={assignment.available_date}
                      className="form-control" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="wd-available-until">
                      <b>Until</b>
                    </label>
                    <input
                      type="datetime-local"
                      id="wd-available-until"
                      value="2024-05-20T12:00"
                      className="form-control" />
                  </div>
                </div>
              </div>
            </fieldset>
            <hr />
    <div className="float-end mt-3">
        <Link
          id="wd-cancel-assignment-btn"
          className="btn btn-lg btn-secondary me-2"
          to={`/Kanbas/Courses/${cid}/Assignments`}
        >
          Cancel
        </Link>
        <Link
          id="wd-save-assignment-btn"
          className="btn btn-lg btn-danger"
          to={`/Kanbas/Courses/${cid}/Assignments`}
        >
          Save
        </Link>
    </div>
            </>
    ))}


    </div>
    
);}
