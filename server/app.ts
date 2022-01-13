import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import cors from 'cors'
import jwt from 'jsonwebtoken'

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

// app.get('/users', (req, res) => {
//   User.find({})
//     .then((users: any) => res.send({data: users}))
// })

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

app.post('/signin', (req,res) => {
  const { username, password } = req.body;
  if (password) {
    return User
      .findUserByCredentials(username, password)
      .then((userObj:Record<string, any>) => {
        const token = jwt.sign({ _id: userObj._id }, 'dev-secret', { expiresIn: '7d' });
        res.send({ token, user: userObj });
      })
      .catch((e: any) => {
        console.log(e)
        res.status(401).send({message: e.message})
      });
  }
})

app.get('/contacts', async (req,res) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(403).send({message: 'Bad request'})
  }else{
    const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'dev-secret');
  } catch (err) {
    res.status(401).send({message: 'Необходима авторизация'})
  }
  //@ts-ignore
  const user = await User.findById(payload?._id)
  res.send({data: user.contacts})
  }
})


app.listen(PORT, () => {
console.log(`Приложение запущено на port:${PORT}`);
});