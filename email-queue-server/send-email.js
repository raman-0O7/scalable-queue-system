const { Worker } = require('bullmq');

async function sendEmail(payload){
    const { to } = payload;
    return new Promise((resolve, reject) => {
        console.log(`Sending mail to ${to}..`);
        setTimeout(()=> {
            return resolve(1)
        }, 2 * 1000)
    })
}
const emailWorker = new Worker("emailQueue", async (job)=>{
    await sendEmail(job.data);
}, {
    connection: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        username: process.env.REDIS_USER,
        password: process.env.REDIS_PASSWORD,
    },
    limiter: {
        max: 10,
        duration: 1000,
    }
}, );

module.exports = {
    emailWorker
}