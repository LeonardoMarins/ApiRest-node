export async function json(req,res) {
    const buffers = []


    for await(const chunk of req) { // await vai permitir que nada execute ate o carregamento do buffer ser completado
        buffers.push(chunk)
    }

   try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
   }catch {
    req.body = null
   }

    console.log(req.body);
}