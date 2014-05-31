import sys
sys.path.append('lib')

from bottle import route, template, get, post, request, response, redirect, app
import bottle

app = bottle.Bottle()

@app.get('/')
def homeGET():
    return "ohai"

app.run(server='gae')
