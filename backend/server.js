import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
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

// outro jeito de abrir conexao com o banco db

const dbJeito = new sqlite3.Database("Visitas.db");

// criando Tabela Visita

dbJeito.run(`
  CREATE TABLE IF NOT EXISTS visitas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data_hora TEXT NOT NULL
  )
  `);

//-------------------------------------------

(async () => {
  const db = await openDB();

  // Tabela de usuários
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      passw TEXT NOT NULL,
      image TEXT
    );
  `);

  // Tabela de commits
  await db.exec(`
    CREATE TABLE IF NOT EXISTS commits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      message TEXT NOT NULL
    );
  `);


  console.log("Tabelas 'users', 'commits' e 'visitas' criadas/verificadas com sucesso!");
})();



// 🔹 Listar todos os usuários
app.get('/listUsers', async (req, res) => {
  try {
    const db = await openDB();
    const users = await db.all('SELECT * FROM users');
    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao listar usuários' });
  }
});

// 🔹 Login
app.post('/login', async (req, res) => {
  try {
    const { email, passw } = req.body;

    if (!email || !passw) {
      return res.status(400).json({ msg: 'Preencha todos os campos!' });
    }

    const db = await openDB();
    const user = await db.get(
      'SELECT * FROM users WHERE email = ? AND passw = ?',
      [email, passw]
    );

    if (!user) {
      return res.status(401).json({ msg: 'Usuário ou senha incorretos!' });
    }

    res.status(200).json({ msg: 'Login efetuado com sucesso!', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro no servidor LOGIN!' });
  }
});


// 🔹 Listar commits
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

// 🔹 Criar commit
app.post('/commits', async (req, res) => {
  try {
    const db = await openDB();
    const { commit } = req.body;

    // Verificação de campos obrigatórios
    if (!commit) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes (commit).' });
    }

    // Inserção no banco
    const result = await db.run(
      'INSERT INTO commits (message) VALUES (?)',
      [commit]
    );

    // Retornar o novo registro criado
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
app.get('/visitas', (req, res)=>{
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


app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
