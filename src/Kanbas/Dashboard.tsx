import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as courseClient from "./Courses/client";
import * as enrollmentClient from "./Courses/Enrollment/client";
import {
  enrollInCourse,
  unenrollFromCourse,
  setEnrollments,
} from "./Courses/Enrollment/reducer";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const isStudent = currentUser?.role === "STUDENT";
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [allCourses, setAllCourses] = useState([] as { _id: string }[]);
  const [enrolledCourses, setEnrolledCourses] = useState([] as { _id: string }[]);
  const dispatch = useDispatch();

  const fetchAllCourses = async () => {
    try {
      const courses = await courseClient.fetchAllCourses();
      setAllCourses(courses);
    } catch (error) {
      console.error("Error fetching all courses:", error);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const enrollments = await enrollmentClient.findAllEnrollments();
      dispatch(setEnrollments(enrollments));
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  };

  useEffect(() => {
    fetchAllCourses();
    fetchEnrollments();
  }, []);

  useEffect(() => {
    console.log("Enrollments state changed:", enrollments);
    if (isStudent && enrollments.length && allCourses.length) {
      const userEnrollments = enrollments.filter(
        (enrollment: any) => enrollment.user === currentUser._id
      );
      const enrolledCourseIds = userEnrollments.map((enrollment: any) => enrollment.course);
      const enrolledCoursesList = allCourses.filter((course: { _id: string }) =>
        enrolledCourseIds.includes(course._id)
      );
      setEnrolledCourses(enrolledCoursesList);
    } else if (!isStudent) {
      setEnrolledCourses([]);
    }
  }, [enrollments, allCourses, currentUser, isStudent]);

  const isEnrolled = (courseId: string) => {
    const enrolled = enrollments.some(
      (enrollment: { user: string; course: string }) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );
    return enrolled;
  };

  const handleEnroll = async (courseId: string) => {
    console.log("Enrolling in course:", courseId);
    try {
      const enrollment = await enrollmentClient.enrollStudentInCourse(
        currentUser._id,
        courseId
      );
      console.log("Enrollment received:", enrollment);
      dispatch(enrollInCourse(enrollment));
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  const handleUnenroll = async (courseId: string) => {
    console.log("Unenrolling from course:", courseId);
    try {
      await enrollmentClient.unenrollStudentFromCourse(currentUser._id, courseId);
      dispatch(unenrollFromCourse({ userId: currentUser._id, courseId }));
    } catch (error) {
      console.error("Error unenrolling from course:", error);
    }
  };

  // Determine which courses to display
  const displayedCourses = isFaculty
    ? courses
    : isStudent && showAllCourses
    ? allCourses
    : enrolledCourses;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
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
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}

      {isStudent && (
        <button
          className="btn btn-primary float-end"
          id="wd-enrollments-toggle"
          onClick={() => {
            setShowAllCourses((prev) => !prev);
          }}
        >
          {showAllCourses ? "Show Enrolled Courses" : "Show All Courses"}
        </button>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({displayedCourses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {displayedCourses.map((course: any) => (
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
                  <img
                    src={course.pic}
                    width="100%"
                    height={160}
                    alt="Course"
                  />
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
                  </div>
                </Link>
                <div className="card-body">
                  {/* Student "Go" Button */}
                  {isStudent && isEnrolled(course._id) && (
                    <Link
                      to={`/Kanbas/Courses/${course._id}/Home`}
                      className="btn btn-primary me-2"
                    >
                      Go
                    </Link>
                  )}

                  {/* Faculty Buttons */}
                  {isFaculty && (
                    <>
                      <button
                        onClick={(event: any) => {
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
                        onClick={(event: any) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                        className="btn btn-warning me-2 float-end"
                      >
                        Edit
                      </button>
                    </>
                  )}

                  {/* Student Enroll/Unenroll Buttons */}
                  {isStudent && (
                    <>
                      {isEnrolled(course._id) ? (
                        <button
                          className="btn btn-danger ms-2"
                          onClick={(event: any) => {
                            event.preventDefault();
                            handleUnenroll(course._id);
                          }}
                        >
                          Unenroll
                        </button>
                      ) : (
                        <button
                          className="btn btn-success ms-2"
                          onClick={(event: any) => {
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
