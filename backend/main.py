import sys
sys.path.append('modules')

from bottle import route, template, get, post, request, response, redirect, app
import bottle

app = bottle.Bottle()

@app.get('/')
def homeGET():
    return "ohasdoifhsdiofhosdifhodisah"

# Test with:
# curl http://localhost:8080/patient -X PUT

@app.put('/patient')
def patientPUT():
    return {
        "id": 1,
        "age": 5,
        "ward": "B"
    }


app.run(server='gae')
