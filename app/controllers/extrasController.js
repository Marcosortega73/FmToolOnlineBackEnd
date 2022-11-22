//model userState
const userState = require("../models").UserState;
const userPending = require("../models").UserPending;
const equipos = require("../models").Equipo;
const jugadores = require("../models").Jugador;
const torneo = require("../models").Torneo;

const { httpError } = require("../helpers/handleError");

//GetUsersStates
const getUsersStates = async (req, res) => {
    try {
        const usersStates = await userState.findAll(
            {
             include: 
             [
             { 
             model: userPending,
             attributes: ["id"] 
            }
             ]
            });
        return res.json({
            data: usersStates,
            status: 200
          });
    } catch (e) {
        httpError(res, e);
    }
    }

//GetDashboard
const getDashboard = async (req, res) => {
    try {

        const equiposCount = await equipos.count();
        const jugadoresCount = await jugadores.count();
        const torneoCount = await torneo.count();

        return res.json({
            data: {
                equipos:equiposCount,
                jugadores:jugadoresCount,
                torneos:torneoCount
            },
            status: 200
            });
    } catch (e) {
        httpError(res, e);
    }
    }
       
//export
module.exports = {
    getUsersStates,
    getDashboard
}


    