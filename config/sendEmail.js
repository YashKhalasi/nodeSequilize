const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host:"smtp.gmail.com",
			secure: false,
			port: 587,
			// secure: Boolean(process.env.SECURE),
			auth: {
				user: "email id",
				pass: "password",
			},
		});

		const output = `
				<p>You have a new contact request</p>
				<h3>PLease Verify the user</h3>
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
