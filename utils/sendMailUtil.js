import nodemailer from 'nodemailer';

export const sendMail = async () => {
    try {
        const account = await nodemailer.createTestAccount();
        const adminEmail = 'hungnx.482@gmail.com'

        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        })

        const options = {
            from: "Xuan Hung",
            to: adminEmail,
            subject: "Test Nodemailer",
            html: "Test content"
        }

        await transporter.sendMail(options)

        return {
            status: 200,
            message: 'Please, check your to reset the password.'
        }
    } catch (error) {
        console.log(error);
        return {
            status: 503,
            message: 'Reset password failed.'
        }
    }
};
