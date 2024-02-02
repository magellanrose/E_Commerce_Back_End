const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// ROUTE TO GET ALL TAGS WITH ASSOCIATED PRODUCTS
router.get('/', async (req, res) => {
  try {
    
    // Fetching all tags with their associated products
    const tag = await Tag.findAll({
      include: [{
        model: Product,
        through: ProductTag
      }]
    });
    res.status(200).json(tag)

  } catch (error) {
    res.status(500).send('Internal service error')
    console.log(error)
  }
});

// ROUTE TO GET A SINGLE TAG BY ID WITH ASSOCIATED PRODUCTS
router.get('/:id', async (req, res) => {

  try {

    // Fetching a tag by its primary key (id) along with its associated products
    const singleTag = await Tag.findByPk(req.params.id, {
      include: Product
    });

    res.status(200).json(singleTag)

  } catch (error) {
    res.status(500).send('Internal service error')

  }
});

// ROUTE TO CREATE A NEW TAG
router.post('/', async (req, res) => {

  try {

    // Creating a new tag using the data from the request body
    const newTag = await Tag.create(req.body);

    res.status(201).json(newTag);

  } catch (error) {
    res.status(500).send('Internal server error');

  }
});

// ROUTE TO UPDATE A TAG BY ID
router.put('/:id', async (req, res) => {
  try {

    // Updating a tag by its primary key (id) using the data from the request body
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(201).json(updateTag)

  } catch (error) {
    res.status(500).send('Internal server error');

  }
});

// ROUTE TO DELETE A TAG BY ID
router.delete('/:id', async (req, res) => {
  try {

    // Deleting a tag by its primary key (id)
    const destroy = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(201).json(destroy);

  } catch (error) {
    res.status(500).send('Internal server error');

  }
});

module.exports = router;
