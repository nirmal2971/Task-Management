import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Paper,
  TextField,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import AddTaskForm from "./AddTaskForm";
import TaskBoard from "./TaskBoard";
const priorities = ["All", "Low", "Medium", "High"];
const statuses = ["All", "To Do", "In Progress", "Done"];
const categories = ["All", "Work", "Personal", "Shopping", "Others"];
const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Priority High → Low", value: "priority" },
];

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [searchText, setSearchText] = useState("");
  const searchRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.key.toLowerCase() === "n") handleOpenDialog();
      if (e.altKey && e.key.toLowerCase() === "f") searchRef.current?.focus();
      if (e.altKey && e.key.toLowerCase() === "s") {
        formRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true })
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOpenDialog = () => {
    setTaskToEdit(null);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setTaskToEdit(null);
  };

  const handleEditTask = (task) => {
    if (taskToEdit && taskToEdit.id === task.id) {
      setOpen(false);
      setTimeout(() => setOpen(true), 0);
    } else {
      setTaskToEdit(task);
      setOpen(true);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc", py: 6 }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 5,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "#0d47a1",
              letterSpacing: 0.5,
            }}
          >
            Task Management Dashboard
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
            sx={{
              bgcolor: "#0d47a1",
              "&:hover": { bgcolor: "#08306b" },
              px: 4,
              py: 1.5,
              fontWeight: 600,
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            Add Task
          </Button>
        </Box>

        <Paper
          elevation={2}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            bgcolor: "#ffffff",
          }}
        >
          <TextField
            select
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            size="small"
            sx={{ minWidth: 140 }}
          >
            {statuses.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Priority"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            size="small"
            sx={{ minWidth: 140 }}
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
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            size="small"
            sx={{ minWidth: 140 }}
          >
            {categories.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Sort By"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            size="small"
            sx={{ minWidth: 180 }}
          >
            {sortOptions.map((s) => (
              <MenuItem key={s.value} value={s.value}>
                {s.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Search tasks..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            size="small"
            inputRef={searchRef}
            sx={{ flex: 1, minWidth: 200 }}
          />
        </Paper>

        <TaskBoard
          onEditTask={handleEditTask}
          filters={{
            status: statusFilter,
            priority: priorityFilter,
            category: categoryFilter,
            searchText,
            sortBy,
          }}
        />

        <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle
            sx={{
              fontWeight: 600,
              fontSize: 20,
              bgcolor: "#0d47a1",
              color: "#fff",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          >
            {taskToEdit ? "Edit Task" : "Add New Task"}
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ bgcolor: "#f4f6f8" }}>
            <AddTaskForm
              taskToEdit={taskToEdit}
              onFinish={handleCloseDialog}
              submitRef={formRef}
            />
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
}
