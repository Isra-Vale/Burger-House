# 🍔 Burger House API Contract

## Base URL

```
http://localhost:5000/api
```

---

## 🔐 Authentication

Protected routes require:

```
Authorization: Bearer <token>
```

---

## 🔐 Auth Endpoints

### POST /auth/register

**Request**

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response — 201**

```json
{
  "token": "string",
  "user": {
    "id": "number",
    "name": "string",
    "email": "string",
    "role": "user | admin"
  }
}
```

---

### POST /auth/login

**Request**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response — 200**

```json
{
  "token": "string",
  "user": {
    "id": "number",
    "name": "string",
    "email": "string",
    "role": "user | admin"
  }
}
```

---

### GET /auth/me

🔒 Requires authentication

**Response — 200**

```json
{
  "user": {
    "id": "number",
    "name": "string",
    "email": "string",
    "role": "user | admin"
  }
}
```

---

## 🍔 Burger Endpoints

### GET /burgers

**Query**

* `search` (string, optional) — filter by name or category

**Response — 200**

```json
[
  {
    "id": "number",
    "name": "string",
    "category": "Beef | Chicken | Veggie | Combo",
    "price": "number",
    "rating": "number",
    "description": "string",
    "image": "string",
    "ingredients": "string"
  }
]
```

---

### GET /burgers/:id

**Response — 200**

```json
{
  "id": "number",
  "name": "string",
  "category": "Beef | Chicken | Veggie | Combo",
  "price": "number",
  "rating": "number",
  "description": "string",
  "image": "string",
  "ingredients": "string"
}
```

---

### POST /burgers

🔒 Admin only

**Request**

```json
{
  "name": "string",
  "category": "Beef | Chicken | Veggie | Combo",
  "price": "number",
  "rating": "number",
  "description": "string",
  "image": "string (optional)",
  "ingredients": "string"
}
```

**Response — 201**
Same as GET burger object

---

### PATCH /burgers/:id

🔒 Admin only
All fields are optional (partial update)

**Response — 200**
Updated burger object

---

### DELETE /burgers/:id

🔒 Admin only

**Response — 200**

```json
{
  "message": "Burger deleted successfully"
}
```

---

## 📞 Contact Endpoint

### POST /contact

**Request**

```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```

**Response — 200**

```json
{
  "message": "Message sent successfully"
}
```

---

## 🛒 Order Endpoints

### GET /orders

🔒 Admin only

**Response — 200**

```json
[
  {
    "id": "string",
    "customer": "string",
    "total": "number",
    "status": "Pending | Preparing | On the way | Delivered",
    "items": [
      {
        "burgerId": "number",
        "name": "string",
        "quantity": "number",
        "price": "number"
      }
    ],
    "createdAt": "string (ISO 8601)"
  }
]
```

---

### POST /orders

🔒 Requires authentication
Customer is derived from authenticated user

**Request**

```json
{
  "items": [
    {
      "burgerId": "number",
      "quantity": "number"
    }
  ],
  "total": "number"
}
```

**Response — 201**
Same as order object

---

### PATCH /orders/:id/status

🔒 Admin only

**Request**

```json
{
  "status": "Pending | Preparing | On the way | Delivered"
}
```

**Response — 200**

```json
{
  "message": "Status updated successfully"
}
```

---

### DELETE /orders/:id

🔒 Admin only

**Response — 200**

```json
{
  "message": "Order deleted successfully"
}
```

---

## ⚠️ Error Response

```json
{
  "message": "string"
}
```

---

## 📋 Status Codes

| Code | Meaning      |
| ---- | ------------ |
| 200  | OK           |
| 201  | Created      |
| 400  | Bad Request  |
| 401  | Unauthorized |
| 403  | Forbidden    |
| 404  | Not Found    |
| 500  | Server Error |

---

## 📝 Notes

* Dates use ISO 8601 format
* Server enforces validation rules (length, format, ranges)
* All protected routes require authentication

---

## 🎭 Mock System Overview

The frontend includes an API layer that can switch between mock data and real backend requests.

---

### API Layer

```
src/api/
├── burgerApi.js
├── authApi.js
├── orderApi.js
└── contactApi.js
```

* These modules are used by all frontend components
* They act as the single source for data fetching

---

### Configuration
src/config/index

```js
export const USE_MOCK_DATA = true
```

| Value   | Behavior                                          |
| ------- | ------------------------------------------------- |
| `true`  | API layer returns mock data (no backend required) |
| `false` | API layer sends real HTTP requests                |

---

### How It Works

* Components never call the backend directly
* They always use `src/api/*`
* The API layer decides whether to:

  * Return mock data
  * OR call the real backend

---

### Mock Mode Features

* Full app works without backend
* Authentication accepts any credentials
* CRUD operations work in memory
* Ideal for development and demos

---

### Real Backend Setup

1. Set:

```js
export const USE_MOCK_DATA = false
```

2. Create `.env`:

```
VITE_API_URL=http://localhost:5000/api
```

3. Implement all endpoints in this contract
4. Enable CORS for `http://localhost:5173`

