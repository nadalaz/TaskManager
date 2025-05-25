const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

let tasks = [];
let nextId = 1;

// GET all tasks
app.get('/api/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// POST new task
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ message: 'Le titre de la tâche est requis.' });
  }
  const newTask = { id: nextId++, title: title.trim(), completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT toggle completed
app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ message: `Tâche avec ID ${id} non trouvée.` });
  }
  task.completed = !task.completed;
  res.status(200).json(task);
});

// DELETE a task
app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ message: `Impossible de supprimer : tâche avec ID ${id} introuvable.` });
  }
  tasks.splice(index, 1);
  res.status(200).json({ message: 'Tâche supprimée avec succès.' });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`✅ Backend Express lancé sur http://localhost:${PORT}`);
});
