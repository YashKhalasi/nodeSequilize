const models = require("../models");
const { Op } = require("sequelize");
const jwt_decode = require("jwt-decode");
const crypto = require("crypto");
const sendEmail = require("../config/sendEmail");

const accHolder = models.investor;
const accParanoidHolder = models.investorParanoid;
const accStatus = models.accStatus;
const userVerification = models.userVerification;

const addHolder = async (req, res) => {
  console.log("adding holder...", req.body);

  let holderInfo = {
    holder_name: req.body.holder_name,
    holder_email: req.body.holder_email,
    holder_accno: req.body.holder_accno,
    holder_portfolio: req.body.holder_portfolio,
    holder_Password: req.body.holder_Password,
    holder_Active: req.body.holder_Active ? req.body.holder_Active : true,
    holder_Role: req.body.holder_Role,
  };
let tokenValue = crypto.randomBytes(32).toString("hex");
console.log("Generated token value: ",tokenValue);
  let userVerificationDayta = {
    holder_accno: req.body.holder_accno,
    holder_email: req.body.holder_email,
    userVerified: false,
    userToken: tokenValue
  };
  try {
    const chckAccNo = await accHolder.findOne({
      where: { holder_accno: parseInt(req.body.holder_accno) },
    });

    const checkEmail = await accHolder.findOne({
      where: { holder_email: req.body.holder_email },
    });

    console.log("found holder accno: ");
    console.log(chckAccNo);

    if (chckAccNo === null) {
      if (checkEmail === null) {
        const apiCall = await accHolder.create(holderInfo);
        const apiCall1 = await accParanoidHolder.create(holderInfo);
        console.log("User Created !!", apiCall1);

        if (apiCall !== null) {
          const verificationApi=await userVerification.create(userVerificationDayta);
          console.log(userVerificationDayta,"=== Verification Success !!", verificationApi);

          const url = `http://localhost:3000/verify?${req.body.holder_accno}&&${tokenValue}`;
          await sendEmail(req.body.holder_email, "Verify Email", url);

          res.json({
            success: true,
            message:
              "User Created successfully !! please verify the user and login to your account.",
          });
          // res.status(200).send(apiCall);
        }
      } else {
        res.json({
          success: false,
          message:
            "User with given email already Exist , Please try different Email.",
        });
      }
    } else {
      res.json({
        success: false,
        message:
          "Account number is already in use , Please try different account number.",
      });
    }
  } catch (err) {
    console.log("error creating holder", err);
    return res.json({
      success: false,
      data: "Something worng happened , please try again !",
    });
  }
  // console.log("Holder created successfully!! ",apiCall.dataValues);
};

const getHolders = async (req, res) => {
  // console.log("getHolders..", res);

  const apiCall = await accHolder.findAll({});
  res.status(200).send({ data: apiCall, success: true });
};

const getLoginUser = async (req, res) => {
  console.log("adding getLoginUser  Investor...", req.headers.authorization);
  const base64Credentials = req.headers.authorization.split(" ")[1];
  console.log("base64Credentials: " + base64Credentials);
  var token = base64Credentials;
  var decoded = jwt_decode(token);
  let token_Data = decoded.result;
  console.log("Token decoded:", token_Data);

  let accCode = token_Data.holder_accno;

  try {
    const chckAccNo = await accHolder.findOne({
      where: { holder_accno: accCode },
    });
    console.log("found holder accno: ", accCode);
    console.log(chckAccNo);
    if (chckAccNo !== null) {
      return res.json({
        success: true,
        data: chckAccNo,
      });
      // res.status(200).send(apiCall);
    } else {
      return res.json({
        success: false,
        message:
          "There is some technical issue, Please try different account number.",
      });
    }
  } catch (err) {
    console.log("error creating holder", err);
    return res.json({
      success: false,
      data: "Something worng happened , please try again !",
    });
  }
};

const updateHolders = async (req, res) => {
  let accno = req.body.holder_accno;
  let emailId = req.body.holder_email;
  console.log(req.body, "getHolders..", emailId);
  try {
    // const findData = await accHolder.find({
    //     where:{'holder_accno': 8001}
    // }).on('success',await accHolder.update(req.body,{ where: { holder_accno: 8001 }} ))
    // res.status(200).send(findData);

    const chckAccNo = await accHolder.findOne({
      where: { holder_accno: accno },
    });
    console.log("check chckAccNo", chckAccNo);
    if (chckAccNo !== null) {
      let chckEmailID = null;
      if (emailId !== undefined) {
        chckEmailID = await accHolder.findOne({
          where: {
            holder_email: emailId,
          },
        });
      }

      console.log("check EmailId", chckEmailID);

      if (chckEmailID === null) {
        const updateUser = await accHolder.update(req.body, {
          where: { holder_accno: accno },
        });
        await accParanoidHolder.update(req.body, {
          where: { holder_accno: accno },
        });
        console.log("getHolders..", updateUser);
        return res.json({
          success: true,
          message: "User Data updated successfully !!",
        });
      } else {
        return res.json({
          success: false,
          message:
            "Email Id is already in use , please try different emailId .",
        });
      }
    } else {
      return res.json({
        success: false,
        message: "Given User not found",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteHolders = async (req, res) => {
  // let accId = req.body.data.holder_accno;
  let accId = req.body.holder_accno;
  console.log(accId, "Delete getHolders..", req);

  await accHolder.destroy({ where: { holder_accno: accId } });
  await accParanoidHolder.destroy({ where: { holder_accno: accId } });
  res
    .status(200)
    .send({ success: true, message: "User deleted successfully!" });
};

//connect one to one relation AccHolder and AccStatus

const getAccStatus = async (req, res) => {
  // const id = req.params.id

  const data = await accHolder.findAll({
    include: [
      {
        model: accStatus,
        as: "status",
        where: { holder_Active: false },
        attributes: ["holder_accno", "holder_Active"],
      },
    ],
    where: { holder_Active: false },
    attributes: [
      "holder_name",
      "holder_email",
      "holder_accno",
      "holder_portfolio",
      "holder_Active",
    ],
    // where: { [Op.and]:[
    //    { holder_Active: true}  ,
    // //    {'status.holder__active':true}
    // ] }
  });

  res.status(200).send(data);
};

//connect one to one belongs to relation AccHolder and AccStatus

const getHolderDetails = async (req, res) => {
  // const id = req.params.id

  const data = await accStatus.findAll({
    include: [
      {
        model: accHolder,
        as: "investor",
        // where:{holder_Active:false},
        attributes: [
          "holder_name",
          "holder_email",
          "holder_accno",
          "holder_portfolio",
          "holder_Active",
        ],
      },
    ],
    where: { holder_Active: true },
    attributes: ["holder_accno", "holder_Active"],
  });

  res.status(200).send(data);
};

module.exports = {
  addHolder,
  getHolders,
  getAccStatus,
  getHolderDetails,
  deleteHolders,
  updateHolders,
  getLoginUser,
};
