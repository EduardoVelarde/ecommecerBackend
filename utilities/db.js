const knex=require('knex')({
    client:'mysql',
    connection:{
        host:'localhost',
        port:3306,
        user:'root',
        password:process.env.process_secret,
        database:'ecommerce'
    },
    pool:{min:0,max:10}
})
//new way to create table
knex.schema.hasTable('productsEcommerce').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('productsEcommerce', function(t) {
        t.increments('id').primary();
        t.string('name');
        t.integer('price');
        t.text('description');
        t.string('code');
        t.datetime('created_at', { precision: 6 }).defaultTo(knex.fn.now(6))
      });
    }
  }); 
  module.exports=knex