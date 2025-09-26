# Task Management App

A **responsive task management interface** built with **React** and **Redux**, featuring drag-and-drop functionality, task categorization, priority management, filtering, sorting, search, and keyboard shortcuts. All data is persisted in **local storage**, requiring no backend.

---

## 🚀 Features

### Core Functionality
- **Task CRUD**: Create, read, update, and delete tasks.
- **Categories & Priorities**: Assign tasks to categories (Work, Personal, etc.) and set priority (Low, Medium, High).
- **Drag & Drop**: Reorder tasks effortlessly using drag-and-drop interface.
- **Filtering & Sorting**: Filter tasks by status, category, or priority. Sort tasks by date or priority.
- **Search**: Quickly find tasks by name or description.

### Data Persistence
- **Local Storage**: All tasks persist in the browser's local storage, no backend needed.

---
## 📁 Usage

- **Add a Task:** Click the "New Task" button or press `Alt+N`.  
- **Edit a Task:** Click the task and modify the details.  
- **Delete a Task:** Click the delete icon on a task.  
- **Drag & Drop:** Click and hold a task to reorder.  
- **Filter/Sort/Search:** Use the top toolbar to filter, sort, or search tasks.  

### ⌨️ Keyboard Shortcuts

| Shortcut | Action                  |
|----------|------------------------|
| `Alt+N`  | Create new task         |
| `Alt+F`  | Focus search input      |
| `Alt+S`  | Save changes (editing)  |

---

## 🛠 Technologies Used
- **React** – UI library for building interactive components
- **Redux** – State management for tasks and UI states
- **React-Redux** – Connect React components to Redux store
- **React DnD / react-beautiful-dnd** – Drag-and-drop functionality
- **Material-UI / Tailwind / Custom CSS** – Styling and responsive design
- **LocalStorage API** – Data persistence

---

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/nirmal2971/Task-Management.git
cd task-management-app
npm install
npm start

```

