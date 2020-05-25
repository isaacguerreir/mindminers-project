/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div style={styles.box}>
        <main style={styles.main}>{children}</main>
        <footer style={styles.footer}>
          © {new Date().getFullYear()}, Isaac Guerreiro
        </footer>
      </div>
    </>
  )
}

const styles = {
  box: {
    position: 'relative',
    minHeight: '80vh',
    margin: `0 auto`,
    maxWidth: 960,
    padding: `0 1.0875rem 1.45rem`,
  },
  main: {
    marginBottom: '3rem'
  },
  footer: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    height: '2.5rem'   
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
