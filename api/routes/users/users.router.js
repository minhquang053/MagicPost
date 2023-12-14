const express = require('express');
const {
  httpGetAllUsers,
  httpGetUserById,
  httpChangeUserProfile,
  httpAddNewUser,
  httpDeleteUserById,
} = require('./users.controller');

const { validateUser } = require('../../middlewares/authentication');
const { extractAuthorization } = require('../../middlewares/authorization');

const usersRouter = express.Router();

usersRouter.use(validateUser);
usersRouter.use(extractAuthorization);

usersRouter.get('/', httpGetAllUsers);
usersRouter.get('/:id', httpGetUserById);
usersRouter.post('/', httpAddNewUser);
usersRouter.patch('/:id', httpChangeUserProfile);
usersRouter.delete('/:id', httpDeleteUserById);

module.exports = usersRouter;
