//@ts-ignore
import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 3010

mongoose.connect('mongodb://localhost:27017/contacts', {
    //@ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


app.get('/test', (_req: any, res: { send: (arg0: string) => void; }) => {
    res.send('Server is working and everything OK!')
})

app.listen(PORT, () => {
console.log(`Приложение запущено на port:${PORT}`);
});