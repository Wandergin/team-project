#!/bin/bash
input="./Logs/PIDs.txt"
while IFS= read -r var
do
  kill "$var"
done < "$input"