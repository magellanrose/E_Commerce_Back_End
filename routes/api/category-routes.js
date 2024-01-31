const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  // console.log({ req, res})
try {
  
  
  const categories = await Category.findAll({
    include: Product
  });
  console.log(categories)
  if (!categories) {
    res.status(400).json({
      message: 'Cannot get categories'
    })
    // return
  }
  
  res.status(200).json(categories)
  
} catch (error) {
  res.status(500).send('interal error')
}
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
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
