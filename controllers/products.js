const db = require('../models');
const api = require('../api');

const { Products } = db;

const productsController = {
  getProducts: (req, res) => {
    const { type } = req.params;
    if (type === 'all') {
      Products.findAll({
        order: [['id', 'DESC']],
      }).then((products) => {
        res.json(products);
      });
      return;
    }
    Products.findAll({
      where: {
        type,
      },
      order: [['id', 'DESC']],
    }).then((products) => {
      res.json(products);
    });
  },
  updateProduct: (req, res) => {
    const { id } = req.params;
    const { productName, description, price } = req.body;
    Products.findOne({
      where: {
        id,
      },
    })
      .then((product) =>
        product.update({
          name:productName,
          desc:description,
          price,
        })
      )
      .then(() => {
        res.json({ ok: 1 });
      })
      .catch((err) => {
        res.json({ ok: 0 });
      });
  },
  updateProductNewImg: (req, res) => {
    const imageFile = req.file.buffer.toString('base64');
    const { id } = req.params;
    const { productName, description, price } = req.body;
    
    api
      .uploadImg(imageFile)
      .then((response) => {
        const { link } = response.data;
        Products.findOne({
          where: {
            id,
          },
        })
          .then((product) =>
            product.update({
              name: productName,
              desc: description,
              price,
              url: link,
            })
          )
          .then(() => {
            res.json({ ok: 1 });
          })
          .catch((err) => {
            res.json({ ok: 0 });
          });
      })
      .catch((err) => {
        res.send(JSON.stringify(err));
      });
  },
  deleteProduct: (req, res) => {
    const id = req.params.id;
    Products.findOne({
      where: {
        id,
      },
    })
      .then((product) => {
        return product.destroy();
      })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json({ ok: 0 });
      });
  },
  addProduct: (req, res) => {
    const imageFile = req.file.buffer.toString('base64');
    const { productName, description, price, type } = req.body;
    api
      .uploadImg(imageFile)
      .then((response) => {
        const { link } = response.data;
        Products.create({
          name: productName,
          desc: description,
          type,
          price,
          url: link,
        }).then(() => {
          res.json({ ok: 1 });
        });
      })
      .catch((err) => {
        res.send(JSON.stringify(err));
      });
  },
};

module.exports = productsController;
