const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

let organizations = [];

// Добавление организации
app.post('/organizations', (req, res) => {
  const { name, description, logo } = req.body;
  if (!name || !description || !logo) {
    return res.status(400).json({ error: 'Неверные данные' });
  }
  const newOrganization = { id: organizations.length + 1, name, description, logo };
  organizations.push(newOrganization);
  res.status(201).json(newOrganization);
});

// Назначение руководителя
app.post('/organizations/:id/assign-leader', (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const organization = organizations.find(org => org.id === parseInt(id));
  if (!organization) {
    return res.status(404).json({ error: 'Организация не найдена' });
  }
  organization.leaderId = userId;
  res.status(200).json(organization);
});

// Получение списка организаций
app.get('/organizations', (req, res) => {
  res.status(200).json(organizations);
});

app.listen(port, () => {
  console.log(`Organizations Service running on http://localhost:${port}`);
});