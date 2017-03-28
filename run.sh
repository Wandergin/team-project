nohup python ./new/flask_server.py > "Logs/frontEndLog.txt" &
nohup python FrontEnd/ResdiaryStyle/server.py > "Logs/backEndLog.txt" &

echo "Usage: localhost:8082/FrontEnd/ResdiaryStyle"
pgrep -f Python | awk '{print "PID: " $1}'