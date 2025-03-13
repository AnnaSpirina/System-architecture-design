const express = require('express');
const app = express();
const port = 3002;

app.use(express.json());

let events = [];

// Создание мероприятия
app.post('/events', (req, res) => {
  const { title, description, date, location, organizationId } = req.body;
  if (!title || !description || !date || !location || !organizationId) {
    return res.status(400).json({ error: 'Неверные данные' });
  }
  const newEvent = { id: events.length + 1, title, description, date, location, organizationId };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

// Генерация QR-кода
app.get('/events/:id/qr-code', (req, res) => {
  const { id } = req.params;
  const event = events.find(event => event.id === parseInt(id));
  if (!event) {
    return res.status(404).json({ error: 'Мероприятие не найдено' });
  }
  res.status(200).json({ qrCode: `QR_CODE_FOR_EVENT_${id}` });
});

app.listen(port, () => {
  console.log(`Events Service running on http://localhost:${port}`);
});