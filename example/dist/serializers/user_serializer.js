'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var user_serializer = function user_serializer(req, trx, record, options) {
  return {

    id: record.get('id'),

    first_name: record.get('first_name'),

    last_name: record.get('last_name'),

    email: record.get('email'),

    photo: record.related('photo').get('file_name'),

    created_at: record.get('created_at'),

    updated_at: record.get('updated_at')

  };
};

exports.default = user_serializer;