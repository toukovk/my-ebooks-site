import React from "react"
import { graphql} from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Ebook = ebook => (
  <div className='book'>
    <div className='title-link'>
      <a href={ebook.link}>{ebook.title}</a>
    </div>
    {ebook.author} - {ebook.publisher} ({ebook.year})
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
