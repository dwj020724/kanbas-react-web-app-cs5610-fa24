import { enrollments } from "../../Database";
import { createSlice } from "@reduxjs/toolkit";


// Initial State
const initialState = {
  enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
      enrollInCourse: (state, { payload: { userId, courseId } }) => {
        const newEnrollment = {
          _id: new Date().getTime().toString(),
          user: userId,
          course: courseId,
        };
        state.enrollments.push(newEnrollment);
      },
      unenrollFromCourse: (state, { payload: { userId, courseId } }) => {
        state.enrollments = state.enrollments.filter(
          (enrollment) =>
            !(enrollment.user === userId && enrollment.course === courseId)
        );
      },
    },
  });
  
  export const { enrollInCourse, unenrollFromCourse } = enrollmentsSlice.actions;
  export default enrollmentsSlice.reducer;