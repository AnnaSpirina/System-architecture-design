# Диаграмма контейнеров
![HSE - Контейнеры](https://github.com/user-attachments/assets/88e2b1f8-1e41-4a89-b9bc-9e12428e87bf)
# Диаграмма компонентов для контейнера Admin API
![HSE - Admin API (1)](https://github.com/user-attachments/assets/41e7ce53-0aa3-454d-a161-e81f002e3ae4)
# Диаграмма последовательности для варианта использования "Просматривать статистику"
![Untitled (1)](https://github.com/user-attachments/assets/c46bff5f-2886-41ea-bf7a-0e8d3d8982a5)
1. Администратор/Руководитель запрашивает статистику через пользовательский интерфейс (например, нажимает кнопку "Просмотреть статистику") в веб-приложении.
2. Веб-приложение запрашивает статистику у WEB API Gateway.
3. WEB API Gateway получает запрос и перенаправляет его в Stats Controller.
4. Stats Controller вызывает метод в Stats Service для получения статистики.
5. Stats Service запрашивает данные из Event Repository.
6. Event Repository выполняет запрос к Базе данных для получения необходимой информации (количество зарегистрированных пользователей).
7. База данных возвращает данные в Event Repository.
8. Event Repository передает данные в Stats Service.
9. Stats Service обрабатывает данные (например, агрегирует их) и возвращает результат в Stats Controller.
10. Stats Controller передает данные в WEB API Gateway.
11. WEB API Gateway возвращает данные в Веб-приложение.
12. Веб-приложение отображает данные для Администратора/Руководителя, которые видят статистику на экране.
# Модель БД
![image](https://github.com/user-attachments/assets/18619366-ca1b-41d8-8b46-422dc913218b)
# Применение основных принципов разработки
Код будет реализовывать базовые функции системы координации мероприятий, такие как:
1. Просмотр мероприятий
2. Регистрация на мероприятие
3. Получение статистики

Сервер (Node.js):
- Использует Express для создания REST API.
- Хранит данные в памяти (для простоты).
- Поддерживает создание пользователей, мероприятий, регистрацию и получение статистики.

Клиент (Vanilla JS):
- Использует Fetch API для отправки запросов на сервер.
- Позволяет создавать пользователей, мероприятия, регистрироваться на мероприятия и получать статистику.

Установка зависимостей
```
npm init -y
npm install express body-parser
```

server.js
```
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// "База данных" (в памяти)
let users = [];
let events = [];
let registrations = [];

// Модели данных
class User {
    constructor(id, name, email, role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }
}

class Event {
    constructor(id, name, description, date, location, studOrgId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.location = location;
        this.studOrgId = studOrgId;
    }
}

class Registration {
    constructor(id, userId, eventId, attended = false) {
        this.id = id;
        this.userId = userId;
        this.eventId = eventId;
        this.attended = attended;
    }
}

// API endpoints
app.post("/users", (req, res) => {
    const { name, email, role } = req.body;
    const user = new User(Date.now(), name, email, role);
    users.push(user);
    res.status(201).json(user);
});

app.get("/users/:id", (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
});

app.post("/events", (req, res) => {
    const { name, description, date, location, studOrgId } = req.body;
    const event = new Event(Date.now(), name, description, date, location, studOrgId);
    events.push(event);
    res.status(201).json(event);
});

app.get("/events", (req, res) => {
    res.json(events);
});

app.post("/register", (req, res) => {
    const { userId, eventId } = req.body;
    const registration = new Registration(Date.now(), userId, eventId);
    registrations.push(registration);
    res.status(201).json(registration);
});

app.get("/stats/events/:eventId", (req, res) => {
    const eventId = parseInt(req.params.eventId);
    const eventRegistrations = registrations.filter(r => r.eventId === eventId);
    const totalRegistered = eventRegistrations.length;
    const totalAttended = eventRegistrations.filter(r => r.attended).length;
    res.json({ eventId, totalRegistered, totalAttended });
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Coordination System</title>
</head>
<body>
    <h1>Event Coordination System</h1>

    <div>
        <h2>Create User</h2>
        <input id="userName" placeholder="Name">
        <input id="userEmail" placeholder="Email">
        <button onclick="createUser()">Create User</button>
    </div>

    <div>
        <h2>Create Event</h2>
        <input id="eventName" placeholder="Event Name">
        <input id="eventDescription" placeholder="Description">
        <input id="eventDate" placeholder="Date">
        <input id="eventLocation" placeholder="Location">
        <button onclick="createEvent()">Create Event</button>
    </div>

    <div>
        <h2>Register for Event</h2>
        <input id="registerUserId" placeholder="User ID">
        <input id="registerEventId" placeholder="Event ID">
        <button onclick="registerForEvent()">Register</button>
    </div>

    <div>
        <h2>Event Stats</h2>
        <input id="statsEventId" placeholder="Event ID">
        <button onclick="getEventStats()">Get Stats</button>
        <pre id="statsResult"></pre>
    </div>

    <script>
        const API_URL = "http://localhost:3000";

        async function createUser() {
            const name = document.getElementById("userName").value;
            const email = document.getElementById("userEmail").value;
            const response = await fetch(`${API_URL}/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, role: "Student" }),
            });
            const user = await response.json();
            console.log("User created:", user);
        }

        async function createEvent() {
            const name = document.getElementById("eventName").value;
            const description = document.getElementById("eventDescription").value;
            const date = document.getElementById("eventDate").value;
            const location = document.getElementById("eventLocation").value;
            const response = await fetch(`${API_URL}/events`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, description, date, location, studOrgId: 1 }),
            });
            const event = await response.json();
            console.log("Event created:", event);
        }

        async function registerForEvent() {
            const userId = document.getElementById("registerUserId").value;
            const eventId = document.getElementById("registerEventId").value;
            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, eventId }),
            });
            const registration = await response.json();
            console.log("Registration successful:", registration);
        }

        async function getEventStats() {
            const eventId = document.getElementById("statsEventId").value;
            const response = await fetch(`${API_URL}/stats/events/${eventId}`);
            const stats = await response.json();
            document.getElementById("statsResult").textContent = JSON.stringify(stats, null, 2);
        }
    </script>
