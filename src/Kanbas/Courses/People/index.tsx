// src/Kanbas/People/index.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PeopleTable from "./Table";
import { findUsersForCourse } from "../client";

export default function People() {
  const { cid } = useParams<{ cid: string }>();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (cid) {
        try {
          const enrolledUsers = await findUsersForCourse(cid);
          setUsers(enrolledUsers);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };
    fetchUsers();
  }, [cid]);

  return (
    <div>
      <h1>People Enrolled in Course {cid}</h1>
      <PeopleTable users={users} />
    </div>
  );
}
