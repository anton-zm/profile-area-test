import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import cors from 'cors'
import jwt from 'jsonwebtoken'

const User = require('./models/user')
const bodyParser = require('body-parser');
const app = express();
const PORT = 3010

const auth = (auth_token: string) => {
  const response = { isAuth: false, id: null, error: 'Authorization required' }
  if (!auth_token || !auth_token.startsWith('Bearer ')) {
    return response
  }else{
    const token = auth_token.replace('Bearer ', '');
    let payload;
    try {
      payload = jwt.verify(token, 'dev-secret');
      response.isAuth = true
      response.error = ''
      //@ts-ignore
      response.id = payload._id
      return response
    } catch (err) {
      console.log(err)
      return response
    }
  }
}

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
  const auth_status = auth(authorization!)

  try{
    if(auth_status.isAuth){
      //@ts-ignore
      const user = await User.findById(auth_status.id)
      res.send({data: user.contacts})
    }else{
      res.status(401).send({message: auth_status.error})
    }
  }catch(e){
    console.log(e)
  }
})

app.patch('/contacts', async (req,res) => {
  const { authorization } = req.headers;
  const { contact } = req.body;
  const auth_status = auth(authorization!)

  try {
    if(auth_status.isAuth){
      const user = await User.findById(auth_status.id)
      const contacts = user.contacts
      const updContacts = [...contacts, contact]
      await User.findByIdAndUpdate(auth_status.id, {
        contacts: updContacts
      })
      res.send({data: contact, ok: true})

    }else{
      res.status(401).send({message: auth_status.error})
    }
  }catch(e){
    console.log(e)
  }
})

app.patch('/edit-contact', async (req,res) => {
  const { authorization } = req.headers;
  const { contact } = req.body;
  const auth_status = auth(authorization!)

  try {
    if(auth_status.isAuth){
      const user = await User.findById(auth_status.id)
      const contacts = user.contacts.filter((e:any) => e.id !== contact.id)

      const updContacts = [...contacts, contact]
      await User.findByIdAndUpdate(auth_status.id, {
        contacts: updContacts
      })
      res.send({data: contact, ok: true})

    }else{
      res.status(401).send({message: auth_status.error})
    }
  }catch(e){
    console.log(e)
  }
})


app.listen(PORT, () => {
console.log(`Приложение запущено на port:${PORT}`);
});