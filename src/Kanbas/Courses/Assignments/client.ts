import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENT_API = `${REMOTE_SERVER}/api/assignments`;
export const deleteAssignment = async (assignmentId:string) => {
    const response = await axios.delete(`${ASSIGNMENT_API}/${assignmentId}`);
    return response.data;
};

// Update an assignment by ID
export const updateAssignment = async (assignmentId:string, assignmentUpdates:any) => {
    const { data } = await axios.put(`${ASSIGNMENT_API}/${assignmentId}`, assignmentUpdates);
    return data;
};

// Create a new assignment
export const createAssignment = async (assignment: any) => {
    const response = await axios.post(`${ASSIGNMENT_API}`, assignment);
    return response.data;
};

// Find assignments for a specific course code
export const findAssignmentsForCourse = async (courseCode:string) => {
    const response = await axios.get(`${ASSIGNMENT_API}/course/${courseCode}`);
    return response.data;
};