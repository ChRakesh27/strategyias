import nodemailer from "nodemailer";
import User from "@/models/user";
import bcryptjs from "bcryptjs";
import connectDb from "@/middleware/mongoose";

 const sendEmail = async (req, res) => {
  try {
     const { email, emailType } =req.body;

     const existingUser = await User.findOne({email : email});
     if(!existingUser){
      return res.status(400).json({error: "user not found in the data base"});
     }
     const userId = existingUser._id;

    const hashedToken = bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD,
      },
    });
    const mailOptions = {
      from: "pratham27900@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href = "${process.env.NEXT_PUBLIC_DOMAIN}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } </p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error) {
    console.log(error);
  }
};

export default connectDb(sendEmail);