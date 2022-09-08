module.exports = (sequelize, DataTypes) => {

    const accHolderDetail = sequelize.define("accHolder", {
        
        holder_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        holder_email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        holder_accno: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        holder_portfolio:{
            type:DataTypes.FLOAT,
            allowNull: false,
        },
        holder_Active: {
            type: DataTypes.BOOLEAN
        },
        holder_Password: {
            type: DataTypes.STRING,
            allowNull: false
          }, 
        holder_Role: {
            type: DataTypes.STRING,
            allowNull: false
          }, 
    
    }
    ,{underscored: true}
    )

    return accHolderDetail

}