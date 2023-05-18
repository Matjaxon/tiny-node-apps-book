import { Router } from 'express';
const booksRouter = Router();

booksRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = { id };
    res.json(book);
  } catch (e) {
    console.error('Error occurred: ', e.message);
    next(e);
  }
});

booksRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = { id };
    res.json(book);
  } catch (e) {
    console.error('Error occurred: ', e.message);
    next(e);
  }
});

booksRouter.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = { id };
    res.json(book);
  } catch (e) {
    console.error('Error occurred: ', e.message);
    next(e);
  }
});

booksRouter.post('/', async (req, res, next) => {
  const { title, author } = req.body;
  try {
    const book = { title, author };
    res.json(book);
  } catch (e) {
    console.error('Error occurred: ', e.message);
    next(e);
  }
});

export default booksRouter;
