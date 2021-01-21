const { authenticate } = require('@feathersjs/authentication').hooks;
const { isBoardOwner } = require('../../hooks/authorization');
const { setField } = require('feathers-authentication-hooks');

const setUserId = setField({
  from: 'params.user._id',
  as: 'data.userId'
})

module.exports = {
  before: {
    all: [ authenticate('jwt'), isBoardOwner ],
    find: [],
    get: [],
    create: [setUserId],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
