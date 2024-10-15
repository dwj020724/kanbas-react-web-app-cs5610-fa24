import { Link, useLocation, useParams } from "react-router-dom";

const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

export default function CoursesNavigation() {
  const { cid } = useParams(); 
  const { pathname } = useLocation();

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const path = `/Kanbas/Courses/${cid}/${link}`;
        const isActive = pathname.includes(link);

        return (
          <Link
            key={link}
            to={path}
            className={`list-group-item border border-0 ${isActive ? "active-link" : "text-danger"}`}
            style={{
              color: isActive ? "black" : "red",
              borderLeft: isActive ? "3px solid black" : "none"
            }}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
