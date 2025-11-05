import React, { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../api/config";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";
// Grid removed: using responsive CSS Grid via Box to avoid MUI Grid typing overloads
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface Task {
  _id?: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  dueDate?: string | null;
  tags?: string[];
}

const TaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [tagInput, setTagInput] = useState("");
  const [newTask, setNewTask] = useState<Task>({
    title: "",
    description: "",
    status: "pending",
    dueDate: null,
    tags: [],
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.TASKS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateOrUpdate = async () => {
    try {
      const payload = { ...newTask, dueDate: newTask.dueDate || null };
      if (editingTask) {
        if (!editingTask._id) {
          throw new Error("Task ID is missing for update.");
        }
        await axios.put(
          API_ENDPOINTS.TASK(editingTask._id),
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(API_ENDPOINTS.TASKS, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setOpen(false);
      setNewTask({
        title: "",
        description: "",
        status: "pending",
        dueDate: null,
        tags: [],
      });
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      console.error("Error creating/updating task", err);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await axios.delete(API_ENDPOINTS.TASK(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !newTask.tags?.includes(tagInput.trim())) {
      setNewTask({ ...newTask, tags: [...(newTask.tags || []), tagInput] });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setNewTask({
      ...newTask,
      tags: newTask.tags?.filter((t) => t !== tag) || [],
    });
  };

  const filteredTasks =
    filterStatus === "all"
      ? tasks
      : tasks.filter((t) => t.status === filterStatus);

  const counts = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Task Manager
        </Typography>
        <Button variant="outlined" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* stats cards */}
      <Box
        mb={3}
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}
      >
        {[
          { label: "Total Tasks", value: counts.total, color: "#E3F2FD" },
          { label: "Pending", value: counts.pending, color: "#FFF3E0" },
          { label: "In Progress", value: counts.inProgress, color: "#E8F5E9" },
          { label: "Completed", value: counts.completed, color: "#F3E5F5" },
        ].map((card, i) => (
          <Box key={i}>
            <Card
              sx={{
                backgroundColor: card.color,
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  {card.label}
                </Typography>
                <Typography variant="h5" mt={1}>
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
  </Box>

      {/* filter + add */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <FormControl sx={{ width: 200 }}>
          <InputLabel>Status Filter</InputLabel>
          <Select
            value={filterStatus}
            label="Status Filter"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          New Task
        </Button>
      </Box>

      {/* task list */}
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        }}
      >
        {filteredTasks.map((task) => (
          <Box key={task._id}>
            <Card
              sx={{
                borderLeft: `6px solid ${
                  task.status === "completed"
                    ? "green"
                    : task.status === "in-progress"
                    ? "orange"
                    : "gray"
                }`,
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {task.description}
                </Typography>

                <Box mt={2} display="flex" flexWrap="wrap" gap={0.5}>
                  {task.tags?.map((tag, idx) => (
                    <Chip key={idx} label={tag} size="small" />
                  ))}
                </Box>

                {task.dueDate && (
                  <Box
                    mt={2}
                    sx={{
                      backgroundColor: "#f5f5f5",
                      borderRadius: 1,
                      px: 1,
                      py: 0.5,
                      display: "inline-block",
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                )}

                <Box mt={2}>
                  <Chip
                    label={task.status}
                    color={
                      task.status === "completed"
                        ? "success"
                        : task.status === "in-progress"
                        ? "warning"
                        : "default"
                    }
                  />
                </Box>

                <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setEditingTask(task);
                      setNewTask(task);
                      setOpen(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(task._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* create / edit dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>
          {editingTask ? "Edit Task" : "Create New Task"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            multiline
            minRows={2}
            label="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            sx={{ mt: 2 }}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Due Date"
              value={newTask.dueDate ? new Date(newTask.dueDate) : null}
              onChange={(date) =>
                setNewTask({ ...newTask, dueDate: date?.toISOString() || null })
              }
              slotProps={{ textField: { fullWidth: true, sx: { mt: 2 } } }}
            />
          </LocalizationProvider>

          <Box display="flex" alignItems="center" mt={2}>
            <TextField
              label="Add Tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              sx={{ mr: 2, flex: 1 }}
            />
            <Button variant="outlined" onClick={handleAddTag}>
              Add
            </Button>
          </Box>

          <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
            {newTask.tags?.map((tag, idx) => (
              <Chip key={idx} label={tag} onDelete={() => handleRemoveTag(tag)} />
            ))}
          </Box>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={newTask.status}
              label="Status"
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  status: e.target.value as Task["status"],
                })
              }
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateOrUpdate}>
            {editingTask ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TaskPage;
