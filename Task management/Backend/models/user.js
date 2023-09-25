
// const { Sequelize, DataTypes } = require('sequelize');



// module.exports = () => {
//   const sequelize = new Sequelize('database', 'username', 'password', {
//     host: 'localhost',
//     dialect: 'mysql',
//   });
//   const User = sequelize.define('user', {
//     // Define your model attributes (e.g., username, email, password)
//     username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true, // Ensures email is unique
//     validate: {
//       isEmail: true, // Validates that the value is a valid email address
//     },
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });
    

//   return User;
// };


'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};