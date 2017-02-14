import * as actionTypes from './action_types'
import _ from 'lodash'

export const INITIAL_STATE = {
  members: [
    {
      "id": 79,
      "full_name": "Judy Burrill",
      "first_name": "Judy",
      "last_name": "Burrill",
      "initials": "JB",
      "email": "judyburrill@gmail.com",
      "photo": null,
      "role_ids": [],
      "roles": [],
      "created_at": null,
      "updated_at": null
    },
    {
      "id": 72,
      "full_name": "Hector Chang",
      "first_name": "Hector",
      "last_name": "Chang",
      "initials": "HC",
      "email": "hdc38@cornell.edu",
      "photo": null,
      "role_ids": [],
      "roles": [],
      "created_at": null,
      "updated_at": null
    },
    {
      "id": 31,
      "full_name": "Fabina Colon",
      "first_name": "Fabina",
      "last_name": "Colon",
      "initials": "FC",
      "email": "fabina@multiculturalresourcecenter.org",
      "photo": null,
      "role_ids": [],
      "roles": [],
      "created_at": null,
      "updated_at": null
    },
    {
      "id": 69,
      "full_name": "Ethan Cramton",
      "first_name": "Ethan",
      "last_name": "Cramton",
      "initials": "EC",
      "email": "egc24@cornell.edu",
      "photo": null,
      "role_ids": [],
      "roles": [],
      "created_at": null,
      "updated_at": null
    },
    {
      "id": 35,
      "full_name": "Amanda David",
      "first_name": "Amanda",
      "last_name": "David",
      "initials": "AD",
      "email": "healthyfoodforall.ithaca@gmail.com",
      "photo": null,
      "role_ids": [],
      "roles": [],
      "created_at": null,
      "updated_at": null
    },
    {
      "id": 55,
      "full_name": "Janice Degni",
      "first_name": "Janice",
      "last_name": "Degni",
      "initials": "JD",
      "email": "jgd3@cornell.edu",
      "photo": null,
      "role_ids": [],
      "roles": [],
      "created_at": null,
      "updated_at": null
    },
    {
      "id": 75,
      "full_name": "Britton Dougherty",
      "first_name": "Britton",
      "last_name": "Dougherty",
      "initials": "BD",
      "email": "bmd88@cornell.edu",
      "photo": null,
      "role_ids": [],
      "roles": [],
      "created_at": null,
      "updated_at": null
    },
    {
      "id": 26,
      "full_name": "Chrys Gardener",
      "first_name": "Chrys",
      "last_name": "Gardener",
      "initials": "CG",
      "email": "cab69@cornell.edu",
      "photo": null,
      "role_ids": [],
      "roles": [],
      "created_at": null,
      "updated_at": null
    }
  ]
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  default:
    return state

  }

}
