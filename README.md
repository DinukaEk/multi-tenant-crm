# Multi-Tenant CRM System

A full-stack **Customer Relationship Management (CRM)** system built with **Django REST Framework** and **React (Vite)**.
This project demonstrates a **multi-tenant architecture**, role-based access control, and modern web application practices.

The system allows organizations to manage companies and contacts while ensuring **data isolation between organizations**.

---

# System Overview

This CRM platform supports multiple organizations, where each organization manages its own companies and contacts.

The system implements:

* Secure authentication using **JWT**
* **Role-based access control**
* **Multi-tenant data separation**
* **Activity logging for auditing**
* **AWS S3 storage for file uploads**
* A **modern React dashboard interface**

---

# Architecture

The system follows a **client-server architecture**.

```
Frontend (React + Vite)
        |
        | REST API
        |
Backend (Django REST Framework)
        |
        | ORM
        |
PostgreSQL Database
        |
        | File Storage
        |
AWS S3
```

### Backend Modules

```
backend/
│
├── users            # Authentication and user management
├── organizations    # Multi-tenant organizations
├── companies        # Company management
├── contacts         # Contact management
├── activity_logs    # System activity tracking
└── config           # Django project configuration
```

### Frontend Structure

```
frontend/
│
├── src/
│   ├── pages
│   ├── components
│   ├── api
│   └── routes
│
└── Vite + React
```

---

# Key Features

## Authentication

* JWT authentication using **SimpleJWT**
* Secure login API
* Token-based API access

---

## Role-Based Access Control

The system defines three roles:

| Role    | Permissions                                             |
| ------- | ------------------------------------------------------- |
| Admin   | Full system access                                      |
| Manager | Manage companies and contacts within their organization |
| Staff   | Read-only access                                        |

Permissions are enforced **both in backend APIs and frontend UI**.

---

## Multi-Tenant Organization System

Organizations represent tenants in the system.

Each user belongs to an organization, ensuring:

* Users can only access data from their organization
* Data is isolated between organizations

Admins can create organizations and assign users to them.

---

## Company Management

Users can:

* Create companies
* Upload company logos
* Search companies
* View company details

Company logos are stored in **AWS S3** instead of the local filesystem.

---

## Contact Management

Each company can have multiple contacts.

Managers can:

* Create contacts
* Update contact information

Staff members have **read-only access**.

---

## Activity Logging

The system tracks important actions such as:

* Creating companies
* Updating contacts
* Deleting records

Each activity log records:

* User
* Action type
* Target object
* Timestamp

This provides an **audit trail for system operations**.

---

## Organization Subscription Plans

Organizations can select a subscription plan:

* **Basic**
* **Pro**

Organization names must be **unique**.

---

# User Interface

The React frontend provides a modern dashboard with:

* Sidebar navigation
* Company management pages
* Activity log viewer
* Role-based UI visibility
* Responsive layout

Users only see features permitted by their role.

---

# Technologies Used

### Backend

* Python
* Django
* Django REST Framework
* SimpleJWT
* PostgreSQL

### Frontend

* React
* Vite
* Axios
* React Router

### Cloud & Storage

* AWS S3

### Development Tools

* Git
* GitHub
* VS Code

---

# Installation Guide

## 1. Clone the Repository

```
git clone https://github.com/DinukaEk/multi-tenant-crm.git
cd multi-tenant-crm
```

---

## 2. Backend Setup

Navigate to the backend folder.

```
cd backend
```

Create virtual environment.

```
python -m venv venv
```

Activate environment.

Windows

```
venv\Scripts\activate
```

Install dependencies.

```
pip install -r requirements.txt
```

---

## 3. Configure Environment Variables

Create a `.env` file using the provided example.

```
cp .env.example .env
```

Fill in values for:

```
SECRET_KEY
DATABASE settings
AWS credentials
```

---

## 4. Run Migrations

```
python manage.py makemigrations
python manage.py migrate
```

---

## 5. Create Admin User

```
python manage.py createsuperuser
```

---

## 6. Start Backend Server

```
python manage.py runserver
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

## 7. Frontend Setup

Navigate to frontend.

```
cd frontend
```

Install dependencies.

```
npm install
```

Run the development server.

```
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# API Endpoints

## Authentication

```
POST /api/v1/auth/login/
```

Returns:

```
access token
refresh token
user role
organization
```

---

## Companies

```
GET /api/v1/companies/
POST /api/v1/companies/
DELETE /api/v1/companies/{id}/
```

---

## Contacts

```
GET /api/v1/contacts/
POST /api/v1/contacts/
```

---

## Activity Logs

```
GET /api/v1/activity-logs/
```

---

# Demo Workflow

1. Login as Admin
2. Create Organization
3. Create Manager user
4. Manager logs in
5. Manager creates companies
6. Add contacts to companies
7. View activity logs
8. Login as staff to verify read-only access

---

# Security Features

* JWT authentication
* Role-based permissions
* Multi-tenant data filtering
* Soft deletion for records
* Secure file storage using AWS S3

---

# Future Improvements

Possible enhancements:

* Email notifications
* Subscription billing integration
* Advanced analytics dashboard
* Role management UI

---
