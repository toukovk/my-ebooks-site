import React from "react"
import { graphql} from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Ebook = ebook => (
  <div style={{width: '100%', display: `inline-block`, margin: `0 1rem 1rem 0` }}>
    <div style={{display: 'block', width: '100%'}}>
      <a href={ebook.link} style={{fontSize: '1.2rem'}}>
      {ebook.title}
      </a>
      <span className='date'> ({ebook.author}, {ebook.year})</span>
    </div>
    <span className='media'>{ebook.publisher}</span>
  </div>
)
const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="My Ebooks" />
    {data.allEbooksCsv.edges.map(( {node} ) => (
      <Ebook {...node} />
    ))}
  </Layout>
)

export const query = graphql`
  query {
    allEbooksCsv {
      edges {
        node {
          id
          title
          author
          publisher
          year
          isbn
          link
        }
      }
    }
  }
`

export default IndexPage
