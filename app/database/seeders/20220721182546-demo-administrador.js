'use strict';
const bcrypt = require("bcrypt");
//bycrypt 
//encriptar

//encriptar 
const encriptar =  async ()=>{
  const salt = await bcrypt.genSaltSync(10, "a");
  var password = await bcrypt.hashSync("123456", salt);
  return password;
}

 

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Administradores', [{
      id:"c6bfeb2d-f3bb-4b22-9002-a09ba5c831e4",
      email: 'admin@admin.com',
      password: await encriptar()
      
    }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Administradores', null, {});
  }
};
