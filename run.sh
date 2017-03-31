nohup python ./BackEndNew/flask_server.py > "logs/frontEndLog.txt" &
nohup python FrontEnd/ResdiaryStyle/server.py > "logs/backEndLog.txt" &

echo "Usage: localhost:8082/FrontEnd/ResdiaryStyle"
pgrep -f Python | awk '{print $1}' > "logs/PIDs.txt"