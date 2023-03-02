import http from 'node:http'

import { qs } from './utils'
import { login, userInfo, userMenu }  from './user'

let server = http.createServer()

server.on('request',function (request,response) {
    let url = request.url
    console.log('======', url)

    switch (url) {

        case '/api/login':
            response.end(login())
            break;

        case '/api/userInfo':
            response.end(userInfo())
            break;
        case '/myapi/userMenu':
            response.end(userMenu())
            break;

        default:
            response.end(qs({
                code: 400,
                msg: 'error'
            }))
            break;
    }

})






//绑定端口号 启动服务
server.listen(9999,function () {
    console.log('已经开启您的http服务器')
    console.log('访问地址：http:127.0.0.1:9999/')
})
