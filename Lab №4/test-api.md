# Тестирование API
## 1. Работа со студенческими организациями
`Endpoint: POST /organizations`
### 1.1. Добавление студенческой организации
**Тест 1: Успешное создание организации**

**Ожидаемый результат:**

Статус код: 201 Created

Тело ответа: JSON с данными созданной организации.
![image](https://github.com/user-attachments/assets/6a7e37e5-817a-46ce-adb4-e60c29f9ef84)


**Тест 2: Ошибка валидации (не хватает обязательных полей)**

Статус код: 400 Bad Request

Тело ответа: Сообщение об ошибке.
![image](https://github.com/user-attachments/assets/d1897955-3dff-48e7-b21d-4080bb3b1db5)

### 1.2. Изменение данных студенческой организации
`Endpoint: PUT /organizations/{id}`
**Тест 1**: Успешное обновление организации

**Ожидаемый результат:**

Статус код: 200 OK

Тело ответа: JSON с обновленными данными организации.
![image](https://github.com/user-attachments/assets/ce8ad50b-2d7b-4fab-8ebb-673fa133e4fa)

**Тест 2:** Организация не найдена

**Ожидаемый результат:**

Статус код: 404 Not Found

Тело ответа: Сообщение об ошибке.
![image](https://github.com/user-attachments/assets/8a3e6454-607a-46cc-8cd2-1b688800f7fb)

### 1.3. Назначение руководителя организации
`Endpoint: POST /organizations/{id}/assign-leader`

**Тест 1:** Успешное назначение руководителя

**Ожидаемый результат:**

Статус код: 200 OK

Тело ответа: JSON с обновленными данными организации.
![image](https://github.com/user-attachments/assets/31f72e93-b82c-477f-acf4-2a701467a32d)

**Тест 2:** Организация или пользователь не найдены

**Ожидаемый результат:**

Статус код: 404 Not Found

Тело ответа: Сообщение об ошибке.
![image](https://github.com/user-attachments/assets/fafe514f-ce46-4a14-a835-ddb9a347e0df)

### 1.4. Удаление студенческой организации
`Endpoint: DELETE /organizations/{id}`

**Тест 1**: Успешное удаление организации

**Ожидаемый результат:**

Статус код: 204 No Content
![image](https://github.com/user-attachments/assets/aefa0b8c-922a-4905-a137-0e99c9ed9790)

**Тест 2:** Организация не найдена

**Ожидаемый результат:**

Статус код: 404 Not Found
![image](https://github.com/user-attachments/assets/6a227c4d-92db-4494-89f6-793b56a3c1e8)

## 2. Работа с мероприятиями
### 2.1. Создание мероприятия
`Endpoint: POST /events`

**Тест 1:** Успешное создание мероприятия

**Ожидаемый результат:**

Статус код: 201 Created

Тело ответа: JSON с данными созданного мероприятия.
![image](https://github.com/user-attachments/assets/81d1a0c7-ec26-4421-a4c5-295ea9f8334d)

**Тест 2:** Ошибка валидации (не хватает обязательных полей)

**Ожидаемый результат:**

Статус код: 400 Bad Request

Тело ответа: Сообщение об ошибке.
![image](https://github.com/user-attachments/assets/d08adcdb-b149-47c3-8855-b28f72671a4f)

### 2.2. Генерация QR-кода для мероприятия
`Endpoint: GET /events/{id}/qr-code`

**Тест 1:** Успешная генерация QR-кода

**Ожидаемый результат:**

Статус код: 200 OK

Тело ответа: Изображение QR-кода или данные для его генерации.
![image](https://github.com/user-attachments/assets/e4ae4de2-2c63-4226-a14d-354a3ba64949)

**Тест 2:** Мероприятие не найдено

**Ожидаемый результат:**

Статус код: 404 Not Found
![image](https://github.com/user-attachments/assets/569ddae0-78c7-4e2c-964a-0f90ac011544)

### 2.3. Отмена мероприятия
`Endpoint: DELETE /events/{id}`

**Тест 1:** Успешная отмена мероприятия

**Ожидаемый результат:**

Статус код: 204 No Content
![image](https://github.com/user-attachments/assets/015c6d35-a8fa-4183-92de-c86d5f19a90c)

**Тест 2:** Мероприятие не найдено

**Ожидаемый результат:**

Статус код: 404 Not Found
![image](https://github.com/user-attachments/assets/e323568b-abce-4588-bb8e-e3f02fbd67c0)

### 2.4. Получение списка всех мероприятий
**Тест 1:** Список мероприятий пуст

**Ожидаемый результат:**

Статус код: 200 OK

Тело ответа: Пустой массив [] (если мероприятий нет).
![image](https://github.com/user-attachments/assets/33d3a7e7-f0c6-44da-b4da-8bda320d5a36)

**Тест 2:** Успешное получение списка мероприятий

**Ожидаемый результат:**

Статус код: 200 OK

Тело ответа: Массив мероприятий в формате JSON.
![image](https://github.com/user-attachments/assets/2ad1d16c-9708-4736-9ac2-2969a0f6bf28)

## 3. Работа с пользователями
### 3.1. Регистрация студента
`Endpoint: POST /students/register`

**Тест 1:** Успешная регистрация студента

**Ожидаемый результат:**

Статус код: 201 Created

Тело ответа: JSON с данными зарегистрированного студента.
![image](https://github.com/user-attachments/assets/7d67bf22-d28d-42e9-9f77-c4db3c2bf948)

**Тест 2:** Пользователь с такой почтой уже существует

**Ожидаемый результат:**

Статус код: 409 Conflict

Тело ответа: Сообщение об ошибке.
![image](https://github.com/user-attachments/assets/2ff4e6f8-ffe9-474f-83ec-9e485c79b9c7)

### 3.2. Подписка на студенческую организацию
`Endpoint: POST /students/{studentId}/subscribe/{organizationId}`

**Тест 1:** Успешная подписка

**Ожидаемый результат:**

Статус код: 200 OK

Тело ответа: Сообщение об успешной подписке.
![image](https://github.com/user-attachments/assets/b5e4f9cf-495f-4ddd-b96d-7774281c8b2d)


**Тест 2:** Студент или организация не найдены

**Ожидаемый результат:**

Статус код: 404 Not Found
![image](https://github.com/user-attachments/assets/56854b31-00af-4a2e-a568-6ced8cf802eb)
