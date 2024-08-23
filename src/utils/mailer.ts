import nodemailer from "nodemailer";
import User from "@/models/user.model";
import bcrptyjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashToken = await bcrptyjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashToken,
        forgotPasswordExpires: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: "pawan630703@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      text: "Hello world?",
      html: `<p>
      Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashToken}">here</a>
      to ${
        emailType === "VERIFY" ? "verify your password" : "reset your password"
      }
     copy and paste the url into the browser 
     <br/>
     <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">
     ${process.env.DOMAIN}/verifyemail?token=${hashToken}
      </a>
      <p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailOptions;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
