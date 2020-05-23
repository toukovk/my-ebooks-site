import React, { useState } from "react"
import { graphql} from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

function filterBooks(books, search) {
  if (!search) {
    return books
  }
  const searchLowercase = search.trim().toLowerCase()
  const containsSearch = (s) => s && s.toLowerCase().indexOf(searchLowercase) !== -1
  return books.filter((book) => {
    return (
      containsSearch(book.title) ||
      containsSearch(book.author) ||
      containsSearch(book.publisher) ||
      containsSearch(book.year)
    )
  })
}

const Ebook = ebook => (
  <div className='book'>
    <div className='title-link'>
      <a href={ebook.link}>{ebook.title}</a>
    </div>
    {ebook.author} - {ebook.publisher} ({ebook.year})
  </div>
)

const IndexPage = ({ data }) => {
  const [ state, setState ] = useState({search: ''});
  const onKeyDown = function(event) {
    if (event.key === 'Enter') {
      setState({...state, search: event.target.value})
    }
  }
  const books = filterBooks(data.allEbooksCsv.edges.map(edge => edge.node), state.search)
  return (
    <Layout>
      <input className='search' type='text' onKeyDown={onKeyDown} placeholder='Text to sarch'/>
      <SEO title="My Ebooks" />
      {books.map((node) => (
        <Ebook {...node} key={node.id} />
      ))}
    </Layout>
  )
}

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
