import { Link } from "react-router-dom";
import React, { useState } from "react";
import * as db from "./Database";
import { useDispatch, useSelector } from "react-redux";
import { enrollInCourse, unenrollFromCourse } from "./Courses/Enrollment/reducer";

export default function Dashboard({ courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse }: {
  courses: any[]; course: any; setCourse: (course: any) => void;
  addNewCourse: () => void; deleteCourse: (course: any) => void;
  updateCourse: () => void; }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
    const isFaculty = currentUser?.role === "FACULTY";
    const isStudent = currentUser?.role === "STUDENT";
    const [showAllCourses, setShowAllCourses] = useState(false);
    const dispatch = useDispatch();

    

    const isEnrolled = (courseId: any) =>
      enrollments.some(
        (enrollment: any) =>
          enrollment.user === currentUser._id && enrollment.course === courseId
      );

      const handleEnroll = (courseId: string) => {
        console.log('Enrolling in course:', courseId);
        dispatch(enrollInCourse({ userId: currentUser._id, courseId }));
      };
      
      const handleUnenroll = (courseId: string) => {
        console.log('Unenrolling from course:', courseId);
        dispatch(unenrollFromCourse({ userId: currentUser._id, courseId }));
      };
      
    
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <input
            defaultValue={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            defaultValue={course.description}
            className="form-control"
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}


      {isStudent && (
            <button
              className="btn btn-primary float-end"
              id="wd-enrollments-toggle"
              onClick={() => setShowAllCourses(!showAllCourses)}
            >
              Enrollments
            </button>
          )}

           <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>{" "}
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses
            .filter((course) => {
              if (isFaculty) {
                return true;
              } else if (isStudent) {
                if (showAllCourses) {
                  return true;
                } else {
                  return isEnrolled(course._id);
                }
              } else {
                return false;
              }
            })
            .map((course) => (
              <div
                key={course._id}
                className="wd-dashboard-course col"
                style={{ width: "300px" }}
              >
                <div className="card rounded-3 overflow-hidden">
                  <Link
                    to={
                      isStudent && !isEnrolled(course._id)
                        ? "#"
                        : `/Kanbas/Courses/${course._id}/Home`
                    }
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <img src={course.pic} width="100%" height={160} />
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        {course.name}{" "}
                      </h5>
                      <p
                        className="wd-dashboard-course-title card-text overflow-y-hidden"
                        style={{ maxHeight: 100 }}
                      >
                        {course.description}{" "}
                      </p>
                      {isStudent && isEnrolled(course._id) && (
                        <button className="btn btn-primary">Go</button>
                      )}
                    
                    {isFaculty && (
                        <>
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              deleteCourse(course._id);
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </>
                      )}
{isStudent && (
                        <>
                          {isEnrolled(course._id) ? (
                            <button
                              className="btn btn-danger ms-2"
                              onClick={(event) => {
                                event.preventDefault();
                                handleUnenroll(course._id);
                              }}
                            >
                              Unenroll
                            </button>
                          ) : (
                            <button
                              className="btn btn-success ms-2"
                              onClick={(event) => {
                                event.preventDefault();
                                handleEnroll(course._id);
                              }}
                            >
                              Enroll
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
