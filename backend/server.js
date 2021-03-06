const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const colors = require('colors');
//const connectDB = require('./config/db');
const path = require('path');
const mongoose = require('mongoose');

dotenv.config({ path: 'backend/config/config.env' });


const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!')
});

app.use(cors());
app.use(express.json());


//connectDB();

app.use('/api/v1/upload', require('./routes/router'));


app.use(express.static('/../frontend/public/image'))


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/../frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, '/../frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running....')
    })
}



app.listen(PORT, () => {
    console.log(`server running a ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.bgYellow.bold);
})