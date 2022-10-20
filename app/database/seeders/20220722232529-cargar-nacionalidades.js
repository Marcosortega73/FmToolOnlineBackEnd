 'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    //cargar nacionalidades
    await queryInterface.bulkInsert('Nacionalidades', [{
      id: "1649",
      nombre: "Argentina",
      image_id: "1"
    },{
      id: "1651",
      nombre: "Brasil",
      image_id: "2"
    },{
      id: "1652",
      nombre: "Chile",
      image_id: "3"
    },{
      id: "1653",
      nombre: "Colombia",
      image_id: "4"
    },{
      id: "11",
      nombre: "Camerún",
      image_id: "5"
    },{
      id: "38",
      nombre: "Nigeria",
      image_id: "6"
    },{
      id: "1654",
      nombre: "Ecuador",
      image_id: "7"
    },{
      id: "41",
      nombre: "Senegal",
      image_id: "8"
    },{
      id: "379",
      nombre: "México",
      image_id: "9"
    },{
      id: "390",
      nombre: "Estados Unidos",
      image_id: "10"
    },
    {
      id: "798",
      nombre: "Suiza",
      image_id: "11"
    },
    {
      id: "754",
      nombre: "Armenia",
      image_id: "12"
    },
    {
      id: "1650",
      nombre: "Bolivia",
      image_id: "13"
    },
    //paraguay peru
    {
      id: "1655",
      nombre: "Paraguay",
      image_id: "14"
    },
    {
      id: "1656",
      nombre: "Perú",
      image_id: "15"
    },
    {
      id: "1657",
      nombre: "Uruguay",
      image_id: "16"
    },
    {
      id: "1658",
      nombre: "Venezuela",
      image_id: "17"
    }  

  ])
},


  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Nacionalidades', null, {});
  }
};
 