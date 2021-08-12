"use strict";

var Models = require("../Models/User");

const getUsers = query =>
  new Promise((resolve, reject) => {
    Models.find(query)
      .then(client => resolve(client))
      .catch(err => reject(err));
  });

const createUser = objToSave =>
  new Promise((resolve, reject) => {
    new Models(objToSave)
      .save()
      .then(client => resolve(client))
      .catch(err => {reject(err);
         console.log(err);
      });
  });




module.exports = {
  createUser: createUser,
  getUsers: getUsers
};