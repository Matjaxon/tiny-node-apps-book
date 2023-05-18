import { Router } from 'express';
import Book from '../models/book.js';

const booksRouter = Router();

booksRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    res.json(book);
  } catch (e) {
    console.error('Error occurred: ', e.message);
    next(e);
  }
});

booksRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Book.destroy({
      where: { id }
    });
    res.json(book);
  } catch (e) {
    console.error('Error occurred: ', e.message);
    next(e);
  }
});

booksRouter.put('/:id', async (req, res, next) => {
  const { title, author } = req.body;
  const { id } = req.params;
  try {
    const book = Book.update(
      { title, author },
      {
        where: { id }
      }
    );
    res.json(book);
  } catch (e) {
    console.error('Error occurred: ', e.message);
    next(e);
  }
});

booksRouter.post('/', async (req, res, next) => {
  const { title, author } = req.body;
  try {
    const book = await Book.create({ title, author });
    res.json(book);
  } catch (e) {
    console.error('Error occurred: ', e.message);
    next(e);
  }
});

export default booksRouter;
