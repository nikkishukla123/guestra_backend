require('dotenv').config(); // 👈 sabse pehle

const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 5000;

console.log('ENV MONGO_URI:', process.env.MONGO_URI);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection failed', err);
  });
