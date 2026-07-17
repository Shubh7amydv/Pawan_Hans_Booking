# Pushpak_Viman_Booking-

This is a Node.js MySQL Flight Booking System built using a Microservice Architecture.
It consists of multiple microservices:
1. **Auth Service**: Handle user signup, login, JWT token generation, verification, and role-based permissions.
2. **ABP (Flight & Search) Service**: Handle city, airport, airplane, and flight management/searches.
3. **Booking Service**: Handle booking creation, cancellations, and payment processing with transactional integrity.
4. **Reminder Service**: Node-cron and nodemailer based service to send notifications and reminders.
5. **API Gateway**: Single entry point that routes requests to the correct services and validates users.
