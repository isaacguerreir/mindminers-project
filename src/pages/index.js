import React from "react"
import { navigate } from "gatsby"
import Button from '@material-ui/core/Button';
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const goTo = (value) => {
  navigate(value)
}

const goToOperations = () => {
  goTo('/operations');
}

const goToAbout = () => {
  goTo('/about');
}

const IndexPage = () => (
  <>
    <div style={{
      backgroundColor: '#8c52ff',
      height: '100vh'
    }}>
      <SEO title="Home" />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}>
        <Image />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '3rem',
          width: '30%'
        }}>
          <Button style={{
            color: "white",
            border: '0.1rem solid',
          }}
          onClick={goToOperations}
          variant="outlined" size="large" color="secondary">Calculadora</Button>
          <Button style={{
            color: "white",
            border: '0.1rem solid',
          }}
          onClick={goToAbout}
          variant="outlined" size="large" color="secondary">Sobre</Button>
        </div>
      </div>  
    </div>
    
  </>
)

export default IndexPage
