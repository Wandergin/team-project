nohup python ./BackEndOld/flask_server.py > "logs/frontEndLogOld.txt" &
nohup python FrontEnd/TokenizedQuery/server.py > "logs/backEndLogOld.txt" &

echo "Usage: localhost:8082/FrontEnd/ResdiaryStyle"
pgrep -f Python | awk '{print $1}' > "logs/PIDs.txt"