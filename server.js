import { config } from "dotenv";
config();
import express from "express";
const app = express()
import path from "path";
import {fileURLToPath} from 'url';
import logger, {  logEvents } from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./config/dbConnection.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import mongoose from "mongoose";
import passport from "passport";
import bodyParser from "body-parser";

import authRoute from "./routes/auth.js";
import permissionRoute from "./routes/permissions.js";
import roleRoute from "./routes/roles.js";
import rootRoute from "./routes/root.js";
import userRoute from "./routes/users.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8123

connectDB()

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

// Inisialisasi passport
// require('./config/passport')(passport);
import p from "./config/passport.js";
p(passport);
app.use(passport.initialize());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', rootRoute)
// // app.use('/groups', require('./routes/groupRoutes'))
app.use('/auth', authRoute)
app.use('/users', userRoute)
app.use('/permission', permissionRoute)
app.use('/role', roleRoute)

app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: "404 Not Found"})
    } else{
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
