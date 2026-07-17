const transporter = require('../Config/emailconfig');
const { EMAIL_ID } = require('../Config/serverConfig');
const { NotificationTicket } = require('../models/index');
const { Op } = require('sequelize');

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
        console.error("❌ Error sending email:", error.message);
        throw error;
    }
};

const createNotificationTicket = async (data) => {
    try {
        const ticket = await NotificationTicket.create({
            subject: data.subject,
            content: data.content,
            recepietEmail: data.recepietEmail,
            status: data.status || 'PENDING',
            notificationTime: data.notificationTime
        });
        return ticket;
    } catch (error) {
        console.error("❌ Error creating notification ticket:", error.message);
        throw error;
    }
}

const fetchPendingNotifications = async () => {
    try {
        const tickets = await NotificationTicket.findAll({
            where: {
                status: 'PENDING',
                notificationTime: {
                    [Op.lte]: new Date()
                }
            }
        });
        return tickets;
    } catch (error) {
        console.error("❌ Error fetching pending notifications:", error.message);
        throw error;
    }
}

const updateTicket = async (ticketId, data) => {
    try {
        const ticket = await NotificationTicket.findByPk(ticketId);
        if (data.status) {
            ticket.status = data.status;
        }
        await ticket.save();
        return ticket;
    } catch (error) {
        console.error("❌ Error updating ticket:", error.message);
        throw error;
    }
}

module.exports = {
    sendBasicEmail,
    createNotificationTicket,
    fetchPendingNotifications,
    updateTicket
};
