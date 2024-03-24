const app = Vue.createApp({
    data() {
        return {
            display: '0',  // Armazena o valor exibido na calculadora
            operacao: null,  // Armazena a operação a ser realizada (+, -, *, /)
            valorAnterior: null,  // Armazena o valor anterior inserido na calculadora
            aguardandoProximoNumero: false  // Indica se a calculadora está aguardando o próximo número após uma operação
        };
    },
    methods: {
        limpar() {
            // Limpa todos os valores 
            this.display = '0';
            this.operacao = null;
            this.valorAnterior = null;
            this.aguardandoProximoNumero = false;
        },
        apagar() {
            // Remove o último dígito do número exibido
            if (this.display.length == 1) {
                this.display = '0';
            } else {
                this.display = this.display.slice(0, -1);
            }
        },
        adicionarNumero(numero) {
            // Adiciona um número ao visor da calculadora
            if (this.aguardandoProximoNumero) {
                this.display = numero.toString();
                this.aguardandoProximoNumero = false;
            } else {
                this.display = this.display === '0' ? numero.toString() : this.display + numero;
            }
        },
        definirDecimal() {
            // Adiciona um ponto decimal ao número exibido, se ainda não houver um
            if (this.aguardandoProximoNumero) return;
            if (!this.display.includes('.')) {
                this.display += '.';
            }
        },
        definirOperacao(operacao) {
            // Define a operação a ser realizada
            if (this.operacao !== null) {
                this.calcular();  // Calcula o resultado se tivrt uma operação pendente
            }
            this.valorAnterior = parseFloat(this.display);  // Armazena o valor atual para cálculos futuros
            this.operacao = operacao;
            this.aguardandoProximoNumero = true;
        },
        calcular() {

            // Realiza o cálculo com base na operação selecionada
            const valorAtual = parseFloat(this.display);
            if (isNaN(valorAtual)) return;  // Verifica se o valor atual é um número válido

            let resultado;
            switch (this.operacao) {
                case '+':
                    resultado = this.valorAnterior + valorAtual;
                    break;
                case '-':
                    resultado = this.valorAnterior - valorAtual;
                    break;
                case '%':
                    resultado = (this.valorAnterior / 100) * valorAtual;
                    break;
                case '*':
                    resultado = this.valorAnterior * valorAtual;
                    break;
                case '/':
                    if (valorAtual === 0) {
                        this.display = 'Erro';
                        return;
                    } else {
                        resultado = this.valorAnterior / valorAtual;
                    }
                    break;
                default:
                    return;
            }

            this.display = resultado.toString();  // Exibe o resultado no visor da calculadora
            this.operacao = null;
            this.aguardandoProximoNumero = true;
        }
    }
});

app.mount('#app');
