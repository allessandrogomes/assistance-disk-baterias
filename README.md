# 📦 StockFlow Manager

StockFlow Manager é um sistema desktop que busca solucionar um problema e aperfeiçoar um dos processos de garantia dos
produtos Moura. Este processo trata-se do gerenciamento, organização e retorno ao cliente
das baterias de porta. Recebe-se diariamente vários consumidores finais na porta da
assistência solicitando a garantia do seu produto(bateria). Em sua grande maioria esse
processo leva mais de um dia, e a bateria do cliente precisa ficar na assistência para que a
mesma seja realizada os testes. Diante disso, é preciso emprestar uma bateria ao
consumidor, visto que em sua maioria se dirigem ao depósito no próprio veículo. A
quantidade de baterias para empréstimo é limitada, e para que não haja escassez da
mesma é preciso que os clientes cumpram o prazo de retorno para retirada do diagnóstico,
devolvendo a bateria de empréstimo para que seja possível emprestar também aos clientes
subsequentes. O problema é que a maioria dos consumidores não retornam no prazo
definido e acaba gerando escassez de bateria de empréstimo, ocasionando em uma
insatisfação por parte dos novos clientes que necessitam de uma bateria de empréstimo, e
o desgaste para a assistência técnica. O processo de retornar manualmente ao cliente é
muito custoso, principalmente no tempo que é preciso para realizar tal atividade, então foi
desenvolvido o StockFlow Manager que não só conta com essa funcionalidade de auxiliar
no retorno, como também gerenciar todas as baterias de requisições e de empréstimo.
Mais adiante irá conhecer todas as funcionalidades e como o sistema irá auxiliar a equipe
técnica da empresa na prática.

