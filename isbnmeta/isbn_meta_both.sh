#!/bin/bash

if (( $# != 1 ))
then
  echo "One parameters (ISBN) wanted"
  exit 1
fi
ISBN=$1

echo_output_and_exit_if_result_successful() {
    if (($RESULT == 0))
    then
        echo $OUTPUT
        exit 0
    fi
}

OUTPUT=$(isbn_meta $ISBN goob json 2>/dev/null)
RESULT=$?
echo_output_and_exit_if_result_successful

OUTPUT=$(isbn_meta $ISBN openl json 2>/dev/null)
RESULT=$?
echo_output_and_exit_if_result_successful

echo "No meta found for $ISBN"
exit 1

