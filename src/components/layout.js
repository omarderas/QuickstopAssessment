import * as React from "react"
import PropTypes from "prop-types"



import { useStaticQuery, graphql } from "gatsby"




const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQueryAll {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
        <div className="App">
       
            <div className="content">
                <div>
                  
                    <main>{children}</main>
                </div>
            </div>
           
            
        </div>
    </>
);
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
