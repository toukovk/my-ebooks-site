FROM ubuntu:14.04

# Install dependencies
RUN apt-get update && apt-get install -y \
    python-pip \
    jq \
  && rm -rf /var/lib/apt/lists/*

#RUN pip install --upgrade pip && \
#    pip install --no-cache-dir isbntools
# RUN pip install --help
RUN pip install isbntools

COPY isbn_meta_both.sh /isbn_meta_both.sh
COPY meta_as_csv.sh /meta_as_csv.sh
RUN chmod 700 /*.sh

ENTRYPOINT ["/meta_as_csv.sh"]