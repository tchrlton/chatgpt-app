import express, { Request, Response } from 'express';
import cors from "cors"; 
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: ['http://localhost:3000', "https://chatgpt-app-eight-rust.vercel.app"] }))

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
})


app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});