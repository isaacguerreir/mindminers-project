import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>Não Encontrado!</h1>
    <p>Você escolheu uma rota que não existe... que triste D:</p>
  </Layout>
)

export default NotFoundPage
