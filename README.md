Test Assignment
Проект "Test Assignment" является шаблонным веб-приложением, использующим React и Express. Приложение реализует основную структуру с использованием TypeScript, Redux, Socket.io и других библиотек.

Основные функции
 -React-приложение, созданное с использованием create-react-app
 -Взаимодействие с сервером с использованием axios
 -WebSocket коммуникация с использованием socket.io
 -Express сервер
Установка
Клонируйте репозиторий:
git clone https://github.com/DaniilOvsyanniukov/test-assignment.git

Перейдите в директорию проекта:
cd test-assignment

Установите необходимые зависимости:
npm run install

Конфигурация
Перед тем как запустить приложение, необходимо создать файл конфигурации .env в корневой директории проекта. Создайте файл с именем .env и добавьте следующие строки:

REACT_APP_SERVER_URL=http://localhost:3001
PORT=3001

Это укажет приложению, какой URL использовать для взаимодействия с сервером.

Запуск
Запустить локальный сервер (Express):
npm run server

Запустить React-приложение:
npm run start

Запустить оба (React app & Express server) одновременно:
npm run dev

Запустить оба (React app & Express server) одновременно через Docker:
npm run dev:docker

Сборка
Соберите проект для production:
npm run build

Это создаст оптимизированную сборку в папке build.

Зависимости
React & ReactDOM
React-Redux
React-Router-Dom
TypeScript
Axios
Express
Socket.io и Socket.io-client
... и другие (см. package.json для полного списка).