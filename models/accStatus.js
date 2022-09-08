module.exports = (sequelize, DataTypes) => {

    const accStatus = sequelize.define("accStatus", {
        
        holder_accno: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        holder_Active: {
            type: DataTypes.BOOLEAN
        }
    
    },{underscored: true})

    return accStatus

}