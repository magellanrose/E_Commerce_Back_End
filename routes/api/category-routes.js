const router = require('express').Router();
const { Category, Product } = require('../../models');

// ROUTE TO GET ALL CATEGORIES 
router.get('/', async (req, res) => {
  try {
    // Fetching all categories with their associated products.
    const categories = await Category.findAll({
      include: Product
    });
    // Checking if the categories was found
    if (!categories) {
      return res.status(404).json({
        message: 'Cannot get categories'
      })
    }

    res.status(200).json(categories)

  } catch (error) {
    res.status(500).send('interal error')
  }
});

// ROUTE TO GET CATEGORY BY ID
router.get('/:id', async (req, res) => {
  try {
    // Fetching a category by its primary key (id) along with its associated products
    const category = await Category.findByPk(req.params.id, {
      include: Product,
    });
    // Checking if the category was found
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

// ROUTE TO CREATE A NEW CATEGORY
router.post('/', async (req, res) => {
  try {
    // Creating a new category using the data from the request body
    const newCategory = await Category.create(req.body);

    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

//  ROUTE TO UPDATE CATEGORY BY ID
router.put('/:id', async (req, res) => {
  try {
    // Updating a category by its primary key (id) using the data from the request body
    const category = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(201).json(category)
  } catch (error) {
    res.status(500).send('Internal server error');

  }
});

// ROUTE TO DELETE A CATEGORY BY ID
router.delete('/:id', async (req, res) => {
  try {
    // Deleting a category by its primary key (id)
    const destroy = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(201).json(destroy);

  } catch (error) {
    res.status(500).send('Internal server error');
    console.log(error)

  }
});

module.exports = router;
