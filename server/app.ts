import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import cors from 'cors'

const User = require('./models/user')
const bodyParser = require('body-parser');
const app = express();
const PORT = 3010

mongoose.connect('mongodb://localhost:27017/contacts', {
    //@ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/test', (_req: any, res: { send: (arg0: string) => void; }) => {
    res.send('Server is working and everything OK!')
})

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const contacts:any[] = []
  
  return bcrypt
    .hash(password, 10)
    .then((hash) => {
      User
        .create({ username, password: hash, contacts })
        .then((users:any) => res.send({
          data: {name: users.username, contacts: users.contacts},
        }))
    })
    .catch(e => console.log(e));
})



app.listen(PORT, () => {
console.log(`Приложение запущено на port:${PORT}`);
});