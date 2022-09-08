module.exports = (sequelize, DataTypes) => {
    const Tut_Tag = sequelize.define("tutorial_tag", {
        tutorialId: {
        type: DataTypes.INTEGER,
      },
      tag_id:{
        type: DataTypes.INTEGER,
      }
    });
    return Tut_Tag;
  };