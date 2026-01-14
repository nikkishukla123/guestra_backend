🚀 Guestara – Menu & Pricing Engine (Backend)

This is the backend for a menu management system that handles complex pricing logic.
Instead of just saving a price in a database, this system calculates the final bill at runtime based on rules like:

Discounts

Usage-based tiers

Tax settings

🛠️ Tech Stack

Node.js & Express – Core backend framework

MongoDB & Mongoose – Flexible data storage

Layered Architecture – Clean separation of concerns

🏗️ Project Structure

To keep the code clean and maintainable, the project is structured by responsibility:

src/
├── models/        # Database schemas
├── controllers/   # Request handling & validation
├── routes/        # API endpoints
├── services/      # Core business logic (pricing, tax)
├── app.js         # Express app configuration
├── server.js      # Server startup & DB connection


This structure makes it easy to extend features without breaking existing logic.

💰 Pricing Engine (Core Feature)

The most important part of this project is that it does not store a final price.
Instead, the price is calculated every time the API is called.

Supported Pricing Types

Static Pricing – Fixed price

Complimentary Pricing – Always free

Discounted Pricing – Flat or percentage discount

Tiered Pricing – Price based on usage duration

All pricing logic is handled inside a dedicated service:

services/pricing.service.js

Example

A meeting room might cost:

₹300 for up to 1 hour

₹500 for up to 2 hours

The system automatically picks the correct slab based on usage.

📑 Key Features & Business Logic
🧾 Tax Inheritance

Tax is not stored on every item.
Instead, items inherit tax from their Category.

Example:

If the Beverages category has a 5% tax

Every drink under it automatically applies 5%

Why this approach?
If tax rules change, you update it in one place instead of updating hundreds of items.

🗑️ Soft Delete

Data is never permanently deleted.

Uses an is_active flag

Setting is_active: false hides the item from the menu

Useful for history, reports, and real-world safety

🔍 Price Calculation API
Endpoint
GET /items/:id/price

Returns

Base Price

Discount Amount

Tax Amount

Final Payable Price (Grand Total)

This ensures all business rules are applied dynamically.

📅 Availability & Booking System

Items can optionally be marked as bookable using the is_bookable flag.

Each bookable item defines:

Available days (e.g. Mon–Fri)

Fixed time slots (e.g. 10:00–11:00)

🔎 Available Slots API
GET /bookings/:itemId/slots?date=YYYY-MM-DD


What it does:

Fetches all possible slots from the item

Removes already booked slots for the given date

Returns only free slots

📝 Booking API
POST /bookings/:itemId/book


Before creating a booking, the system checks:

Same item

Same date

Same time slot

If a conflict exists, booking is rejected.

This prevents double booking and ensures correct slot availability.

⚙️ Setup Instructions
1️⃣ Clone & Install
git clone https://github.com/nikkishukla123/guestra_backend
npm install

2️⃣ Environment Variables

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string

3️⃣ Run the Server
npm start

🔮 Future Improvements

Add-ons system (extra cheese, toppings, etc.)

Time-based pricing (happy hours, peak pricing)

More automated tests

🙌 Final Note

This project focuses on correct business logic, clean structure, and real-world backend thinking rather than just CRUD operations.