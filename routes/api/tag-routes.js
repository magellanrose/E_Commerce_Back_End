const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findAll({
      include: Product
    });
    res.status(200).json(tag)

  } catch (error) {
    res.status(500).send('Internal service error')
    
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleTag = await Tag.findByPk(req.params.id,{
      include: Product
    });

    res.status(200).json(singleTag)

  } catch (error) {
    res.status(500).send('Internal service error')
    
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);

    res.status(201).json(newTag);

  } catch (error) {
    res.status(500).send('Internal server error');
    
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
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

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
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
