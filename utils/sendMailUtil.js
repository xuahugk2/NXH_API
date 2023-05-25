import nodemailer from 'nodemailer';

export const sendMail = async () => {
    try {
        console.log(process.env);

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
                clientId: process.env.OAUTH_CLIENT_ID,
                clientSecret: process.env.OAUTH_CLIENT_SECRET,
                refreshToken: process.env.OAUTH_REFRESH_TOKEN
            }
        });

        const mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: 'hungnx.482@gmail.com',
            subject: 'Nodemailer Project',
            text: 'Hi from your nodemailer project',
        };

        transporter.sendMail(mailOptions, (err, info) => {
            console.log({ err, info });
            if (err) {
                return {
                    status: 503,
                    message: 'Reset password failed.'
                };
            } else {
                return {
                    status: 200,
                    message: 'Please, check your email to reset the password.'
                };
            }
        })
    } catch (error) {
        console.log(error);
        return {
            status: 503,
            message: 'Reset password failed.'
        }
    }
};
