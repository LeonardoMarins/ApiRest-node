import http from 'node:http'
import {Transform} from 'node:stream'


class InverseNumberStream extends Transform {
    _transform(chunk,encoding,callback) {
        const transformed = Number(chunk.toString()) * -1

        console.log(transformed)

        callback(null, Buffer.from(String(transformed)))
    }
}

// req => readableStream
//res => writableStream

const server = http.createServer(async(req,res) => {

    const buffers = []


    for await(const chunk of req) { // await vai permitir que nada execute ate o carregamento do buffer ser completado
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()
        return res.end(fullStreamContent)

    //return req
    //.pipe(new InverseNumberStream())
    //.pipe(res)
})

server.listen(3334)