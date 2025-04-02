const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors');

const express = require('express');
const connectDB = require("./config/db.js");
const userRoute = require('./routes/user.routes.js');
const app = express();
app.use(cors())
app.use(express.json());        
app.use(express.urlencoded({ extended: true }));  
app.use(express.static("public"));

connectDB();

app.use('/api/user', userRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
