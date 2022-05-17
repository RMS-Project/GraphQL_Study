// Importação da biblioteca http.
import { createServer } from 'http';

// Biblioteca file System.
// Lê arquivos do sistema como código estático HTML.
// readFile - Lê os arquivos assincronamente.
import { readFile } from 'fs';

// Trabalha com caminhos relativos.
// resolve - Vai injetor para cada modulo o caminho onde ele se encontra.
import{ resolve } from 'path';

// Decodifica as QueryStrings
import { parse } from 'querystring';

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

		case '/home': {
			// Vai injetor para cada modulo o caminho onde ele se encontra.
			const path = resolve(__dirname, './pages/home.html');

			// Node trabalha com callback para processos acincronos.
			// recebendo primeiramente um erro e depois a arquivo
			readFile(path, (error, file) => {
				// Caso não encontre o arquivo.
				if (error) {
					response.writeHead(500, 'Can\'t process HTML file.');
					response.end();
					return;
				}

				response.writeHead(200);
				response.write(file);
				response.end();
			})
			break;
		}

		case '/sign-in': {
			// Vai injetor para cada modulo o caminho onde ele se encontra.
			const path = resolve(__dirname, './pages/sign-in.html');

			// Node trabalha com callback para processos acincronos.
			// recebendo primeiramente um erro e depois a arquivo
			readFile(path, (error, file) => {
				// Caso não encontre o arquivo.
				if (error) {
					response.writeHead(500, 'Can\'t process HTML file.');
					response.end();
					return;
				}

				response.writeHead(200);
				response.write(file);
				response.end();
			})
			break;
		}

		case '/authenticate': {
			let data = '';

			// Patterne de eventos
			// Lê os dados pouco a pouco.
			// chunk - Evento que recebe as partes.
			request.on('data', (chuck) => {
				// Estas partes são somadas em data.
				// data vem codificado em querySring como parate da URL.
				data += chuck;
			})

			// Quando terminar de ler o arquivo
			// vai redirecionar o caminho para a Home.
			request.on('end', ()=> {
				// parser - transforma queryString em objeto.
				const params = parse(data);
				response.writeHead(301, {
					Location: '/home',
				});
				response.end();
			});
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
