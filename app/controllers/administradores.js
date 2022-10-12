
const { httpError } = require("../helpers/handleError");
const administrador = require("../models").Administrador;
const bcrypt = require("bcrypt");


const {generateToken,generateRefreshToken} = require("../utils/tokenManager.js");



// Refresh Token
const refreshToken = async (req, res) => {
  try {

    const { token, expiresIn } = generateToken(req.uid);

    res.json({
      token,
      expiresIn
    });
  } 
  

  catch (e) {
   
    httpError(res, e);
  }
  
};


//getItems
const getItems = async (req, res) => {
  try {
    const administradores = await administrador.findAll();
    return res.json({
      data:administradores
    });
  } catch (error) {
    httpError(res, error);
  }
}


//Login
const getItem = async (res,adminPassword, password) => {
  try {
    console.log(req, "REQ ADMIN")
      //Validar Password
      const validPasswordd = await bcrypt.compare(
        adminPassword,password
      );
      if(!validPasswordd) {
        return res.status(400).json({
          mensaje: "Credenciales incorrectas /P",
        }); 
      }
      else{
        // generateRefreshToken(admin.id,res);
        const { token, expiresIn } = generateToken(admin.id);
        res.status(200).json({
          token,
          expiresIn
        });
        
    } 
  } 
  
  catch (e) {
    httpError(res, e);
  }
};

//Register
const createItems = async (req, res) => {
  try {
    const administradorReq = {
      email: req.body.email,
      password: req.body.password,
    };
    if (administradorReq.email !== undefined ) {

      const existsadministrador = await administrador.findOne({
        where: { email: administradorReq.email },
      });

      if (!existsadministrador) {

        await administrador
          .create(administradorReq)
          .then((admin) => {
            res.status(200).json({
              mensaje: "Usuario Creado Con Exito",
              status: 200,
            });
          })
    .catch((e) => {
            {

              httpError(res, e);
            }
          });
      } else {
        throw new Error("Usuario ya registrado");
      }
    }
  } catch (e) {
    httpError(res, e);
  }
};

const getUserAdmin = async(req, res) => {
  console.log("req.uid")
  try {
    console.log

    const admin = await administrador.findOne({where: {id:req.uid}})

    if(!admin){
      throw new Error('No Existe El Usuario')

    }
    else{
      const {email, rol,state} = admin
      res.json({email,rol,state})
    }
  } 
  
  catch (e) {
   
    httpError(res, e);
  }

  
};

const updateItems = (req, res) => {};
const deleteItems = (req, res) => {};



// SIN UTILIZAR
const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({
    message: "Logout exitoso",
  });
};

module.exports = { refreshToken,logout, getItem,getItems, createItems, updateItems, deleteItems,getUserAdmin };
