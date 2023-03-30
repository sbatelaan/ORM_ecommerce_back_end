const router = require('express').Router();
const { Category, Product } = require('../../models');

//Get request for all categories
//using Async/Await instead of .then methods. Creates shorter, cleaner code
//Makes error handling and debugging much easier
//executes code sequentially rather than in a chain 
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: Product
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

//get request for category by ID
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: Product
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category with that id'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

//post requests allows us to create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

//put request allows us to update category
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err)
  }
});

//delete request allows us to delete categories
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'Np category with this id'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
