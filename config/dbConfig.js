module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'password',
    DB: 'nodedata',
    dialect: 'mysql',
    define:{
        timestamps: true,
        underscored: true,
        underscoredAll: true,
        freezeTableName: true,
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    } 
}