const EAClient = require('./ea-api')
require('dotenv').config()

async function test() {

    client = await new EAClient(process.env.USER, process.env.PASS)
    console.log(await client.timetable('2020-06-01', '2020-06-07'))
}

test()