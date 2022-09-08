module.exports = (sequelize, DataTypes) => {

    const investments = sequelize.define("investment", {
        
        scheme_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profit:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        loss:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        total_investment:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        holder_accno: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // primaryKey: true
        },
        holder_portfolio:{
            type:DataTypes.FLOAT,
            allowNull: false,
        },
        holder_Active: {
            type: DataTypes.BOOLEAN
        }
    
    },{underscored: true})

    return investments

}