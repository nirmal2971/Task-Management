import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.tasks.push(action.payload);
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      },
      prepare(title, description, priority = "Medium", category = "Work") {
        return {
          payload: {
            id: nanoid(),
            title,
            description,
            priority,
            status: "To Do",
            category,
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
    updateTask(state, action) {
      console.log("Updating task:", action.payload);

      const { id, updates } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        Object.assign(task, updates);
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    reorderTasks(state, action) {
      state.tasks = action.payload;
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
  },
});

export const { addTask, updateTask, deleteTask, reorderTasks } =
  tasksSlice.actions;
export default tasksSlice.reducer;
