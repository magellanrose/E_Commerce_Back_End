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
  // find one category by its `id` value
  // be sure to include its associated Products
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

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
