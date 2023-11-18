import http from 'node:http'
import { json } from './middleware/json.js'
import { routes } from './routes.js'




//stateful -> depende de informações salvas em memoria

//stateless -> ela não salva em memoria vai salvar em banco de dados ou arquivos de textos


/*

Claro, vou fornecer outro exemplo utilizando um cabeçalho comum em uma solicitação HTTP. 
Suponha que você esteja fazendo uma solicitação GET para obter informações sobre um recurso 
específico e queira incluir informações sobre o tipo de conteúdo que aceita em resposta. Nesse caso, 
você pode utilizar o cabeçalho "Accept". Veja um exemplo:

http
Copy code
GET /exemplo/recurso HTTP/1.1
Host: www.exemplo.com
Accept: application/json

Neste exemplo, o cabeçalho "Accept" indica que o cliente aceita uma resposta no formato JSON. 
Isso permite que o servidor, se possível, forneça a resposta no formato solicitado.

Os cabeçalhos HTTP são fundamentais para a comunicação entre clientes e servidores, pois 
fornecem informações adicionais sobre a solicitação ou resposta, ajudando na interpretação correta das mensagens.

*/
const users = []


const server = http.createServer(async(req,res) => {
    const {method, url} = req

    await json(req,res)
        
    const route = routes.find(route => {
        return route.method === method && route.path === url
    })

    if(route) {
        return route.handler(req, res)
    }
    return res.writeHead(404).end('Not found')
})


server.listen(3333)