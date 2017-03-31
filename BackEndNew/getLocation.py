from geoip import geolite2

def getLocation(request):
	#Gets the ip address of the request
	ip = request.environ['REMOTE_ADDR']
	#ip = request.remote_addr 

	#Matches IP address to location
	match = geolite2.lookup(ip)
	
	if match == None:
		return None

	#Returns (long,lat) of location
	return match.location