![Static Badge](https://img.shields.io/badge/version-v1.0.0-green)
![Static Badge](https://img.shields.io/badge/license-restricted-blue)
![Static Badge](https://img.shields.io/badge/react_v18.2.0-5ED3F3)
![Static Badge](https://img.shields.io/badge/electron_v28.2.0-2A2D38)
![Static Badge](https://img.shields.io/badge/vite_v5.0.12-%23AA46F7)
![Static Badge](https://img.shields.io/badge/javascript-yellow)
![Static Badge](https://img.shields.io/badge/plataform-windows-%230749C2)
![Maintenance](https://img.shields.io/maintenance/yes/2024.svg)

# 💻 Requisitos do sistema
StockFlow Manager foi desenvolvido e testado especificamente para o sistema operacional Windows,
onde recomenda-se a utilização do Windows 10 ou superior de 32bits ou 64bits.

# 🚀 Funcionalidades

## Entrada de dados

Realiza-se o processo de entrada dos dados por meio do formulário ‘Adicionar uma nova
requisição’. O formulário conta com validações, formatação dos dados e prevenção de erros
para auxiliar o usuário com notificações sobre o estado do processo. Além disso, logo mais
abaixo temos uma tabela de exibição e consulta dos dados que são armazenados
localmente no sistema do usuário, mais especificamente em “documentos” na pasta
“stockflow-manager”. Com essa tabela é possível filtrar e ordenar os dados de acordo com a
preferência do usuário ou fins de consulta. A tabela é organizada em páginas para melhor
controle e legibilidade das informações.

![Entrada-dados](https://github.com/allessandrogomes/stockflow-manager/assets/112139213/e0eabcef-e7f8-4df0-aea8-c3f2d6edc4c3)

## Saída de dados

Interface direcionada para realizar a saída das requisições em que o processo de garantia
foi finalizado. O procedimento é bastante simples, basta o usuário filtrar e selecionar as
requisições a serem finalizadas e clicar no botão “REALIZAR SAÍDAS”. Após esse
processo, o sistema automaticamente irá realizar todos os métodos necessários para
manter os dados atualizados, como por exemplo, atualizar a disponibilidade das baterias de
empréstimo.
Temos também a opção “SAÍDA REQUISIÇÃO PERMUTADA”. Caso uma bateria de uma
requisição tenha sido feita a PERMUTA e o cliente retorne ao depósito para finalização do
processo de garantia após o período de 30 dias, é possível desfazer a PERMUTA por meio
dessa opção. Onde retornamos com a bateria originalmente de empréstimo, e o cliente
retira sua bateria de volta, removendo-a da lista de empréstimo.

![Saída de dados](https://github.com/allessandrogomes/stockflow-manager/assets/112139213/17b52ddc-5ec8-4964-9e83-bb15189354a7)

## Baterias de empréstimo

Esse módulo, é responsável por fazer o gerenciamento das baterias de empréstimo. Antes
de iniciarmos as funcionalidades dessa interface, é preciso entender a ORIGEM das
baterias de empréstimo, que são:  

***SOS***: são baterias originalmente de empréstimo, ou seja, foram designadas pela equipe
técnica como bateria de empréstimo, sendo de propriedade do depósito.  

***PERMUTA***: baterias que ultrapassem 30 dias de atraso na assistência, é realizado o
processo de permuta, diante disso, define-se a sua origem.  

***REQUISIÇÃO***: são as baterias de uma requisição que ainda não foi FINALIZADA, ou seja, é
uma bateria de um consumidor final em que seu status do processo de garantia não foi
terminado.  

***ROTA***: em casos de exceção, pode ocorrer a necessidade de se emprestar uma bateria de
rota, que são aquelas recebidas pelo revendedor para realizar o processo de garantia.
Geralmente essas baterias somente são emprestadas em casos extremos, como por
exemplo, necessitar de uma bateria muito específica para uma determinado veículo.  

Dando início as funcionalidades, inicialmente temos um pequeno formulário para adição de
novas baterias de empréstimo(SOS), que conta também com todos os métodos de
validação, prevenção de erros e formatação dos dados. Além disso temos 3 tabelas com
suas respectivas funções, são elas:  

**Baterias disponíveis**  
Exibe as baterias de empréstimo disponíveis, auxiliando o usuário a identificar mais
rapidamente quais baterias liberadas para empréstimo.  

![image](https://github.com/allessandrogomes/stockflow-manager/assets/112139213/d87ffbcd-3f31-4087-aa53-6b946fdf75bb)

**Sugestão de baterias atrasadas para empréstimo**  
Nessa tabela, o sistema identifica as baterias que já estão com mais de 7 dias de atraso e
as sugere como empréstimo, visto que o atraso da mesma ocasiona na escassez de
baterias para empréstimo. É importante expressar que apenas requisições que têm baterias
de empréstimo serão sugeridas, ou seja, requisições que não tem baterias de empréstimo
nunca serão sugeridas para empréstimo. 

![image](https://github.com/allessandrogomes/stockflow-manager/assets/112139213/7d5542d0-51ce-4596-ae96-44991a159d32)


**Baterias emprestadas**  
Como o próprio título da tabela autodenomina, é o espaço que exibe as baterias
emprestadas, sejam elas de origem SOS, PERMUTA, REQUISIÇÃO ou ROTA.

![image](https://github.com/allessandrogomes/stockflow-manager/assets/112139213/419a1068-5ef7-4b71-8f85-f98d5093d09e)


## Retorno

Essa é uma das principais funcionalidades que visa solucionar um dos problemas vigentes
que deu o início da ideia e desenvolvimento do sistema, o retorno aos clientes. Antes do
sistema ser desenvolvido, esse procedimento de entrar em contato com o cliente era muito
custoso, pois ocupava muito tempo e não se tinha tantas informações do processo, que
agora é realizado quase majoritariamente automatizado pelo sistema.  

![image](https://github.com/allessandrogomes/stockflow-manager/assets/112139213/0286d6f5-0e5b-48b0-aa7a-1e6a862a8771)


Nessa funcionalidade, será exibido uma tabela com as requisições(clientes) atrasados para
finalização do processo de garantia. Nessa tabela temos diversas informações de cada
cliente, e vale destacar as 4 últimas, que fornecem um controle de informações que antes
não era possível e/ou trabalhoso, são elas:  

**Dias de atraso**  
Nesta coluna, temos a contagem da quantidade de dias de atraso do cliente, que é
atualizada diariamente pelo sistema.

**Número de retornos**  
Por meio dessa informação, podemos manter o controle de quantas vezes o cliente já foi
contatado para realizar a finalização do processo de garantia. Obviamente, o valor é
incrementado toda vez que contata-se o consumidor.  

**Último retorno**  
Basicamente o sistema atualiza a data do último retorno realizado sempre que contatá-lo.
Com essa informação, podemos evitar retornos excessivos, que por sua vez podem
ocasionar no descontentamento do cliente.  

**Contatar**  
E por fim, temos um botão do “WhatsApp” que ao ser clicado, direciona o usuário ao
WebWhatsApp já em conversa com o número do cliente, e também com uma mensagem
pré-definida de acordo com a situação atual do processo, necessitando apenas que o
usuário envie a mensagem. É importante explicitar que, para que esse processo funcione é
preciso que a máquina esteja com um WebWhatsApp conectado no navegador padrão, que
será o responsável por enviar a mensagem.

## Editar dados

Aqui, podemos editar dados tanto de “REQUISIÇÕES” quanto “BATERIAS DE
EMPRÉSTIMO”. É um processo extremamente simples, basta buscar pela requisição ou
bateria de empréstimo e fazer a edição de alguma informação ou exclusão do mesmo. É um
processo totalmente intuitivo e fácil de utilizar, com textos e notificações que direcionam e
auxiliam o usuário.

![Editar dados](https://github.com/allessandrogomes/stockflow-manager/assets/112139213/f17d192a-eb74-445f-bdc0-e98b6b0f4360)

# ⚖️ Licenciamento e Uso da Aplicação

Software: StockFlow Manager  
Licenciado para: Bonfim Baterias LTDA.  
Licenciador: Alessandro da Silva Gomes  
CNPJ: 16.392.367/0001-38  
Validade da Licença: Indeterminada  

**Descrição da Licença**  
O uso do software StockFlow Manager é exclusivamente autorizado para a empresa Bonfim
Baterias LTDA., sob o CNPJ fornecido. Esta licença é válida por tempo indeterminado, a
menos que seja revogada ou alterada pelo licenciador.  

**Distribuição da Chave de Licença**  
A chave de licença, essencial para a ativação e uso contínuo do software, será fornecida e
gerenciada exclusivamente por Alessandro da Silva Gomes, desenvolvedor do sistema.
Qualquer solicitação de nova chave ou renovação deve ser feita diretamente ao
desenvolvedor.  

**Restrições de Uso**  
O uso do software fora dos termos estabelecidos nesta licença, incluindo mas não se
limitando à reprodução, redistribuição ou uso em outra entidade que não a Bonfim Baterias
LTDA., é estritamente proibido e sujeito a medidas legais.  

**Consequências do Uso Não Autorizado**  
Qualquer uso não autorizado do software será considerado uma violação dos direitos de
propriedade intelectual e está sujeito a penalidades legais sob as leis aplicáveis de direitos
autorais e de propriedade intelectual.  

**Alterações na Licença**  
O licenciador reserva-se o direito de modificar os termos da licença a qualquer momento,
com aviso prévio à empresa licenciada, para refletir mudanças nas leis de licenciamento de
software ou na política de uso.

# 🤖 Tecnologias utilizadas

- React
- Electron
- Vite
- JavaScript
- Redux
- Formik
- Yup
- React Router
- uuid
- lodash
- FileSystem
- MUI
- AnyStack

# ✍️ Autor

| [<img loading="lazy" src="https://github.com/allessandrogomes.png" width=115><br><sub>Alessandro Gomes</sub>](https://github.com/allessandrogomes) |
| :---: |
