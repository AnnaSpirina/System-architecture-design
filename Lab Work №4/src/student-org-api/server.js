const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Временное хранилище данных
let organizations = [];
let events = [];
let students = [];

// 1.1. Добавление студенческой организации
app.post('/organizations', (req, res) => {
    const { name, description, logo } = req.body;
    if (!name || !description || !logo) {
        return res.status(400).json({ error: 'Неверные данные' });
    }
    const newOrganization = { id: organizations.length + 1, name, description, logo };
    organizations.push(newOrganization);
    res.status(201).json(newOrganization);
});

// 1.2. Изменение данных студенческой организации
app.put('/organizations/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, logo } = req.body;
    const organization = organizations.find(org => org.id === parseInt(id));
    if (!organization) {
        return res.status(404).json({ error: 'Организация не найдена' });
    }
    if (name) organization.name = name;
    if (description) organization.description = description;
    if (logo) organization.logo = logo;
    res.status(200).json(organization);
});

// 1.3. Назначение руководителя организации
app.post('/organizations/:id/assign-leader', (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    const organization = organizations.find(org => org.id === parseInt(id));
    if (!organization) {
        return res.status(404).json({ error: 'Организация не найдена' });
    }
    // Проверка существования пользователя
    organization.leaderId = userId;
    res.status(200).json(organization);
});

// 1.4. Удаление студенческой организации
app.delete('/organizations/:id', (req, res) => {
    const { id } = req.params;
    const index = organizations.findIndex(org => org.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Организация не найдена' });
    }
    organizations.splice(index, 1);
    res.status(204).send();
});

// 2.1. Создание мероприятия
app.post('/events', (req, res) => {
    const { title, description, date, location, organizationId } = req.body;
    if (!title || !description || !date || !location || !organizationId) {
        return res.status(400).json({ error: 'Неверные данные' });
    }
    const newEvent = { id: events.length + 1, title, description, date, location, organizationId };
    events.push(newEvent);
    res.status(201).json(newEvent);
});

// 2.2. Отмена мероприятия
app.delete('/events/:id', (req, res) => {
    const { id } = req.params;
    const index = events.findIndex(event => event.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Мероприятие не найдено' });
    }
    events.splice(index, 1);
    res.status(204).send();
});

// 2.3. Генерация QR-кода для мероприятия
app.get('/events/:id/qr-code', (req, res) => {
    const { id } = req.params;
    const event = events.find(event => event.id === parseInt(id));
    if (!event) {
        return res.status(404).json({ error: 'Мероприятие не найдено' });
    }
    // Код для генерации QR-кода
    res.status(200).json({ qrCode: 'QR_CODE_IMAGE_DATA' });
});

// 2.4. Получение списка всех мероприятий
app.get('/events', (req, res) => {
    res.status(200).json(events);
});

// 3.1. Регистрация студента
app.post('/students/register', (req, res) => {
    const { firstName, lastName, middleName, group, email, password } = req.body;
    if (!firstName || !lastName || !group || !email || !password) {
        return res.status(400).json({ error: 'Неверные данные' });
    }
    const existingStudent = students.find(student => student.email === email);
    if (existingStudent) {
        return res.status(409).json({ error: 'Пользователь с такой почтой уже существует' });
    }
    const newStudent = { id: students.length + 1, firstName, lastName, middleName, group, email, password };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// 3.2. Подписка на студенческую организацию
app.post('/students/:studentId/subscribe/:organizationId', (req, res) => {
    const { studentId, organizationId } = req.params;
    const student = students.find(student => student.id === parseInt(studentId));
    const organization = organizations.find(org => org.id === parseInt(organizationId));
    if (!student || !organization) {
        return res.status(404).json({ error: 'Студент или организация не найдены' });
    }
    // Логика подписки
    res.status(200).json({ message: 'Подписка успешно оформлена' });
});

// 3.3. Отмена регистрации на мероприятие
app.delete('/students/:studentId/events/:eventId', (req, res) => {
    const { studentId, eventId } = req.params;
    const student = students.find(student => student.id === parseInt(studentId));
    const event = events.find(event => event.id === parseInt(eventId));
    if (!student || !event) {
        return res.status(404).json({ error: 'Студент или мероприятие не найдены' });
    }
    // Логика отмены регистрации
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});