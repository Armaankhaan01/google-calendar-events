# Google Calendar Events

**Google Calendar Events** is a full-stack application that integrates with the Google Calendar API, allowing users to manage their events seamlessly. With this application, users can:

- View, create, and delete events directly from their Google Calendar.
- Filter and search events based on criteria like summary and date.
- Access detailed information about each event, including status, organizer details, event link, duration, and recurrence type.

## Tech Stack Justification

### Backend: Node.js

- **Asynchronous and Non-blocking I/O :** Perfect for handling multiple concurrent requests efficiently, ideal for building scalable RESTful APIs.
- **Rich Ecosystem:** Provides robust libraries like express for routing, googleapis and google-auth-library for the calendar application.
- **Ease of Integration:** Seamlessly integrates with databases (e.g., MongoDB) and external APIs (e.g., Google Calendar API).

### Frontend: React.js

- **Dynamic and Responsive UI :** React’s component-based architecture allows building dynamic and high-performance user interfaces.
- **Ant Design & Tailwind CSS :** Combined for professional, responsive, and aesthetically pleasing UI components.
- **Reusable Components :** Encourages code reusability and improves maintainability.
- **Rich Tooling:** Extensive library support and tools like React Developer Tools simplify debugging and enhance productivity.

## Features

- **Modern UI:** Built with Ant Design and styled using Tailwind CSS for a polished and responsive interface.
- **Dockerized Setup:** Fully containerized environment with docker-compose for easy deployment.
- **Google Calendar API Integration:** Efficiently manages calendar events using Google Calendar's REST API.
- **Scalable Deployment:** Hosted on Vercel for fast, scalable, and globally distributed frontend performance.
- **Custom Filters:** Flexible event filtering options for better event management.
- **Secure OAuth Integration:** Google OAuth 2.0 for secure user authentication.

## Deployment

#### Prerequisites

- Get the `.env` variables from google cloud console

```bash
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

- Scope for calendar api

```bash
 "https://www.googleapis.com/auth/userinfo.email",
 "https://www.googleapis.com/auth/userinfo.profile",
 "https://www.googleapis.com/auth/calendar",
 "https://www.googleapis.com/auth/calendar.events",
 "https://www.googleapis.com/auth/calendar.readonly",
 "https://www.googleapis.com/auth/calendar.events.readonly",
```

### 1. Using Docker

To deploy this project run

#### Prerequisites

- Docker installed on your system

#### Steps:

- Clone the repository:

```bash
 git clone https://github.com/Armaankhaan01/google-calendar-events.git
 cd google-calendar-events
```

- Create a `.env` file in the `root` directory with the following variables

```
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_secret_here
GOOGLE_REDIRECT_URI=http://localhost:5173
VITE_BACKEND_URL=http://localhost:5000
```

- Build and run the Docker containers:

```bash
docker-compose up --build
```

- Access the application
- **Frontend:** `http://localhost:5173`
- **Backend:** `http://localhost:5000`

### 2. Manual Deployment (Node.js)

#### Backend Setup

- Navigate to the backend folder:

```bash
cd backend
```

- Install Dependencies

```bash
npm install
```

- Create a `.env` file in the `backend` directory with the following variables

```bash
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
NODE_ENV=development
PORT=5000
```

- Start the server:

```bash
npm run start
```

#### Frontend Setup

- Navigate to the frontend folder:

```bash
cd frontend
```

- Install Dependencies

```bash
npm install
```

- Create a `.env` file in the `frontend` directory with the following variables

```bash
VITE_GOOGLE_CLIENT_ID =
VITE_BACKEND_URL =
```

- Start the server:

```bash
npm run dev
```

## Screenshots

![App Screenshot1](https://ibb.co/NNVZps1)
![App Screenshot2](https://ibb.co/YPG6Xfy)
![App Screenshot3](https://ibb.co/Wn3bHmY)

## Authors

- [@Arman Khan](https://www.github.com/Armaankhaan01)
