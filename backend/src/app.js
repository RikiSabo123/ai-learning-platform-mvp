require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models');

const userRoutes = require('./routes/userRoute');
const categoryRoutes = require('./routes/categoryRoute');
const promptRoutes = require('./routes/promptRoute');
const adminRoutes = require('./routes/adminRoute');
const AIRoutes = require('./routes/AIRoute');
const PORT = process.env.PORT || 3000;


// === basic middlewares ===
app.use(cors({
    // allow requests from the frontend 
    origin: 'http://localhost:5173', 
    credentials: true 
}));app.use(express.json());
app.use(cookieParser()); 

// === JSON Syntax Error Handler ===
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            success: false,
            message: "Invalid JSON syntax in request body"
        });
    }
    next();
});
// === check for required environment variables at startup ===
const REQUIRED_ENV_VARS = ['OPENAI_API_KEY', 'DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
REQUIRED_ENV_VARS.forEach((varName) => {
    if (!process.env[varName]) {
        console.error(`CRITICAL ERROR: Missing required environment variable: ${varName}`);
        console.error(`Please check your .env file or environment configuration.`);
        process.exit(1);
    }
});
// ===routers of the app ===
app.get('/', (req, res) => {
    res.json({ message: 'AI Learning Platform API is running' });
});

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/prompts', promptRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', AIRoutes);

// ===global error handler ===
app.use((err, req, res, next) => {
    console.error('Global Error Handler caught an error:', err);

    // if the error has a statusCode property, use it; otherwise, default to 500
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

// ===start the server after syncing the database ===
sequelize.authenticate().then(() => {
    app.listen(PORT, () => {
        // server started
    });
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});