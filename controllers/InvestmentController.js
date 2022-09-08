const models = require('../models');
const jwt_decode = require('jwt-decode');

const investments = models.investment;
const investor = models.investor;
const accStatus = models.accStatus;
const accRelationship = models.accRelationship;

const addInvestor = async(req,res)=>{
    console.log("adding  Investor...",req.headers.authorization);
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    console.log("base64Credentials: " + base64Credentials)
    var token=base64Credentials;
    var decoded=jwt_decode(token);
    let token_Data =decoded.result
    console.log("Token decoded:",token_Data);

    let investmentInfo = {
        scheme_name: req.body.SchName,
        total_investment: req.body.invested,
        profit: 2500,
        loss: 0, 
        // profit: req.body.profit,
        // loss: req.body.loss, 
        // holder_portfolio: req.body.protfolio, 
        holder_portfolio: parseFloat(token_Data.holder_portfolio) + parseFloat(req.body.invested), 
        holder_accno: token_Data.holder_accno,
        holder_Active: token_Data.holder_Active ? token_Data.holder_Active : false
    }
    console.log("investmentInfo==>",investmentInfo);
    const apiCall = await investments.create(investmentInfo);
    res.status(200).send({data:apiCall,success:true});
    console.log("Investment created successfully!! ",apiCall.dataValues); 
}
 
const getInvestmentDetails = async (req, res) => {
    console.log("investments..",res);
    const apiCall = await investments.findAll({});
    res.status(200).send({data:apiCall,success:true});
}

//connect one to Many relation AccHolder and AccStatus

const getPortfolioDetails =  async (req, res) => {

    // const id = req.params.id
    console.log(Object.keys(req.body).length,'getPortfolioDetails=>....', req.body);
    let accCode = req.body.holder_accno;

    if(Object.keys(req.body).length>0){
        console.log('In if...');
        const data = await investor.findOne({
            include: [{
                model: investments,
                as: 'investment',
                // where:{holder_Active:false},
                attributes:["scheme_name","profit","total_investment","holder_portfolio","holder_Active","holder_accno"]
               
            }],
            where:{holder_accno: accCode},
            attributes:["holder_name","holder_email","holder_accno","holder_portfolio","holder_Active"]
        })

        res.status(200).send({data:[data],success:true})

    }else{
        console.log('In if...');
    const data = await investor.findAll({
        include: [{
            model: investments,
            as: 'investment',
            // where:{holder_Active:false},
            attributes:["scheme_name","profit","total_investment","holder_portfolio","holder_Active","holder_accno"]
           
        }],
        where:{holder_Active: true},
        attributes:["holder_name","holder_email","holder_accno","holder_portfolio","holder_Active"]
    })

    res.status(200).send({data:data,success:true})
}

    

}

const postAccrelationShip = async (req, res) => {

    console.log("adding Relationship with Investor...",req.body);

    let investmentInfo = {
        accStatusId: req.body.accStatusId,
        investmentId: req.body.accInvestmentId, 
    
    }

    const apiCall = await accRelationship.create(investmentInfo);
    res.status(200).send(apiCall);
    console.log("Relationship created successfully!! ",apiCall.dataValues); 
}

const getAccProfit  =  async (req, res) => {
    let data = await accStatus.findAll({
        include:[{
            model:investments,
            as:'invested',
            attributes:['id','scheme_name','profit','total_investment','holder_Active'],
            through: {attributes: []}            
        }],
        attributes:['id','holder_accno','holder_Active']
    });

    res.status(200).send(data);
}

module.exports ={
    addInvestor,
    getInvestmentDetails,
    getPortfolioDetails,
    getAccProfit,
    postAccrelationShip
};