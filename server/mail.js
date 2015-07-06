Accounts.config({
    sendVerificationEmail: true
});

Meteor.startup(function () {
  smtp = {
    username: 'harry@madebyfieldwork.com',
    password: '2hgumhc8tByar58A0GGf7w',
    server:   'smtp.mandrillapp.com',
    port: 587
 };
    
  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});