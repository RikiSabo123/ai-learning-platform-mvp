require('dotenv').config();
const express=require('express');
const app=express();
const cors=require('cors');
const { sequelize } = require('./models');

const userRoutes=require('./routes/userRoute');
const categoryRoutes=require('./routes/categoryRoute');
const promptRoutes=require('./routes/promptRoute');
const adminRoutes=require('./routes/adminRoute');

const PORT=process.env.PORT || 3000;
//Middleware
app.use(cors());
app.use(express.json());
//Routes
app.use('/api/users',userRoutes);
app.use('/api/categories',categoryRoutes);
app.use('/api/prompts',promptRoutes);
app.use('/api/admin',adminRoutes);
//Sync database and start server
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
}
);
