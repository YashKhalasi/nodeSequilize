module.exports = (sequelize, DataTypes) => {

    const accProfit = sequelize.define("datatables", {
        
        accStatusId: {
            type: DataTypes.INTEGER
        },
        investmentId: {
            type: DataTypes.INTEGER
        }
     
    },{
        // underscored: true, 
        // timestamps: false
    }) 

    return accProfit

}