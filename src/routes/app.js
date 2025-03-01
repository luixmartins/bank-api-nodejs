import express from 'express';
import Owner from '../controller/owner.js';

const app = express();
const port = 3000; 


app.use(express.json());

app.get('/', async (req, res) => {
    console.log("Entrou no get")
    const data = await Owner.listOwners();

    res.status(data.status).json(data.data);
});

app.post('/',  (req, res) => {
    const owner = req.body;
    
    const data =  Owner.createOwner(owner);
    
    data.then((response) => {
        res.status(response.status).json(response.data);
    });
});

app.put('/owner/:cpf', (req, res) => {
    console.log("Entrou no put")
    const owner = {
        cpf: req.params.cpf,
        name: req.body.name
    }

    const data = Owner.updateOnwer(owner);

    data.then((response) => {
        res.status(response.status).json(response.data);
    });
});

app.delete('/owner/:cpf', (req, res) => {
    const cpf = req.params.cpf;

    const data = Owner.deleteOwner(cpf);

    data.then((response) => {
        res.status(response.status).json(response.data);
    });
});


app.listen(port, () => {
    console.log('Server is running on http://localhost:3000');
});