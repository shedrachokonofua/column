require('dotenv').config()
const email = require('../../../modules/email/index');
const getEmailTemplate = require('../../getEmailTemplate');
const moment = require('moment');

async function test() {
  const emailTemplate = await getEmailTemplate('r/forhire', 'newLead');
  const emailData = {
    title: '[Hiring] (North Yorkshire, UK) PHP Developer',
    description: "We are a product company looking for a Frontend Javascript Developer to join our team or work on a React application with us. You will be responsible for the development of modern web application(s). You should be able to be relied upon to consistently produce efficient and well-organized code.<div></div><div></div><div></div><div></div>If you have excellent programming skills and a passion for developing UI/UX of applications or improving existing ones, we would like to meet you. We expect you to be a tech-savvy professional, who is curious about new digital technologies and can work well in a team, along with developers, engineers, and web designers. We offer a dynamic and professional work environment. We are looking for individuals who thrive in a startup environment, are self-starters and are highly motivated to produce high-quality work at a fast pace.<div></div><div></div><div></div><div></div>Full-time in-house position available if you want to travel to SEA.<div></div><div></div><div></div><div></div>## Requirements<div></div><div></div><div></div><div></div>* A bachelor/masters degree in Computer Science or/and at least 2 years of quality experience<div></div><div></div>* You can communicate well in English<div></div><div></div>* You have a strong desire to experience working on a startup team<div></div><div></div>* You are a great team player and able to receive constructive criticism<div></div><div></div>* You are a problem solver and you can work independently and as a team<div></div><div></div>* You have a strong foundation in computer science principles<div></div><div></div>* You know how to optimize and refactor your code, &amp; care about reusability<div></div><div></div>* You are a Javascript pro, and excellent at HTML and CSS principles<div></div><div></div>* You know frameworks and libraries like React, Vue, Angular and Bootstrap<div></div><div></div>* You know frontend compilers, and build tools<div></div><div></div>* You know how to build responsive UIs based on UX principles<div></div><div></div>* You are familiar with Git or other version control systems<div></div><div></div>* You have experience with Restful services and APIs<div></div><div></div>* You have tried out new innovations in technologies such as GraphQL<div></div><div></div><div></div><div></div>You will be required to go through a phone interview(#1), an online shared coding test(#2), and a comprehensive interview(#3) for the full-time position. Please provide code repos or projects you have worked on if there're any.<div></div><div></div><div></div><div></div>If you are looking to just work with us remotely on project basis, please send me a pitch with your portfolio and/or code repo.<div></div><div></div><div></div><div></div>## Perks<div></div><div></div><div></div><div></div>* Travel opportunity<div></div><div></div>* Lodging<div></div><div></div>* International compensation<div></div><div></div><div></div><div></div>Please PM me for more info.<div></div><div></div><div></div><div></div>Cheers!",
    source: 'R_FORHIRE',
    link: "https://www.reddit.com/r/forhire/comments/ah8l7w/hiring_north_yorkshire_uk_php_developer/",
    posted: moment().toDate(),
    sourced: moment().toDate(),
    meta: {
      id: '123'
    }
  };
  await email({
    sender: 'r/forhire Crawler', 
    subject: `New Lead: ${emailData.title}`, 
    template: emailTemplate, 
    data: emailData
  });
}
test()