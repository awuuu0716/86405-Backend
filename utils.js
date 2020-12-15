const fs = require('fs');
const jwt = require('jsonwebtoken');
const cert = fs.readFileSync('public.pem');

const utils = {
  auth: (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    jwt.verify(token, cert, (err, decoded) => {
      if (err) return res.json({ ok: 0, message: '使用者驗證錯誤' });
      next();
    });
  },
};

module.exports = utils;
