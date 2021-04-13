import Document, { Html, Head, Main, NextScript } from 'next/document';

// Este documento precisa seguir uma estrutura padrão
export default class MyDocument extends Document {

    render() {
        // Aqui retorna nosso "index.html" personalizado
        // Fizemos isso porque assim podemos deixar estático algumas informações que serão repetidas em todo o site
        // Não colocamos os link das fontes no _app porque ele reutilizar tudo que está nele porém recalcula o Head
        // Trazendo um processo a mais. Aqui, por contrário, vem pronto do server intermediário
        return (
            <Html>
                <Head>
                    <link rel="shortcut icon" href="favicon.png" type="image/png"/>

                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap" rel="stylesheet" />
                </Head>

                <body>
                    {/* Todas os conteúdos */}
                    <Main />
                    
                    {/* Scripts que o próprio next injeta por padrão */}
                    <NextScript />
                </body>
            </Html>
        );
    }
}