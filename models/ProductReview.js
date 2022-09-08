module.exports=(sequelize,DataTypes)=>{

    const Review = sequelize.define("ProductReview", {
        // product_id: {
        //     type: DataTypes.INTEGER
        // },
        rating: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.TEXT
        }
    })

    return Review
}