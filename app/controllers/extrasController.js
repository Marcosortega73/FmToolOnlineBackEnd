//model userState
const userState = require("../models").UserState;
const userPending = require("../models").UserPending;

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
//export
module.exports = {
    getUsersStates
}


    