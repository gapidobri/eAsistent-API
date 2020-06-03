const rp = require('request-promise')
const { Cookie } = require('tough-cookie')
const getMeta = require('lets-get-meta')

exports.loginAsync = async (username, password) => {
    
    var login_res = await rp({
        method: 'POST',
        uri: 'https://www.easistent.com/p/ajax_prijava',
        form: {
            uporabnik: username,
            geslo: password
        },
        resolveWithFullResponse: true
    })

    var session_cookie = new Cookie.parse(login_res.headers['set-cookie'][0])

    var token_res = await rp({
        method: 'GET',
        uri: 'https://www.easistent.com',
        headers: {
            'cookie':`${session_cookie.key}=${session_cookie.value}`
        }
    })

    return {
        'token': getMeta(token_res)['access-token'],
        'child_id': getMeta(token_res)['x-child-id']
    }

}

exports.requestAsync = async (url, { token, child_id }) => {

    var request = await rp({
        method: 'GET',
        uri: url,
        headers: {
            'authorization': token,
            'x-client-platform': 'web',
            'x-client-version': '13',
            'x-child-id': child_id
        }
    })

    return JSON.parse(request)

}