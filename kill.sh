#!/bin/bash
input="./logs/PIDs.txt"
while IFS= read -r var
do
  kill "$var"
done < "$input"