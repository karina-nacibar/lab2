// almacenamiento en memoria simple
let tasks = [
  { id: 1, title: "Tarea ejemplo", description: "Descripción", status: "todo" }
];

export const getTasks = (req, res) => {
  const { status } = req.query;
  const filtered = status ? tasks.filter(t => t.status === status) : tasks;
  res.json(filtered);
};

export const getTaskById = (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
};

export const createTask = (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });
  const newTask = { id: tasks.length ? Math.max(...tasks.map(t=>t.id)) + 1 : 1, title, description: description || "", status: "todo" };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

export const updateTask = (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ message: "Task not found" });
  const { title, description, status } = req.body;
  // Reemplaza todos los campos (PUT)
  tasks[index] = { id, title: title ?? tasks[index].title, description: description ?? tasks[index].description, status: status ?? tasks[index].status };
  res.json(tasks[index]);
};

export const updateStatus = (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;
  const valid = ["todo", "doing", "done"];
  if (!valid.includes(status)) return res.status(400).json({ message: "Invalid status" });
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  task.status = status;
  res.json(task);
};

export const deleteTask = (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ message: "Task not found" });
  tasks.splice(index, 1);
  res.json({ message: "Task deleted successfully" });
};

export const getSummary = (req, res) => {
  const summary = { todo: 0, doing: 0, done: 0 };
  tasks.forEach(t => {
    if (summary[t.status] !== undefined) summary[t.status] += 1;
  });
  res.json(summary);
};