</body>
</html>
```
## KISS
Принцип KISS предполагает реализацию решения самым простым способом. Он утверждает, что большинство систем работают лучше, если они остаются простыми, а не усложняются.
- Отказаться от избыточной сложности. Следует избегать лишних условий, вложенных циклов, излишней «ветвистости» кода, и стремиться к минимализму, удаляя неиспользуемые или излишне сложные функции, классы и методы.
- Использовать понятные и информативные имена. Следует называть переменные, функции и классы так, чтобы их названия были ясными и понятными. При этом желательно избегать сокращений или неясных обозначений — хорошо читаемый код способствует пониманию и поддержке.
- Разбивать задачи на более простые модули. Если задача сложна, нужно разделить её на более мелкие и понятные части. Это упрощает понимание кода и позволяет сосредоточиться на решении конкретных проблем.
- Избегать избыточной абстракции. Если нет необходимости в сложной иерархии классов или структур, простые и прямолинейные решения могут быть более эффективными и понятными.

**Мой пример**:
- Код простой и понятный, без излишних сложностей.
- Используются минимальные зависимости (Express для сервера, Fetch API для клиента).
- Каждая функция выполняет одну задачу и делает это максимально просто:

Например, функция создания пользователя на сервере принимает данные из запроса, создает объект пользователя, добавляет его в массив, возвращает ответ.

Или функция создания пользователя на клиенте получает данные из полей ввода, отправляет их на сервер, выводит результат в консоль.

- Понятные имена переменных и функций (createUser, getEventStats)

## YAGNI
YAGNI (You aren't gonna need it; с англ. — «Вам это не понадобится») — процесс и принцип проектирования ПО, при котором в качестве основной цели декларируется отказ от избыточной функциональности, то есть отказ добавления функциональности, в которой нет непосредственной надобности. Принцип YAGNI помогает избежать избыточной сложности и сосредоточиться на том, что действительно нужно сейчас.

**Мой пример**:
- Реализованы только те endpoints, которые необходимы для выполнения текущих задач:
  1. Создание пользователя (POST /users).
  2. Получение пользователя (GET /users/:id).
  3. Создание мероприятия (POST /events).
  4. Получение списка мероприятий (GET /events).
  5. Регистрация на мероприятие (POST /register).
  6. Получение статистики по мероприятию (GET /stats/events/:eventId).
## DRY
DRY (Don’t repeat yourself) — принцип разработки программного обеспечения, призванный минимизировать дублирование информации в коде. Переводится с английского как «Не повторяйся».
- Не допускать копирования. Создавать функции и классы, которые можно переиспользовать вместо дублирования кода в разных местах.
- Соблюдать единую логическую цепочку. Поддерживать общую структуру и организацию кода.
- Перед добавлением новой функции проверить, возможно её аналог уже присутствует в проекте.
- Преимущественно улучшать и рефакторить существующий код, а не создавать новый, чтобы избежать дублирования функциональности.

**Мой пример для избежания дублирования кода**:
- Классы User, Event и Registration используются для создания объектов.
- Логика создания объектов (User, Event, Registration) вынесена в отдельные классы.
- Базовый URL API вынесен в константу.
## SOLID
SOLID — это мнемоническая аббревиатура пяти основных принципов объектно-ориентированного программирования и проектирования:

S (Single Responsibility Principle) — принцип единственной ответственности. Для каждого класса должно быть определено единственное назначение.

O (Open-Closed Principle) — принцип открытости-закрытости. Программные сущности (классы, модули, функции) должны быть открыты для расширения, но не для модификации.

L (Liskov Substitution Principle) — принцип подстановки Барбары Лисков. Подклассы должны иметь возможность служить заменой для своих суперклассов.

I (Interface Segregation Principle) — принцип разделения интерфейса. Необходимо создавать узкоспециализированные интерфейсы, предназначенные для конкретного клиента. Клиенты не должны зависеть от интерфейсов, которые они не используют.

D (Dependency Inversion Principle) — принцип инверсии зависимостей. Объектом зависимости должна быть абстракция, а не что-то конкретное.

**Мой пример для избежания дублирования кода**:
1. Single Responsibility Principle (Принцип единственной ответственности):
- Классы User, Event и Registration отвечают только за хранение данных.
- Каждый endpoint в Express и каждая функция на клиенте выполняет только одну задачу.
2. Open/Closed Principle (Принцип открытости/закрытости): Классы User, Event и Registration могут быть расширены (например, добавлением новых полей), но их основная логика не требует изменений. Тоже самое относится к функциям на клиенте - они могут быть расширены (например, добавлением новых параметров), но их основная логика не требует изменений.
3. Liskov Substitution Principle (Принцип подстановки Барбары Лисков):

  Классы User, Event и Registration могут быть расширены без изменения существующей логики. Например Класс AdminUser может использоваться вместо User без изменения логики:
  ```
  class AdminUser extends User {
    constructor(id, name, email, role, permissions) {
        super(id, name, email, role);
        this.permissions = permissions;
    }
}
  ```
4. Interface Segregation Principle (Принцип разделения интерфейса):
- Каждый endpoint предоставляет только те данные, которые необходимы клиенту.
- Каждая функция взаимодействует только с теми endpoint, которые ей необходимы (функция createUser взаимодействует только с POST /users).

5. Dependency Inversion Principle (Принцип инверсии зависимостей):
- Серверный код не зависит от конкретной реализации клиента. Он предоставляет API, которое может использоваться любым клиентом.
- Клиентский код зависит только от API сервера, а не от его внутренней реализации.

# Дополнительные принципы разработки
## BDUF. Big design up front («Масштабное проектирование прежде всего»)
**Подходит ли?** Нет.

**Почему?** BDUF предполагает детальное проектирование всей системы перед началом разработки. Это может быть полезно для крупных и сложных проектов, но для моей системы это избыточно. Моя система является относительно небольшой и ориентирована на конкретные задачи (координация мероприятий, регистрация, оповещение). Вместо этого лучше использовать итеративный подход, где можно начинать с минимальной функциональности и постепенно расширять систему.

## SoC. Separation оf concerns (принцип разделения ответственности)
**Подходит ли?** Да.

**Почему?** SoC предполагает разделение системы на отдельные компоненты, каждый из которых отвечает за свою задачу. Это полностью применимо к моей системе. Серверный код разделен на модули (например, User, Event, Registration), каждый из которых отвечает за свою задачу. Клиентский код разделен на функции (например, createUser, createEvent, registerForEvent), каждая из которых выполняет свою задачу.

## MVP. Minimum viable product (минимально жизнеспособный продукт)
**Подходит ли?** Да.

**Почему?** MVP предполагает создание минимальной версии продукта, которая решает ключевые задачи пользователей. Это идеально подходит для моей системы. Я как раз начала с реализации бащовых функций.

## PoC. Proof of concept (доказательство концепции)
**Подходит ли?** Частично.

**Почему?** PoC предполагает создание прототипа, который демонстрирует работоспособность ключевых идей системы. Это может быть полезно на начальном этапе, чтобы убедиться, что выбранные технологии и подходы работают. Но вместо этого лучше сразу перейти к созданию MVP, чтобы быстрее получить работающую систему.
