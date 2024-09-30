import { FaPlus } from "react-icons/fa6";
import { HiMagnifyingGlass } from "react-icons/hi2";
export default function Assignmentcontrol() {
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <button id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment</button>
      <div className="dropdown d-inline me-1 float-end">
        <button id="wd-publish-all-btn" className="btn btn-lg btn-secondary"
          type="button" >
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Group</button>

      </div>
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
);}
