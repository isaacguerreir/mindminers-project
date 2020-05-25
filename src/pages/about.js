import React from 'react';
import Layout from '../components/layout';


const About = () => (
   <Layout>
        <div style={{
            fontFamily: `Rubik`,
            fontSize: `2.5rem`,
            textAlign: `justify`,
            textJustify: `inter-word`,
            fontWeight: '700',
            marginTop: '3rem'
        }}>
            Sobre
       </div>
        <div style={{
            fontFamily: `Rubik`,
            fontSize: `1.1rem`,
            textAlign: `justify`,
            textJustify: `inter-word`,
            marginTop: '2rem'
        }}>
            A IRCalc é uma calculadora de Imposto de Renda sobre operações de compra e venda na Bolsa de Valores.
            Com ela é possível detalhes como a Taxa de Imposto de Renda, Total Líquido, Prejuízo Total e etc.
        </div>

        <div style={{
            fontFamily: `Rubik`,
            fontSize: `1.1rem`,
            textAlign: `justify`,
            textJustify: `inter-word`,
            marginTop: '2rem'
        }}>
            O projeto foi realizado pelo desenvolvedor de software Isaac Guerreiro. Qualquer dúvida
            entrar em <a href="mailto:isaacguerreirocom@gmail.com">contato</a>.
        </div>
   </Layout>
)

export default About;