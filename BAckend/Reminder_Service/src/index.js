require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');

const { PORT, REMINDER_BINDING_KEY } = require('./Config/serverConfig'); 
const { createChannel, subscribeMessage } = require('./utils/messageQueue');
const { 
    sendBasicEmail, 
    createNotificationTicket, 
    fetchPendingNotifications, 
    updateTicket 
} = require('./Services/email-services');
const db = require('./models');

const setupAndStartServer = () => {
    const app = express();  
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.listen(PORT, async () => {
        console.log(`Reminder Service is running on port ${PORT}`);
        
        await db.sequelize.sync();
        console.log("Database synced successfully in Reminder Service");

        // Setup RabbitMQ channel and subscribe to emails
        try {
            const channel = await createChannel();
            await subscribeMessage(channel, async (payload) => {
                console.log("RabbitMQ message received:", payload);
                if (payload.service === 'SEND_MAIL') {
                    await createNotificationTicket({
                        subject: payload.data.subject,
                        content: payload.data.content,
                        recepietEmail: payload.data.recepietEmail,
                        notificationTime: payload.data.notificationTime
                    });
                    console.log("Notification Ticket created successfully from queue message.");
                }
            }, REMINDER_BINDING_KEY);
        } catch (queueError) {
            console.log("RabbitMQ subscription failed:", queueError.message);
        }
        
        // Cron Job to process and send emails every minute
        cron.schedule('*/1 * * * *', async () => {
            console.log('Poller running: checking for pending notification tickets...');
            try {
                const pendingTickets = await fetchPendingNotifications();
                console.log(`Found ${pendingTickets.length} pending notification ticket(s).`);
                for (const ticket of pendingTickets) {
                    try {
                        await sendBasicEmail(ticket.recepietEmail, ticket.subject, ticket.content);
                        await updateTicket(ticket.id, { status: 'SUCCESS' });
                    } catch (emailError) {
                        console.error(`Failed to send email for ticket ${ticket.id}:`, emailError.message);
                        await updateTicket(ticket.id, { status: 'FAILED' });
                    }
                }
            } catch (cronError) {
                console.error("Cron poll error:", cronError.message);
            }
        });
    });
}   

setupAndStartServer();