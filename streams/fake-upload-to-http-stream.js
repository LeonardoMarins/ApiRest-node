import {Readable} from 'node:stream'

class OneToHundredStream extends Readable {

    index = 1;

    _read() { // retorna quais dados da stream
        const i = this.index++;

        setTimeout(() => {
            if(i > 5) {
                this.push(null)
            }else {
                const buf = Buffer.from(String(i))  // buffer converter para o formato buffer
    
                this.push(buf)
            }
        },1000)
    }
}

fetch('http://localhost:3334', {
    method: 'POST', // no caso uma stream em uma requisicao http so pode ser enviada se for metodo post ou put
    body: new OneToHundredStream(),
}).then(response => {
    return response.text()
}).then(data => {
    console.log(data)
})
