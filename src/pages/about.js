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
            O IRCalc é uma calculadora de imposto de renda sobre operações de compra e venda na bolsa de valores.
            Com ele é possível saber divido por papel na bolsa de valores e mensalmente detalhes como a Taxa de Imposto de Renda, Total Líquido, Prejuízo Acumulado e etc.
        </div>

        <div style={{
            fontFamily: `Rubik`,
            fontSize: `1.1rem`,
            textAlign: `justify`,
            textJustify: `inter-word`,
            marginTop: '2rem'
        }}>
            O projeto foi realizado em cinco dias pelo desenvolvedor de software Isaac Guerreiro. Quaisquer dúvidas só entrar
             em <a href="mailto:isaacguerreirocom@gmail.com">contato</a>.
        </div>
   </Layout>
)

export default About;