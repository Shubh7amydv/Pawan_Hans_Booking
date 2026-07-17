const transporter = require('../Config/emailconfig');
const { EMAIL_ID } = require('../Config/serverconfig');

/**
 * Sends a basic email
 * @param {string} mailTo - Receiver email
 * @param {string} mailSubject - Subject of email
 * @param {string} mailBody - Body of email
 */
const sendBasicEmail = async (mailTo, mailSubject, mailBody) => {
    try {
        const response = await transporter.sendMail({
            from: EMAIL_ID,   // Sender email from .env
            to: mailTo,
            subject: mailSubject,
            text: mailBody
        });

        console.log("✅ Email sent successfully");
        console.log("Message ID:", response.messageId);

        return response;

    } catch (error) {
        console.error("❌ Error sending email:");
        console.error(error.message);

        throw error;  // important for higher-level handling
    }
};

module.exports = {
    sendBasicEmail
};
