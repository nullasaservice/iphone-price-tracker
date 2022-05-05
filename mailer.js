const nodemailer = require('nodemailer');
const { crawl } = require('./crawler');
const { logInfo } = require('./logger');

const mailer = async () => {
  const ADDR = process.env.EMAIL_ACC_ADDR;
  const PASS = process.env.EMAIL_ACC_PASS;
  const availableIphones = await crawl();

  if (availableIphones.length < 1) {
    logInfo("No items to notify");
  }
  if (availableIphones.length > 1) {
    logInfo("Items found!");
    
    const message = {
      from: ADDR,
      to: ADDR,
      subject: "iPhones found! :)",
      text: JSON.stringify(availableIphones),
      html: `
        <h1>iPhones in stock:</h1>
        <ul>
        ${availableIphones.reduce((htmlItems, item) =>
          htmlItems + `<li><a href="${item.link}">${item.title} - ${item.price}</a></li>`
        , "")}
        </ul>
      `
    };
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: ADDR,
        pass: PASS
      }
    });
  
    transporter.sendMail(message, (error, info) =>
      error ? logInfo(error) : logInfo(`Sent: ${info.response}`)
    );
  }
};

exports.mailer = mailer;