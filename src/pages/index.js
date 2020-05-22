import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
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
    <SEO title="Ebooks" />
    <h1>Ebooks</h1>
    {data.allEbooksCsv.edges.map(( {node} ) => (
      <Ebook {...node} />
    ))}
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
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
