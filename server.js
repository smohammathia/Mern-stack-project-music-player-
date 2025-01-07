const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const upload = multer({ dest: 'uploads/' });

mongoose.connect('mongodb://localhost/music_player', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({ username: String, password: String });
const User = mongoose.model('User', userSchema);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.sendStatus(400);
    }
    const filePath = path.join(__dirname, 'uploads', req.file.filename);
    res.send(filePath);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});