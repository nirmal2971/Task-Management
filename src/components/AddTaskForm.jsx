import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../redux/tasksSlice";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  Paper,
} from "@mui/material";

const priorities = ["Low", "Medium", "High"];
const categories = ["Work", "Personal", "Shopping", "Others"];

export default function AddTaskForm({ taskToEdit, onFinish, submitRef }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Work");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || "");
      setDescription(taskToEdit.description || "");
      setPriority(taskToEdit.priority || "Medium");
      setCategory(taskToEdit.category || "Work");
    } else {
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setCategory("Work");
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (taskToEdit) {
      dispatch(
        updateTask({
          id: taskToEdit.id,
          updates: { title, description, priority, category },
        })
      );
    } else {
      dispatch(addTask(title, description, priority, category));
    }

    if (onFinish) onFinish();

    setTitle("");
    setDescription("");
    setPriority("Medium");
    setCategory("Work");
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        ref={submitRef}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {taskToEdit ? "Edit Task" : "Add New Task"}
        </Typography>

        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
          variant="outlined"
        />

        <TextField
          label="Description"
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          variant="outlined"
        />

        <TextField
          select
          label="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          fullWidth
          variant="outlined"
        >
          {priorities.map((p) => (
            <MenuItem key={p} value={p}>
              {p}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          variant="outlined"
        >
          {categories.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </TextField>

        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 1,
            bgcolor: "#1976d2",
            color: "#fff",
            "&:hover": { bgcolor: "#1565c0" },
            textTransform: "none",
          }}
          fullWidth
        >
          {taskToEdit ? "Update Task" : "Add Task"}
        </Button>
      </Box>
    </Paper>
  );
}
