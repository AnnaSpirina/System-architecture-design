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
![image](https://github.com/user-attachments/assets/bb9eb571-5e2b-4039-9079-4f872b441a7e)
# Применение основных принципов разработки
