## Gatsby site for ebook list

Small project made to

1. Try out Gatsby.js a bit in practise
2. Have a simple website with list of my ebooks bought in different services.

Based on [gatsby-starter-default](https://github.com/gatsbyjs/gatsby-starter-default).

## To run

```shell
# Use example data
$ cp sample-ebooks.csv data/ebooks.csv

# Get dependencies
$ npm install

# Start Gatsby dev server
$ gatsby develop
```

After that the site should be running at [http://localhost:8000]([http://localhost:8000]).

## To deploy to now.sh ([https://vercel.com/](https://vercel.com/))

```shell
# Install & login to now.sh (replace your-account@gmail.com with your now.sh/vercel account)
$ npm install -g now
$ now login your-account@gmail.com

# Publish
$ now --target production
```