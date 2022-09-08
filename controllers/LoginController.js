const db = require("../models");
const { Op } = require("sequelize");
const { sign } = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../config/sendEmail");
const sendVerifiedEmail = require("../config/sendVerifedEmail");

// model
const userLogin = db.loginUser;
const users = db.investor;
const userVerification = db.userVerification;
// functions

const loginUser = async (req, res, next) => {
  const body = req.body;
  res.set("Access-Control-Allow-Origin", "*");
  try {
    const userVerified = await userVerification.findOne({
      where: {
        [Op.and]: [
          { holder_accno: parseInt(body.loginId) },
          { userVerified: true },
        ],
      },
    });
    console.log("userVerified==>>", userVerified);

    if (userVerified) {
      const userApiCall = await users.findOne({
        where: {
          [Op.and]: [
            { holder_accno: parseInt(body.loginId) },
            { holder__password: body.password },
          ],
        },
      });

      if (userApiCall !== null) {
        console.log("login successfully...", userApiCall);
        const jsontoken = sign({ result: userApiCall }, "qwe1234", {
          expiresIn: "1h",
        });
        return res.json({
          success: true,
          message: "login successfully",
          token: jsontoken,
        });
        // res.status(200).send(userApiCall);
      } else {
        console.log("Invalid UserId or password...please try again !!");
        return res.json({
          success: false,
          data: "Invalid UserId or password , please try again !",
        });
      }
    } else {
      console.log(
        "User is not Verified yet, please check verfication mail and verify the user!!"
      );
      return res.json({
        success: false,
        data: "User is not Verified yet, please check verfication mail and verify the user!!",
      });
    }
  } catch (err) {
    console.log("error", error);
    res.status(400).send("Something wrong happened : " + err.message);
  }
};

const userVerify = async (req, res) => {
  console.log("userVerify", req.body);
  const accno = req.body.accCode;
  const token = req.body.tokenString;
  const verify = true;

  let data = { holder_accno: accno, userVerified: true };

  const chckAccNo = await userVerification.findOne({
    where: {
      [Op.and]: [{ holder_accno: parseInt(accno) }, { user_token: token }],
    },
  });
  const userEmail = chckAccNo.dataValues.holder_email;
  console.log(userEmail,"check chckAccNo", chckAccNo.dataValues);
  if (chckAccNo !== null) {
    const userVerified = await userVerification.update(data, {
      where: {
        holder_accno: parseInt(accno),
        //   [Op.and]: [
        //   { holder_accno: parseInt(accno) },
        //   { user_verified: false },
        // ],
      },
    });
    console.log("userVerified==>>", userVerified);

    const url = `http://localhost:3000/login`;
    await sendVerifiedEmail(userEmail, "Verify Email", url);

    return res.json({
      success: true,
      message: "User verified successfully, Please Login !!",
    });
  } else {
    return res.json({
      success: false,
      message: "Given User not found",
    });
  }
};

const resendEmail = async (req, res) => {
  console.log("userVerify", req.body);
  const accno = req.body.accCode;
  const token = req.body.tokenString;

  const chckAccNo = await users.findOne({
    where: { holder_accno: parseInt(accno) },
  });

  if (chckAccNo !== null) {
    const userEmail = chckAccNo.dataValues.holder_email;
    console.log("check chckAccNo", userEmail);

    let tokenValue = crypto.randomBytes(32).toString("hex");
    console.log("Generated token value: ", tokenValue);
    let userVerificationDayta = {
      holder_accno: accno,
      userVerified: false,
      userToken: tokenValue,
    };

    const userVerified = await userVerification.update(userVerificationDayta, {
      where: {
        holder_accno: parseInt(accno),
        //   [Op.and]: [
        //   { holder_accno: parseInt(accno) },
        //   { user_verified: false },
        // ],
      },
    });
    console.log("userVerified==>>", userVerified);

    const url = `http://localhost:3000/verify?${accno}&&${tokenValue}`;
    await sendEmail(userEmail, "Verify Email", url);

    return res.json({
      success: true,
      message: "Email successfully sent please verify your email address.",
    });

  } else {
    return res.json({
      success: false,
      message: "There is something wrong please signup with new email address",
    });
  }
};

module.exports = {
  loginUser,
  userVerify,
  resendEmail,
};
