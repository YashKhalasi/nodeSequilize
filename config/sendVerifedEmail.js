const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		console.log("User verified successfully",subject, text);
		const transporter = nodemailer.createTransport({
			host:"smtp.gmail.com",
			secure: false,
			port: 587,
			// secure: Boolean(process.env.SECURE),
			auth: {
				user: "emailid",
				pass: "password",
			},
		});

		const output = `
				<p>Congratulations  !!</p>
				<h4>You have been successfully verifed and you can login now.<br/> 
					Please click on link below for login</h4>
				<a href=${text} target="_blank"> ${text}</a>
				
    
  				`;

		await transporter.sendMail({
			from: "emailid",
			to: email,
			subject: subject,
			text: text,
			html: output,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};
