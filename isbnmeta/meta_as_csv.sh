#!/bin/bash

if (( $# != 1 ))
then
  echo "One parameters (ISBN + optional service) wanted"
  exit 1
fi

ISBN=$1

# Here be dragons, close your eyes
/isbn_meta_both.sh $ISBN | jq -s . | jq '.[] | {year,type,title,"author": .author[0]["name"],publisher,"isbn":.identifier[0]["id"]}' | jq -s . | jq -r '.[] | [.isbn, .title, .author, .publisher, .year] | @csv'

