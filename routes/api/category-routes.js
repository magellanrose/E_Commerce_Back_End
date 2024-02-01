const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {


    const categories = await Category.findAll({
      include: Product
    });
    console.log(categories)
    if (!categories) {
      return res.status(404).json({
        message: 'Cannot get categories'
      })
      // return
    }

    res.status(200).json(categories)

  } catch (error) {
    res.status(500).send('interal error')
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: Product,
    });
    if (!category) {
      return res.status(404).json({
        message: 'Category not found'
      });
    }
    res.status(200).json(category)
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal service error')
  }
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);

    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});


router.put('/:id', async (req, res) => {
 
});


router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
