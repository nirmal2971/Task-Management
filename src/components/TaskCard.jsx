import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../redux/tasksSlice";
import { Card, CardContent, Typography, Button, Box, Chip } from "@mui/material";

export default function TaskCard({ task, onEditTask }) {
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.stopPropagation(); // Prevent interfering with DnD
    if (onEditTask) onEditTask(task);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteTask(task.id));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "error";
      case "Medium":
        return "warning";
      default:
        return "success";
    }
  };

  return (
    <Card
      sx={{
        mb: 2,
        borderLeft: `6px solid ${
          task.priority === "High"
            ? "#d32f2f"
            : task.priority === "Medium"
            ? "#f57c00"
            : "#388e3c"
        }`,
        borderRadius: 2,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
        },
        bgcolor: "#fff",
      }}
    >
      <CardContent>
        {/* Title + Actions */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#0d47a1" }}>
            {task.title}
          </Typography>
          <Box>
            <Button size="small" variant="outlined" sx={{ mr: 1 }} onClick={handleEdit}>
              Edit
            </Button>
            <Button size="small" variant="outlined" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </Box>

        {/* Description */}
        {task.description && (
          <Typography variant="body2" sx={{ mb: 2, color: "#555" }}>
            {task.description}
          </Typography>
        )}

        {/* Chips: Priority, Category, Status */}
        <Box display="flex" gap={1} flexWrap="wrap">
          <Chip
            label={task.priority}
            color={getPriorityColor(task.priority)}
            size="small"
            sx={{ fontWeight: 600 }}
          />
          <Chip
            label={task.category || "General"}
            size="small"
            variant="outlined"
            sx={{ borderColor: "#bbb", color: "#333" }}
          />
          <Chip
            label={task.status}
            size="small"
            variant="outlined"
            sx={{ borderColor: "#bbb", color: "#333" }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
