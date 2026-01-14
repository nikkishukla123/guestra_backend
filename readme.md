# Guestara – Menu & Pricing Engine (Backend)

This project is a backend system for managing menus, services, and bookings with real-world pricing logic. Instead of storing a fixed final price in the database, the system calculates prices dynamically at runtime based on business rules.

The main goal of this project was to focus on engineering thinking, not just CRUD APIs.

## Tech Stack

- Node.js & Express – Backend framework
- MongoDB & Mongoose – Database and ODM
- Joi – Request validation
- Swagger (OpenAPI) – API documentation
- Layered Architecture – Clean separation of responsibilities

## Overall Architecture

The project follows a layered architecture to keep the code clean and maintainable.

```
src/
├── models/        # Database schemas (MongoDB)
├── controllers/   # Handle requests & responses
├── routes/        # API routes
├── services/      # Core business logic (pricing, tax)
├── validations/   # Joi validation schemas
├── config/        # Swagger and app configs
├── app.js         # Express app setup
├── server.js      # Server startup & DB connection
```

### Why this structure?

- Controllers stay thin and readable
- Business logic lives in services
- Validation happens before data reaches the database
- New features can be added without breaking existing code

## Data Modeling Decisions

### Category
- Stores tax configuration
- Uses `is_active` for soft deletes

### Item
- Belongs to a category
- Supports exactly one pricing type
- Can optionally support:
  - Add-ons
  - Booking availability

### Booking
- Stored in a separate collection
- Tracks actual slot reservations instead of rules

This separation helps avoid data duplication and keeps the system scalable.

## Pricing Engine (Core Feature)

The pricing engine calculates prices every time the API is called instead of storing a final price.

### Supported Pricing Types
- Static Pricing – Fixed price
- Complimentary Pricing – Always free
- Discounted Pricing – Flat or percentage discount
- Tiered Pricing – Price based on usage duration

All pricing logic is handled inside: `services/pricing.service.js`

### Tiered Pricing Example
- Up to 1 hour → ₹300
- Up to 2 hours → ₹500

If a user requests 1.5 hours, the system automatically selects the ₹500 tier.

## Tax Inheritance

Tax is not stored at the item level.

### How it works:
- Items inherit tax from their category
- Tax is applied dynamically during price calculation

### Why this approach?
If tax rules change, updating one category automatically updates pricing for all related items — without touching item records.

## Add-ons System

Items can define add-ons such as:
- Extra cheese
- Olives
- Packaging (mandatory)

### Rules:
- Mandatory add-ons are always included
- Optional add-ons are included only when selected
- Add-ons are added before tax calculation

This mirrors how real restaurant pricing works.

## Availability & Booking System

Items can optionally be marked as bookable.

Each bookable item defines:
- Available days (e.g. Mon–Fri)
- Fixed time slots (e.g. 10:00–11:00)

### Available Slots API
```
GET /bookings/:itemId/slots?date=YYYY-MM-DD
```

This API:
- Reads all possible slots from the item
- Removes already booked slots
- Returns only free slots

### Booking API
```
POST /bookings/:itemId/book
```

Before creating a booking, the system checks for an existing booking with the same:
- Item
- Date
- Time slot

This prevents double booking.

## Price Calculation API
```
GET /items/:id/price
```

Returns:
- Base price
- Discount
- Add-ons total
- Tax
- Final payable price

This ensures all business rules are applied consistently.

## Soft Delete Strategy

- Records are never permanently deleted
- Uses `is_active = false`
- Keeps historical data intact
- Matches real production systems

## How to Run the Project Locally

### 1. Clone & Install
```
git clone https://github.com/nikkishukla123/guestra_backend
npm install
```

### 2. Environment Variables
Create a `.env` file:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### 3. Run the Server
```
npm start
```

Swagger API docs will be available at: `http://localhost:5000/api-docs`

## Trade-offs & Simplifications

Due to time constraints, some features were intentionally simplified or deferred:
- Add-on groups (choose 1 of many)
- Time-based dynamic pricing windows
- Advanced booking overlap logic

The architecture is designed so these can be added later without major refactoring.

## Written Reflections

### Why did you choose MongoDB?
MongoDB provides flexibility for evolving schemas, which was useful for handling different pricing types, add-ons, and booking structures.

### Three things I learned
- Designing pricing as runtime logic instead of static data
- Importance of separating business logic from controllers
- Validating APIs early using Joi to avoid bad data

### Hardest challenge
Designing the pricing engine to handle multiple pricing strategies cleanly without mixing logic.

### What I would improve with more time
- Add automated tests
- Improve booking overlap handling
- Implement advanced add-on groups

## Final Note

This project focuses on clean architecture, correct business logic, and real-world backend design, rather than just implementing CRUD operations.
