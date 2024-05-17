const bookRepository = require('../repositories/bookRepository');

exports.createBook = async (req, res) => {
  try {
    const { name, description } = req.body;
    const book = await bookRepository.create({ name, description });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await bookRepository.findAll();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await bookRepository.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { name, description } = req.body;
    const updatedBook = await bookRepository.update(req.params.id, { name, description });
    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const deleted = await bookRepository.delete(req.params.id);
    if (deleted) {
      res.status(201).json({ message:'book deleted'});
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
