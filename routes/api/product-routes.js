const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');



// ROUTE TO GET ALL PRODUCTS WITH ASSOCIATED CATEGORIES AND TAGS
router.get('/', async (req, res) => {

  try {

    // Fetching all products with their associated categories and tags
    const product = await Product.findAll({
      include: [Category, Tag]
    })
    res.status(201).json(product);

  } catch (error) {
    res.status(500).send('interal error')

  }

});

// ROUTE TO GET A SINGLE PRODUCT BY ID WITH ASSOCIATED CATEGORY AND TAGS
router.get('/:id', async (req, res) => {

  try {

    // Fetching a product by its primary key (id) along with its associated category and tags
    const oneProduct = await Product.findOne({
      where: {
        id: req.params.id
      },
      include: [Category, {
        model: Tag,
        through: ProductTag
      }]
    })
    res.status(201).json(oneProduct);

  } catch (error) {
    res.status(500).send('interal error')
    console.log(error)
  }
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {

        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// ROUTE TO DELETE A PRODUCT BY ID
router.delete('/:id', async (req, res) => {

  try {

    // Deleting a product by its primary key (id) using Sequelize's destroy method
    const destroy = await Product.destroy({
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
