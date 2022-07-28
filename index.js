import nodemailer from 'nodemailer';
import fetch from "node-fetch";

const badRequest = {
    statusCode: 400,
    body: JSON.stringify('Bad Request'),
}

const unauthorizedRequest = {
    statusCode: 401,
    body: JSON.stringify('Unauthorized'),
}

const sentSuccessfully = {
    statusCode: 200,
    body: JSON.stringify('Sent')
}

const serverError = (message) => {
    return {
        statusCode: 500,
        body: JSON.stringify(message)
    }
}
 
export const handler = async (event) => {
    const req = event.queryStringParameters
    if (!req) {
        return badRequest
    }
    if (!req.email || !req.name || !req.msg || !req.captcha) {
        return badRequest
    }

    const text = `From: ${req.name}, ${req.email}\n\n${req.msg}`
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
    });

    try {
        const captchaURI = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.captcha}`
        const captchaRes = await fetch(captchaURI, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            },
        })
        const captchaValidation = await captchaRes.json()
        if (captchaValidation.success) {
            const mailObject = {
                text: text,
                from: process.env.SMTP_USERNAME,
                to: process.env.SMTP_USERNAME,
                subject: `New contact from ${req.email}`,
            }
            const info = await transporter.sendMail(mailObject)
            console.log("Sent Mail")
        } else {
            return unauthorizedRequest
        }
    } catch(e) {
        console.log(JSON.stringify(e))
        return serverError(e)
    }
    return sentSuccessfully
};
