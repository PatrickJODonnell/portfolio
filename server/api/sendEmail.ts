import * as dotenv from 'dotenv';
import * as nodemailer from 'nodemailer';
import { defineEventHandler, readBody} from 'h3'

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: process.env.EMAIL_SECURE,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    } as nodemailer.TransportOptions);

    async function sendEmail() {
        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: "patrickjodonnell@comcast.net",
            subject: "Message Request from Portfolio",
            text: `Name: ${body.name} \nEmail: ${body.email} \nMessage: ${body.message}`,

        });
    }
    await sendEmail().catch(console.error);
});