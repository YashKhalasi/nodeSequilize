const dbConfig = require('../config/dbConfig.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, 
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        // logging: false,
        

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.loginUser = require('./login')(sequelize, DataTypes)
db.userVerification = require('./VerifiedUser')(sequelize, DataTypes);
db.products = require('./product')(sequelize, DataTypes)
db.reviews = require('./ProductReview')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})

// 1 to Many Relation

db.products.hasMany(db.reviews, {
    foreignKey: 'product_id',
    as: 'review'
})

db.reviews.belongsTo(db.products, {
    foreignKey: 'product_id',
    as: 'product'
})

//Association Relations
db.investor = require('./accHolder')(sequelize, DataTypes); 
db.investorParanoid = require('./accHolderParanoid ')(sequelize, DataTypes); 
db.accStatus = require('./accStatus')(sequelize, DataTypes);
db.investment = require('./investments')(sequelize, DataTypes);
db.accRelationship = require('./AccProfit')(sequelize, DataTypes);

db.investor.hasOne(db.accStatus, {
    foreignKey: 'holder_accno',
    as: 'status'
})
db.accStatus.belongsTo(db.investor, {
    foreignKey: 'holder_accno',
    as: 'investor'
})

db.investor.hasMany(db.investment,{
    foreignKey:'holder_accno',
    as:'investment'
})
db.investment.belongsTo(db.investor, {
    foreignKey: 'holder_accno',
    as: 'investor'  
})

//many to many relationship
db.accStatus.belongsToMany(db.investment,{
    through:'datatables',
    as:'invested',
    foreignKey: 'accStatusId'
});
// db.investment.belongsToMany(db.accStatus,{through:'relationship',foreignKey: 'id'});

//another Example

db.tutorial = require("./tutorial")(sequelize, Sequelize);
db.tag = require("./tutorialType")(sequelize, Sequelize);
db.tut_tag = require("./tutotial_tag")(sequelize, Sequelize);

db.tag.belongsToMany(db.tutorial, {
    through: "tutorial_tags",
    as: "tutorials",
    foreignKey: "tag_id",
  });

//   db.tutorial.belongsToMany(db.tag, {
//     through: "tutorial_tag",
//     as: "tags",
//     foreignKey: "tutorial_id",
//   });

module.exports = db;