const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db.js');
const authRoute = require('./routes/auth.routes.js');
const userRoute = require('./routes/user.routes.js');
const marksheetRoute = require('./routes/marksheet.routes.js');
const permissionRoute = require('./routes/permission.routes.js')
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/marksheet', marksheetRoute);
app.use('/api/permission', permissionRoute);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});