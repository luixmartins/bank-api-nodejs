import express from 'express';
import DAO from '../DAO/index.js';

const app = express();
const port = 3000; 

app.get('/',  (req, res) => {
    const data = DAO.list('SELECT * FROM owner');

    data.then((response) => {
        res.status(response.status).send(response.data);
    });
});

app.listen(port, () => {
    console.log('Server is running on http://localhost:3000');
});