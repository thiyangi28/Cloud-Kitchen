# Cloud Kitchen Management System 🍳

A modern, full-stack Cloud Kitchen Management System built with a focus on speed, security, and a premium user experience. This system allows administrators to manage multiple food vendors, track order history in real-time, and monitor kitchen performance via a sleek, glassmorphism-themed dashboard.

---

## ✨ Features

### 🛡️ Secure Authentication
- **JWT-based Security**: Robust authentication using JSON Web Tokens.
- **Login & Registration**: Unified access control for kitchen administrators.
- **Protected Routes**: Secure endpoints for sensitive data management.

### 🏢 Vendor Management
- **Full CRUD**: Add, View, Edit, and Remove vendors.
- **Contact Details**: Keep track of vendor locations and contact information.
- **Active Status**: Monitor the status of each kitchen partner.

### 📋 Order Management
- **Order Lifecycle**: Track orders from 'Pending' to 'Delivered'.
- **Vendor Filtering**: Easily filter orders based on specific vendors.
- **Status Updates**: Update order progress in real-time.
- **Detailed Tracking**: Unique order numbers and customer transaction history.

### 📊 Interactive Dashboard
- **Real-time Stats**: Instant overview of Total Vendors, Orders, Revenue, and Active Users.
- **Promotional Carousel**: High-quality UI components for announcements and featured items.
- **Premium UI**: Dark-themed glassmorphism design for a modern look and feel.

---

## 🛠️ Technology Stack

### Backend (Spring Boot)
- **Framework**: Spring Boot 3.x
- **Security**: Spring Security with JWT
- **Persistence**: Spring Data JPA
- **Database**: PostgreSQL (via Docker)
- **Utilities**: Lombok, Maven

### Frontend (React)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API Client**: Axios with interceptors
- **Animation**: Modern CSS Transitions & Glassmorphism

---

## 🚀 Getting Started

### Prerequisites
- **JDK 17** or higher
- **Node.js** (v18+) & **npm**
- **Docker Desktop** (optional, for database)

### External Dependencies
Make sure you have a database running. You can use the provided docker-compose configuration:
```bash
docker-compose up -d
```

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd Backend/cloud_kitchen
   ```
2. Configure your database in `src/main/resources/application.properties`.
3. Build and run the project:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend/latest
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
---

## 🎨 GUI
<img width="1917" height="871" alt="image" src="https://github.com/user-attachments/assets/da282d55-380c-4d42-8dcc-f37d601f2a7a" />
<img width="1897" height="860" alt="image" src="https://github.com/user-attachments/assets/0e56a2ac-e4ba-4cb1-b643-38ec82f7301c" />
<img width="1892" height="822" alt="image" src="https://github.com/user-attachments/assets/725d9959-4a0e-4075-a762-3565b4b3654c" />




---


