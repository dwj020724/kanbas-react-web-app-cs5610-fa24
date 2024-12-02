import { Link, useParams } from "react-router-dom";
export default function CoursesNavigation() {
  const { cid } = useParams();
  return (
    <div className="rounded-0 list-group wd" id="wd-courses-navigation">
      <Link
        className="bg-white text-black border-0 active list-group-item"
        to={`/Kanbas/Courses/${cid}/Home`}
      >
        Home
      </Link>
      <Link
        className="text-danger border-0 list-group-item"
        to={`/Kanbas/Courses/${cid}/Modules`}
      >
        Modules
      </Link>
      <Link
        className="text-danger border-0 list-group-item"
        to={`/Kanbas/Courses/${cid}/Piazza`}
      >
        Piazza
      </Link>
      <Link
        className="text-danger border-0 list-group-item"
        to={`/Kanbas/Courses/${cid}/Zoom`}
      >
        Zoom
      </Link>
      <Link
        className="text-danger border-0 list-group-item"
        to={`/Kanbas/Courses/${cid}/Assignments`}
      >
        Assignments
      </Link>
      <Link
        className="text-danger border-0 list-group-item"
        to={`/Kanbas/Courses/${cid}/Quizzes`}
      >
        Quizzes
      </Link>
      <Link
        className="text-danger border-0 list-group-item"
        to={`/Kanbas/Courses/${cid}/Grades`}
      >
        Grades
      </Link>
      <Link
        className="text-danger border-0 list-group-item"
        to={`/Kanbas/Courses/${cid}/People`}
      >
        People
      </Link>
    </div>
  );
}