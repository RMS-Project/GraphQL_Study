// Importação da biblioteca http.
import { createServer } from 'http';

// Cria um servidor.
// const server = createServer();

// Cria um callbak para responder a solicitações.
const server = createServer((request, response) => {

	switch(request.url) {
		case '/status': {
			
			/* ---- Cabeçalho para envio de texto simples ---- */

			// Inicializa o buffer com o cabeçalho e status 200.
			//response.writeHead(200);
			
			// Conteúdo do corpo da resposta. Com texto simples.
			//response.write('OK');

			/* ------------------------------------------------ */


			/* ---- Cabeçalho para envio de dados com JSON ---- */

			// Inicializa o buffer com o cabeçalho e status 200.
			response.writeHead(200, {
				'Content-Type': 'application/json'
			});
			
			// Conteúdo do corpo da resposta. Em formato JSON.
			response.write(
				// Converte string em JSON.
				JSON.stringify({
					status: 'Ok',
				})
			);

			/* ------------------------------------------------ */

			// Finaliza a resposta e envia para o cliente. 
			response.end();
			break;
		}

		// Qualquer URL que não seja encontrada envia o status 404.
		// Página não encontrada.
		default: {
			response.writeHead(404, 'Service not found.')
			response.end();
		}
	}
});

// Configuração de interface (porta) para alterar configurações via 
// variável de ambiente. Caso exista use senão porta default 8080.
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;

// Configuração do Hostname para alterar configurações via variável 
// de ambiente. Se não existir um HOSTNAME definido fai atribuir false
// aplicando então o endereço padrão 127.0.0.1.
const HOSTNAME = process.env.HOSTNAME || '127.0.0.1'

// Testes de execução - PORT=3000 yarn start ou HOSTNAME=192.168.0.116 PORT=3000 yarn start 

// Executa o servidor.
server.listen(PORT, HOSTNAME, () => {
	console.log(`Servidor em execução em http://${HOSTNAME}:${PORT}`);
});
