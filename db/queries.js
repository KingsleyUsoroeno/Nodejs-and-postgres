const knex = require('./knex');
const tableName = 'cities'


module.exports = {
    cities:{
        getAll: function(){
            return knex(tableName);
        },
        getOne: function(id){
            // SELECT * FROM cities WHERE id = id
            return knex(tableName).where('id', id).first();
        },
        create: function(city){
            return knex(tableName).insert(city).returning('*');
        }
    }
}

