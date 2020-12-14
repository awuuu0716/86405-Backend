const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('private.key');
const cert = fs.readFileSync('public.pem');
const saltRounds = 10;

const { Users } = db;

const usersController = {
  addUser: (req, res) => {
    const { userName, phone, password } = req.body;

    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        Users.create({
          username: userName,
          phone,
          password: hash,
        })
          .then(() => {
            jwt.sign(
              { data: userName },
              privateKey,
              { algorithm: 'RS256' },
              (err, token) => {
                res.json({ token, ok: 1 });
              }
            );
          })
          .catch((err) => {
            res.json(err);
          });
      });
    });
  },
  getMe: (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    jwt.verify(token, cert, (err, decoded) => {
      if (err) return res.json({ ok: 0 });
      res.json({ data: decoded.data, ok: 1 });
    });
  },
  login: (req, res) => {
    const { username, password } = req.body;
    Users.findOne({
      where: {
        username,
      },
    }).then((userData) => {
      if (!userData) return res.json({ ok: 0, message: '使用者不存在' });
      const hash = userData.password;
      bcrypt.compare(password, hash).then((result) => {
        if (!result) res.json({ ok: 0, message: '密碼錯誤' });
        jwt.sign(
          { data: username },
          privateKey,
          { algorithm: 'RS256' },
          (err, token) => {
            res.json({ token, ok: 1 });
          }
        );
      });
    });
  },
};

module.exports = usersController;
