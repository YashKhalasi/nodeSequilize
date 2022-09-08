module.exports = (sequelize, DataTypes) => {
    const loginUser = sequelize.define("UserLogin", {
      userId: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
    });
    return loginUser;
  };