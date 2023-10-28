import React, { useState } from "react"
import { graphql} from "gatsby"

import Layout from "../components/layout"

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

function clean(s) {
  return s ? s.toLowerCase() : ''
}

const sortGetters = {
  'title': (book) => clean(book.title),
  'author': (book) => clean(book.author),
  'publisher': (book) => clean(book.publisher),
  'year': (book) => parseInt(book.year),
}

function sortBooks(books, sort) {
  if (!sort) {
    console.log('Unexpected situation: sort parameter missing', sort)
    return books
  }
  let getter
  let factor
  if (sort.endsWith('-asc')) {
    factor = 1
    getter = sortGetters[sort.substring(0, sort.length - 4)]
  } else if(sort.endsWith('-desc')) {
    factor = -1
    getter = sortGetters[sort.substring(0, sort.length - 5)]
  } else {
    console.log('Unexpected sort:', sort)
    return books
  }
  if (!getter || !factor) {
    console.log('Unexpected situation: Missing getter/factor:', getter, factor)
    return books
  }
  function compare(book1, book2) {
    const value1 = getter(book1)
    const value2 = getter(book2)
    if (value1 > value2) {
      return factor
    } else if (value1 < value2) {
      return -factor
    } else {
      return 0
    }
  }
  return books.concat().sort(compare)
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
  const [ state, setState ] = useState({search: '', sort: 'title-asc'});
  const onKeyDown = function(event) {
    if (event.key === 'Enter') {
      setState({...state, search: event.target.value})
    }
  }
  const books = filterBooks(data.allEbooksCsv.edges.map(edge => edge.node), state.search)
  const sortedBooks = sortBooks(books, state.sort)
  return (
    <Layout>
      <input className='search' type='text' onKeyDown={onKeyDown} placeholder='Text to sarch'/>
      <div className='sort'>
        <span>Sort by:</span>
        <select value={state.sort} onChange={(event) => setState({...state, sort: event.target.value})}>
        <option value="title-asc">Title (asc.)</option>
          <option value="title-desc">Title (desc.)</option>
          <option value="author-asc">Author (asc.)</option>
          <option value="author-desc">Author (desc.)</option>
          <option value="publisher-asc">Publisher (asc.)</option>
          <option value="publisher-desc">Publisher (desc.)</option>
          <option value="year-asc">Year (asc.)</option>
          <option value="year-desc">Year (desc.)</option>
        </select>
        <span className="book-count">({sortedBooks.length})</span>
      </div>
      {sortedBooks.map((node) => (
        <Ebook {...node} key={node.id} />
      ))}
    </Layout>
  )
}

export const query = graphqll`
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

export const Head = () => <title>📚 My Ebooks 📚</title>
