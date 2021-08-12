const config = require("../Utilities/config").config;
const UserDAO = require('../DAO/userDAO');
const MD5 = require('md5');
let secret = config.jwtsecret
const jwt = require('jsonwebtoken');
/* API for registering new user */
let register = async (req, res) => {
 // console.log(req);
  if (!req.body.email || !req.body.password) {
    res.status(401).json({ message: 'Parameters are missing' })
  } else {
    try {
      let query = {
        email: req.body.email
      }
      const checkEmail = await UserDAO.getUsers(query);
      if (checkEmail && checkEmail.length == 1) {
        res.status(401).json({ message: 'email already registered' })
      } else {
        let userData = {
          firstName: req.body.firstName ? req.body.firstName : "",
          email: req.body.email,
          phone: req.body.phone,
          password: MD5(MD5(req.body.password)),
          status: true
        };
        const addUser = await UserDAO.createUser(userData);
        // console
        if (addUser) {
          res.status(200).json({ message: 'User registered successfully!' })
        } else {
          res.status(403).json({ message: "Something went wrong" });
        }
      }
    } catch (error) {
      res.status(404).json({ message: "Something went wrong", error: error });
    }
  }
};


/* API to login user */
let login = async (req, res) => {
 // console.log(req.body);
  if (!req.body.email || !req.body.password) {
    res.status(401).json({ message: 'Parameters are missing' });
  } else {
    try {
      let query = {
        email: req.body.email,
        status: true
      };
      const checkEmail = await UserDAO.getUsers(query);
     // console.log(checkEmail);
      if (checkEmail && checkEmail.length > 0) {
        let query = {
          email: req.body.email,
          password: MD5(MD5(req.body.password))
        };
        const checkPassword = await UserDAO.getUsers(query);
        if (checkPassword && checkPassword.length == 1) {
          let token = jwt.sign(req.body, secret, { expiresIn: '15s'})
          res.status(200).json({ message: 'Logged in successfully!', result: checkPassword[0], token: token });
        } else {
          res.status(401).json({ message: 'Incorrect password' });
        }
      } else {
        res.status(401).json({ message: 'Email not exist!' });
      }
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: 'Something went wrong', error: error });
    }
  }
};

module.exports = {
  register: register,
  login: login
}