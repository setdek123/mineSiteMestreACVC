import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

import fs from 'fs';
import path from 'path';
import multer from 'multer';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


const openDB = async () => {
  return open({
    filename: './database.db',
    driver: sqlite3.Database,
  });
};

// opend conection with db

const dbJeito = new sqlite3.Database("Visitas.db");

// Creating table visitas

dbJeito.run(`
  CREATE TABLE IF NOT EXISTS visitas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data_hora TEXT NOT NULL
  )
  `);

//-------------------------------------------

(async () => {
  const db = await openDB();

  // Table users
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      passw TEXT NOT NULL,
      image TEXT
    );
  `);

  // Table commits
  await db.exec(`
    CREATE TABLE IF NOT EXISTS commits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      message TEXT NOT NULL
    );
  `);


  console.log("Tabelas 'users', 'commits' e 'visitas' criadas/verificadas com sucesso!");
})();


// VerifyTokenIsValid
const Autetication_Token = (req, res, next) => {
  const authHeader = req.headers.authorization;

  
  if (!authHeader) {
    return res.status(403).json({ msg: 'Token não fornecido!' });
  }

  // Bearer TOKEN
  const [, token] = authHeader.split(' ');

  
  if (!token) {
    return res.status(403).json({ msg: 'Token mal formatado!' });
  }

  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).json({ msg: 'Token inválido!' });
    }

    
    req.userId = decoded.id;

    next();
  });
};




// Get all Users
app.get('/listUsers', Autetication_Token  ,async (req, res) => {
  try {
    const db = await openDB();
    const users = await db.all('SELECT * FROM users');
    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao listar usuários' });
  }
});


app.post('/register', async (req, res)=> {
  const {name, email, passw} = req.body;

  const db = await openDB();

  if(!name || !email || !passw) return res.status(400).json({msg: 'Todos os campos são obrogatórios!'});

  try{
    const hashPassw = await bcrypt.hash(passw, 10);

    db.run('INSERT INTO users (name, email, passw) VALUES (?, ?, ?)', [name, email, hashPassw]);
    res.status(201).json({msg: 'Usuário criado com sucesso!'});

  }catch(err){
    res.status(500).json({msg: 'Error ao criar usuario!', err});
  }


});




app.post('/login', async (req, res) => {
  try {
    const { email, passw } = req.body || {};

    if (!email || !passw) {
      return res.status(400).json({ msg: 'Preencha todos os campos!' });
    }

    const db = await openDB();

    // find email in sql just
    const user = await db.get(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (!user) {
      return res.status(401).json({ msg: 'Usuário ou senha incorretos!' });
    }

    // verify get items
    console.log('EMAIL RECEBIDO:', email);
    console.log('USER DO BANCO:', user);


    // compare passw with hash
    const isValidPassword = await bcrypt.compare(passw, user.passw);

    if (!isValidPassword) {
      return res.status(401).json({ msg: 'Usuário ou senha incorretos!' });
    }

    // verify get items
    console.log('SENHA DIGITADA:', passw);
    console.log('HASH NO BANCO:', user.passw);

    const token = jwt.sign(
      { id: user.id },
      process.env.SECRET_TOKEN,
      { expiresIn: '1d' }
    );

    delete user.passw;

    res.status(200).json({
      msg: 'Login efetuado com sucesso!',
      token,
      user,
    });

  } catch (err) {
    console.error('ERRO LOGIN 👉', err);
    res.status(500).json({ msg: 'Erro no servidor LOGIN!' });
  }
});




app.get('/commits', async (req, res) => {
  try {
    const db = await openDB();
    const commits = await db.all('SELECT * FROM commits ORDER BY id DESC');
    res.status(200).json(commits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao listar commits!' });
  }
});


app.post('/commits', async (req, res) => {
  try {
    const db = await openDB();
    const { commit } = req.body;

    
    if (!commit) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes (commit).' });
    }

    // Insert to commits in sql
    const result = await db.run(
      'INSERT INTO commits (message) VALUES (?)',
      [commit]
    );

    // return values
    res.status(201).json({
      id: result.lastID,
      message: commit,
      
    });
  } catch (err) {
    console.error('Erro ao adicionar commit:', err);
    res.status(500).json({ msg: 'Erro interno ao adicionar commit!' });
  }
});



app.delete('/commits/:id', async(req, res)=>{
  const { id } = req.params;
  const db = await openDB();

  const resultDelet = await db.run('DELETE FROM commits WHERE id = ? ', [id]);

  if(resultDelet.changes === 0){
    return res.status(404).json({msg: 'Usuário nao encontrado!'});
  }

  res.status(200).json({msg: 'Usuário deletado com sucesso!'})
});

// ------------------------------------------ post / get Views site

app.post('/visita', (req, res)=>{
  //const db = await openDB();
  
  try{
    const agora = new Date().toISOString();

    dbJeito.run('INSERT INTO visitas (data_hora) VALUES (?)', [agora], 
      (err)=>{
        if(err) return res.status(500).json({msg: err.message});
      });
    res.status(200).json({msg: 'Visita registrada',data: agora});
  
  }catch(err){
    res.status(500).json({msg: 'Error no servidor', err});
  }
});

// consultar visitar por dias, mes, e ano
app.get('/visitas', Autetication_Token, (req, res)=>{
  //const db = await openDB();
  
  dbJeito.all(`
      SELECT
        COUNT(*) AS total,
        strftime('%Y', data_hora) AS ano,
        strftime('%m', data_hora) AS mes,
        strftime('%d', data_hora) AS dia,
        strftime('%H', data_hora) AS hora 
      FROM visitas
      GROUP BY ano, mes, dia, hora
      ORDER BY data_hora DESC
    `, 
    [],(err, rows)=>{
      if(err) return res.status(500).json({msg: 'Error ao pegar staticticas dos meses e anos!'});
      res.status(200).json(rows || []);
    });
});


app.delete('/deleteUsers/:id', async (req, res)=>{
  const {id} = req.params;
  console.log('id localizado: ',id);

  try{
    const db = await openDB();
    await db.run('DELETE FROM users WHERE id = ?', [id]);
    res.status(200).json({msg: 'User Deleted!', id});

  }catch(err){
    res.status(500).json({msg: 'Try again', err});
  }
 
});


app.listen(process.env.PORT, () => {
  console.log('Servidor Online...');
});
