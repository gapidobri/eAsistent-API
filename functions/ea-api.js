const ea = require('./ea-query')
const moment = require('moment')
require('dotenv').config()

module.exports = class EAClient {

    constructor(username, password) {
        return (async () => {
            this.login = await ea.loginAsync(username, password)
            return this
        })()
    }

    async timetable(from, to) {
        var timetable = await ea.requestAsync(`https://www.easistent.com/m/timetable/weekly?from=${from}&to=${to}`, this.login)
        return timetable
    }

    async grades() {
        var grades = await ea.requestAsync('https://www.easistent.com/m/grades', this.login)
        return grades.items
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
        //return await ea.requestAsync('https://www.easistent.com/m/messages', this.login)
    }
    
    async praisesAndImprovements() {
        var pai = await ea.requestAsync('https://www.easistent.com/m/praises_and_improvements', this.login)
        return pai.items
    }

}