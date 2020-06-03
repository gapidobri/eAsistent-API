const ea = require('./ea-query')
require('dotenv').config()

module.exports = class EAClient {

    constructor(username, password) {
        return (async () => {
            this.login = await ea.loginAsync(username, password)
            return this
        })()
    }

    
    async timetable() {
        console.log(await ea.requestAsync('https://www.easistent.com/m/timetable/weekly?from=2020-06-01&to=2020-06-07', this.login))
    }

    async grades() {
        return await ea.requestAsync('https://www.easistent.com/m/grades', this.login)
    }

    async homework() {
        var homework = await ea.requestAsync('https://www.easistent.com/m/homework', this.login)
        return Promise.all(homework.items.map(async hw => {

            let task = await ea.requestAsync(`https://www.easistent.com/m/homework/classes/${hw.class_id}`, this.login)
            let task2 = await ea.requestAsync(`https://www.easistent.com/m/homework/${task.items[0].id}`, this.login)

            hw.task = task2
            return hw

        }))
    }

    async messages() {
        return await ea.requestAsync('https://www.easistent.com/m/messages', this.login)
    }

}