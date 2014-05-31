import sys
sys.path.append('modules')

from bottle import route, template, get, post, request, response, redirect, app
import bottle
import json
from time import mktime
from datetime import datetime

from model import *

def succesful_response(data):
	return {
		"status": "ok",
		"response": data
	}

def fail_response(msg):
	if type(msg) not in (str, unicode):
		msg = unicode(msg)

	return {
		"status": "err",
		"error_message": msg
	}

app = bottle.Bottle()

# Test with:
# curl -X GET http://localhost:8080/questionnaire

def save_entity_from_request_json(entity_class, required=[], optional=[], from_url={}, enum_map={}):
	request_data = request.json

	entity = entity_class()

	for key, value in from_url.iteritems():
		setattr(entity, key, value)

	for key in required:
		if not key in request_data:
			raise Exception(key + ' is required in this request.')
		value = request_data[key]
		if key in enum_map:
			enum = enum_map[key]
			value = enum(getattr(enum, value))
		setattr(entity, key, value)

	for key in optional:
		if key in request_data:
			value = request_data[key]
			if key in enum_map:
				enum = enum_map[key]
				value = enum(getattr(enum, value))
			setattr(entity, key, value)

	# Save
	key = entity.put()
	entity = entity.to_dict()
	entity['id'] = key.integer_id()

	for key, value in entity.iteritems():
		if key in enum_map:
			entity[key] = value.number
		if type(value) is datetime:
			entity[key] = int((mktime(value.timetuple()) + value.microsecond/1000000.0) * 1000.0)

	return entity

@app.put('/patient')
def patientPUT():
	try:
		return succesful_response(save_entity_from_request_json(
			Patient,
			required=[],
			optional=['age', 'ward', 'hospital']
		))
	except:
		return fail_response("Error creating patient")

@app.get('/questionnaires')
def questionnairesGET():
	return succesful_response([
		{
			"id": 1,
			"name": "Some questionnaire.",
		},
		{
			"id": 2,
			"name": "Some questionnaire.",
		},
	])

@app.get('/questionnaire/<questionnaire_id>')
def questionnaireGET(questionnaire_id):
	questionnaire_id = int(questionnaire_id)
	return succesful_response ({
		"id": questionnaire_id,
		"name": "Some questionnaire.",
		"sections": [
			{
				"name": "Section 1",	
				"questions": [
					{
						"id": 1,
						"type": "FREE_TEXT",
						"question": "How do you feel",
						"hint_text": "Not great."
					}
				]
			},
		]
	})

@app.put('/question/<question_id>/answer')	
def answerPUT(question_id):
	try:
		return succesful_response(save_entity_from_request_json(
			Answer,
			required = ['patient_id', 'answer_type'],
			optional = ['selection', 'drawing'],
			enum_map = {'answer_type': AnswerType},
			from_url = {
				'question_id': int(question_id)
			}
		))
	except Exception as e:
		return fail_response(e)

@app.get('/question/<question_id>/answers')
def answersGET(question_id):
	question_id = int(question_id)
	return succesful_response ({
		"question": {
			#Question object
		},
		"answers": [
			{
				"id": 1223435,
				"patient_id": 1,
				"question_id": question_id,
				"answered_time_millis": 123456779,
				"answer_type": 	"SELECTION",
				"selection": "Foo"
			}
		]
	})
	
@app.put('/questionnaire')
def questionnairePUT():
	return succesful_response ({
		"id": 1,
		"label": "Hai",
	})

@app.put('/questionnaire/<questionnaire_id>/section')
def sectionPUT(questionnaire_id):
	questionnaire_id = int(questionnaire_id)
	return succesful_response({
		"id": 1,
		"questionnaire_id": questionnaire_id,
		"label": "some section"
	})

@app.put('/questionnaire/<questionnaire_id>/section/<section_id>/question')
def questionPUT(questionnaire_id, section_id):
	questionnaire_id = int(questionnaire_id)
	section_id = int(section_id)
	return succesful_response ({
		"id": 1,
		"questionnaire_id": questionnaire_id,
		"section_id": section_id,
		"question_type": "CHOICE",
		"question": "How do you feel?",
		"hint_text": "Tell me plox.",
		"choices": [
			"Meh",
			"Fine"
		]
	})
	

app.run(server='gae')
