Scripts for getting metadata in CSV format based on ISBN number using https://github.com/xlcnd/isbntools

```shell
# To build the Docker image
docker build . -t isbntools

# To run the script
docker run -t --rm isbntools 9780596003302
```