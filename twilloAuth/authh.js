import twilio from 'twilio';

// Import the necessary Twilio dependencies
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

let phoneNumber = '+918696730993';
// Function to send verification code via SMS
function twilioAuth(phoneNumber) {
  // Generate a random verification code
  const verificationCode = Math.floor(1000 + Math.random() * 9000);

  // Send the verification code via SMS
  client.messages
    .create({
      body: `Your verification code is: ${verificationCode}`,
      from: '+919950386889',
      to: phoneNumber,
    })
    .then((message) => console.log(`Verification code sent: ${message.sid}`))
    .catch((error) =>
      console.error(`Error sending verification code: ${error.message}`)
    );
}

// Export the twilioAuth function
export default twilioAuth;
