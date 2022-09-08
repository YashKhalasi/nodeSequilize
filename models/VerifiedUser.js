module.exports = (sequelize, DataTypes) => {

    const userVerification = sequelize.define("userVerificationStatus", {
        
        holder_accno: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        userVerified: {
            type: DataTypes.BOOLEAN
        },
        userToken: {
            type: DataTypes.STRING
        },
        holder_email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    
    },{underscored: true})

    return userVerification

}