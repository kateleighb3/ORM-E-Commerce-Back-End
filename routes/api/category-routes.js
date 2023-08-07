const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res,) => {
try{
  const categoryAll = await Category.findAll({
    include: [{model: Product}],
  });
  res.status(200).json(categoryAll);
} catch (err) {
  res.status(500).json(err);
}


  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const categoryId = await Category.findbypk(req.params.id, {
      include: [{model: Product}]
    });

    if (!categoryId) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }
    res.status(200).json(categoryId);
  } catch (err) {
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {
    const name = req.body.category.name;
    console.log(name);
      if (!name) {
        return res.sendStatus(400);
      };
      const categoryPost = await Category.create({name}).then(() => res.json({message: 'Category Created.'}));
      
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  try{
    const name = req.body.category.name;
    if (!name){
      return res.sendStatus(400);
    };
    const categoryPut = await Category.update({name}, {where: {id: id}}).then(() => res.json({message: 'Category updated.'}));
  } catch (err) {
  res.status(400).json(err);
}
  // update a category by its `id` value
});

// router.delete('/:id', async (req, res) => {
  // try{ 
    // const categoryId = req.params.category.id;
    // const response = await deleteCategory(category)

  // }
  // delete a category by its `id` value
// });

module.exports = router;
