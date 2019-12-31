const knex = require('../db/knex');
const userTable = 'customer';

module.exports = {

    getUserByEmail : function(email){
        return knex(userTable).where('email', email).first();
    },

    create: function(user){
        return knex(userTable).insert(user, 'id').then(ids => {
            return ids[0]
        })
    }
}