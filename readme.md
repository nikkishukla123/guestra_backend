Guestara – Menu & Pricing Engine
This is the backend for a menu management system that handles complex pricing logic. Instead of just saving a price in a database, this system calculates the final bill at runtime based on rules like discounts, usage tiers, and tax settings.

🚀 The Tech Stack
Node.js & Express: The core framework.

MongoDB & Mongoose: For flexible data storage.

Layered Architecture: Keeping the code organized by separating Routes, Controllers, and Business Logic (Services).

🏗️ How the Project is Structured
To keep the code clean, I’ve divided the folders by responsibility:

Models: Where the database "blueprints" live.

Controllers: The gatekeepers that handle requests and send back responses.

Services: This is the heart of the app. All the math for pricing and taxes happens here.

Routes: The URL paths (endpoints).

💰 The Pricing Engine (Core Feature)
The most important part of this project is that it doesn't just store a "final price." It calculates it every time you ask.

Supported Pricing Types:
Static: A simple fixed price (e.g., Coffee = ₹200).

Complimentary: Items that are always free (₹0).

Discounted: Takes a base price and applies either a flat amount (₹50 off) or a percentage (10% off). It also makes sure the price never goes below zero.

Tiered (Usage-based): * Price changes based on how long you use something.

Example: A meeting room might be ₹300 for 1 hour, but ₹500 for 2 hours. The system automatically picks the right "slab."

📑 Key Features & Logic
1. Tax Inheritance
I decided not to save tax on every single item. Instead, items "inherit" tax from their Category.

If the "Beverages" category has a 5% tax, every drink in that category automatically applies it.

Why? If the government changes tax rates, you only update it in one place (the Category), not for 1,000 items.

2. Soft Delete
We don't actually delete data. We use an is_active flag.

Setting is_active: false hides the item from the menu but keeps the data safe for historical records or reports.

3. The Price API
GET /items/:id/price This endpoint gives you a full breakdown:

Base Price

Discount Amount

Tax Amount

Final Payable Price (The "Grand Total")

🛠️ How to Set It Up
Clone & Install:

Bash

git clone https://github.com/nikkishukla123/guestra_backend
npm install
Environment Variables: Create a .env file and add:

Plaintext

PORT=5000
MONGO_URI=your_mongodb_connection_string
Run it:

Bash

npm start
💡 Future Plans
Add-ons: Support for "extra cheese" or "extra toppings."

Time-based Pricing: Happy hours (8 PM - 10 PM) where prices change automatically.

Booking: Adding a calendar for slot management.