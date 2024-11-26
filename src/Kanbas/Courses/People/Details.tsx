import { useEffect, useState } from "react";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import * as client from "../../Account/client";
import { FaPencil } from "react-icons/fa6";

export default function PeopleDetails() {
  const { uid } = useParams();
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName, email, role };
    await client.updateUser(updatedUser); // Assuming this updates the user on the server
    setUser(updatedUser); // Update local state
    setEditing(false);
  };

  const fetchUser = async () => {
    if (!uid) return;
    const fetchedUser = await client.findUserById(uid);
    setUser(fetchedUser);
    setName(`${fetchedUser.firstName} ${fetchedUser.lastName}`);
    setEmail(fetchedUser.email);
    setRole(fetchedUser.role);
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    navigate(-1);
  };

  if (!uid) return null;

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button
        onClick={() => navigate(-1)}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />
      </button>

      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />

      {/* User Name Editing */}
      <div className="text-danger fs-4 wd-name">
        {!editing && (
          <>
            <FaPencil
              onClick={() => setEditing(true)}
              className="float-end fs-5 mt-2 wd-edit"
            />
            <div onClick={() => setEditing(true)}>
              {user.firstName} {user.lastName}
            </div>
          </>
        )}
        {editing && (
          <>
            <FaCheck
              onClick={saveUser}
              className="float-end fs-5 mt-2 me-2 wd-save"
            />
            <input
              className="form-control w-50 wd-edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveUser();
              }}
            />
          </>
        )}
      </div>

      {/* Email Editing */}
      <b>Email:</b>
      <div className="wd-email">
        {!editing && <div>{user.email}</div>}
        {editing && (
          <input
            type="email"
            className="form-control w-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveUser();
            }}
          />
        )}
      </div>

      {/* Role Editing */}
      <b>Role:</b>
      <div className="wd-roles">
        {!editing && <div>{user.role}</div>}
        {editing && (
          <select
            className="form-control w-50 wd-edit-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveUser();
            }}
          >
            <option value="">All Roles</option>
            <option value="STUDENT">Students</option>
            <option value="TA">Assistants</option>
            <option value="FACULTY">Faculty</option>
            <option value="ADMIN">Administrators</option>
          </select>
        )}
      </div>

      {/* Other User Details */}
      <b>Login ID:</b>
      <span className="wd-login-id">{user.loginId}</span>
      <br />
      <b>Section:</b>
      <span className="wd-section">{user.section}</span>
      <br />
      <b>Total Activity:</b>
      <span className="wd-total-activity">{user.totalActivity}</span>
      <hr />

      {/* Action Buttons */}
      <button
        onClick={() => deleteUser(uid)}
        className="btn btn-danger float-end wd-delete"
      >
        Delete
      </button>
      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary float-start float-end me-2 wd-cancel"
      >
        Cancel
      </button>
    </div>
  );
}
