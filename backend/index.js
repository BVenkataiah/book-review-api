import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose';
import authRouter from './routes/authRoutes.js';
import bookRouter from './routes/bookRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
const app = express();


app.use(express.json());
app.use("/api", authRouter);
app.use("/api", bookRouter);
app.use("/api", reviewRouter);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 4000, () =>
        console.log(`Server running on port ${process.env.PORT || 4000}`)
    );
}).catch(err => console.error(err));
