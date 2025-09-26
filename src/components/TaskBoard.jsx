import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { reorderTasks } from "../redux/tasksSlice";
import { Grid, Typography, Box } from "@mui/material";
import TaskCard from "./TaskCard";

const SortableTaskWrapper = ({ task, onEditTask }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <TaskCard task={task} onEditTask={onEditTask} />
    </div>
  );
};

export default function TaskBoard({ onEditTask, filters = {} }) {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((t) => t.id === active.id);
    const newIndex = tasks.findIndex((t) => t.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
      dispatch(reorderTasks(arrayMove(tasks, oldIndex, newIndex)));
    }
  };

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (filters.status && filters.status !== "All") {
      result = result.filter((t) => t.status === filters.status);
    }
    if (filters.priority && filters.priority !== "All") {
      result = result.filter((t) => t.priority === filters.priority);
    }
    if (filters.category && filters.category !== "All") {
      result = result.filter((t) => t.category === filters.category);
    }
    if (filters.searchText) {
      const search = filters.searchText.toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(search));
    }

    if (filters.sortBy === "newest") {
      result.sort((a, b) => b.createdAt - a.createdAt);
    } else if (filters.sortBy === "oldest") {
      result.sort((a, b) => a.createdAt - b.createdAt);
    } else if (filters.sortBy === "priority") {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      result.sort(
        (a, b) =>
          (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0)
      );
    }

    return result;
  }, [tasks, filters]);

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={filteredTasks.map((t) => t.id)}
        strategy={rectSortingStrategy}
      >
        {filteredTasks.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 10, color: "#777" }}>
            <Typography variant="h6">No tasks found.</Typography>
            <Typography variant="body2">
              Adjust filters or add new tasks to get started.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredTasks.map((task) => (
              <Grid item xs={12} sm={6} md={3} key={task.id}>
                <SortableTaskWrapper task={task} onEditTask={onEditTask} />
              </Grid>
            ))}
          </Grid>
        )}
      </SortableContext>
    </DndContext>
  );
}
