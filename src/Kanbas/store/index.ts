import { configureStore } from "@reduxjs/toolkit";
import assignmentsReducer from "../Courses/Assignments/reducer";
const store = configureStore({
    reducer: {
    assignmentsReducer
    },
  });
  export default store;