const EAClient = require('./ea-api')
require('dotenv').config()

async function test() {

    client = await new EAClient(process.env.USER, process.env.PASS)
    console.log(await client.grades())
}

test()