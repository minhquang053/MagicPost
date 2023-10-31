const express = require('express');
const {
  httpGetAllUsers,
  httpGetUserById,
  httpChangeUserRoleById,
  httpAddNewUser,
  httpDeleteUserById,
} = require('./users.controller');

const usersRouter = express.Router();

usersRouter.get('/', httpGetAllUsers);
usersRouter.get('/:id', httpGetUserById);
usersRouter.post('/', httpAddNewUser);
usersRouter.patch('/:id', httpChangeUserRoleById);
usersRouter.delete('/:id', httpDeleteUserById);

module.exports = usersRouter;
