 // stdin tudo que o usuario digita no terminal
//process.stdin
//.pipe(process.stdout)


import {Readable,Writable,Transform} from 'node:stream'

class OneToHundredStream extends Readable {

    index = 1;

    _read() { // retorna quais dados da stream
        const i = this.index++;

        setTimeout(() => {
            if(i > 100) {
                this.push(null)
            }else {
                const buf = Buffer.from(String(i))  // buffer converter para o formato buffer
    
                this.push(buf)
            }
        },1000)
    }
}

class MultiplyByTenStream extends Writable { //stream de escrita nunca vai retornar nada
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10) 
        callback();
    }
}
class InverseNumberStream extends Transform {
    _transform(chunk,encoding,callback) {
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
    }
}


new OneToHundredStream() // stream de leitura
.pipe(new InverseNumberStream()) // stream de transforme ela le dado de um lugar e escrever dados para outro lugar
.pipe(new MultiplyByTenStream()) // stream de escrita