const express = require('express');
const axios = require('axios'); // Добавляем axios для HTTP-запросов
const app = express();

app.use(express.json());

let events = [];

// Создание мероприятия
app.post('/events', async (req, res) => {
  const { title, description, date, location, organizationId } = req.body;

  // Проверка наличия всех обязательных полей
  if (!title || !description || !date || !location || !organizationId) {
    return res.status(400).json({ error: 'Неверные данные' });
  }

  try {
    // Проверка существования организации
    const response = await axios.get(`http://organizations-service:3001/organizations/${organizationId}`);
    if (!response.data) {
      return res.status(404).json({ error: 'Организация не найдена' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Ошибка при проверке организации' });
  }

  // Создание мероприятия
  const newEvent = { id: events.length + 1, title, description, date, location, organizationId };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

app.get('/events/:id/qr-code', (req, res) => {
  const { id } = req.params;
  const event = events.find(event => event.id === parseInt(id));
  if (!event) {
    return res.status(404).json({ error: 'Мероприятие не найдено' });
  }
  res.status(200).json({ qrCode: `QR_CODE_FOR_EVENT_${id}` });
});

module.exports = app;