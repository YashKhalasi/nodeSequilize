 const models = require ('../models');

 const accIsActive = models.accStatus;
 const investments = models.investment;
 const investor = models.investor;

 const accActivate = async(req,res)=>{
    console.log("adding holder...",req.body);

    let holderInfo = {
        holder_accno: req.body.accNo,
        holder_Active: req.body.active ? req.body.active : false
    }

    const apiCall = await accIsActive.create(holderInfo);
    res.status(200).send(apiCall);
    console.log("Acc activate successfully!! ",apiCall.dataValues); 
}

const getAccStatus = async (req, res) => {
    console.log("get Acc Details..",res);

    const apiCall = await accIsActive.findAll({});
    res.status(200).send(apiCall);
}

const updateAccStatus = async (req, res) => {

    let accNo = req.body.accNo
    console.log("accNo:",req.body);

    const updatedAcc = await accIsActive.update(req.body, { where: { 'holder_accno': accNo }})
    const updatedInvestmentAcc = await investments.update(req.body, { where: { 'holder_accno': accNo }})
    const updatedinvestorAcc = await investor.update(req.body, { where: { 'holder_accno': accNo }})

    res.status(200).send(updatedAcc)
   

}

module.exports = {
    accActivate,
    getAccStatus,
    updateAccStatus
}