const db = require('../models');
const { Reserves } = db;

const reservesController = {
  addReserve: (req, res) => {
    const { date, entryTime, name, phone, amount, username } = req.body;
    Reserves.create({
      date,
      entryTime,
      name,
      phone,
      amount,
      isDelete: false,
      username,
    }).then(() => {
      res.json({ ok: 1 });
    });
  },
  deleteReserve: (req, res) => {
    const { id } = req.params;
    Reserves.findOne({
      where: {
        id,
      },
    })
      .then((reserve) =>
        reserve.update({
          isDelete: true,
        })
      )
      .then((data) => {
        console.log(data);
        res.json({ ok: 1 });
      })
      .catch((err) => {
        console.log(err);
        res.json({ ok: 0 });
      });
  },
  getReserve: (req, res) => {
    const { date } = req.params;
    Reserves.findAll({
      where: {
        date,
      },
      order: [['entryTime', 'ASC']],
    }).then((product) => {
      res.json(product);
    });
  },
  getUserReserve: (req, res) => {
    const { username } = req.params;
    Reserves.findAll({
      where: {
        username,
      },
      order: [['entryTime', 'ASC']],
    }).then((product) => {
      res.json(product);
    });
  },
};

module.exports = reservesController;
