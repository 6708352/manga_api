const express = require('express');
const router = express.Router();
const db = require('../db');

// GET ALL
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM mangas');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET BY ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM mangas WHERE id=?',
      [req.params.id]
    );

    if (rows.length === 0)
      return res.status(404).json({ error: 'Not found' });

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE
router.post('/', async (req, res) => {
  const { title, description, image_url, rating, author, chapters_count } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO mangas 
      (title, description, image_url, rating, author, chapters_count) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [title, description, image_url, rating || 0, author || '', chapters_count || 0]
    );

    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE ⭐
router.put('/:id', async (req, res) => {
  const { title, description, image_url, rating, author, chapters_count } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE mangas 
       SET title=?, description=?, image_url=?, rating=?, author=?, chapters_count=? 
       WHERE id=?`,
      [title, description, image_url, rating, author, chapters_count, req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Not found' });

    res.json({ message: 'Manga updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM mangas WHERE id=?',
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Not found' });

    res.json({ message: 'Manga deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;