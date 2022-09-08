const holder = require('../controllers/AccHolderController');
const accStatus=require('../controllers/AccIsActiveController');
const investments = require('../controllers/InvestmentController');
const { checkToken } = require("../auth/token_validation");
const router = require('express').Router();
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../auth/verifyRoles');
 
// accHolder
router.post('/',holder.addHolder);
router.get('/', checkToken,verifyRoles(ROLES_LIST.Partner, ROLES_LIST.Advisor),holder.getHolders);
router.get('/loginUser', checkToken,holder.getLoginUser);
router.delete('/',verifyRoles(ROLES_LIST.Advisor),holder.deleteHolders)
router.put('/',checkToken,verifyRoles(ROLES_LIST.Partner, ROLES_LIST.Advisor), holder.updateHolders)

// router.post('/',verifyRoles(ROLES_LIST.Partner, ROLES_LIST.Advisor,ROLES_LIST.Investor),holder.addHolder);
// router.get('/',checkToken,verifyRoles(ROLES_LIST.Partner, ROLES_LIST.Advisor), holder.getHolders);
// router.delete('/',verifyRoles(ROLES_LIST.Partner), holder.deleteHolders)
// router.put('/',verifyRoles(ROLES_LIST.Partner, ROLES_LIST.Advisor), holder.updateHolders)

//acc iSActive
router.post('/isActive', accStatus.accActivate);
router.get('/isActive', accStatus.getAccStatus);
router.put('/isActive', accStatus.updateAccStatus);

//Investments
router.post('/investments', investments.addInvestor);
router.get('/investments', investments.getInvestmentDetails);

//one to one 
router.get('/one',holder.getAccStatus);
//belongsTo
router.get('/belongsTo',holder.getHolderDetails);
//ome to Many
router.post('/oneToMany',investments.getPortfolioDetails)
//many to many
router.post('/manyToMany',investments.postAccrelationShip) 
router.get('/manyToMany',investments.getAccProfit)

module.exports = router;