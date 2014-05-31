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

def save_entity_from_request_json(entity_class, required=[], optional=[], repeated=[], from_url={}, enum_map={}):
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

	for key in repeated:
		if key in request_data:
			values = request_data[key]
			entity_values = []
			for value in values:
				if key in enum_map:
					enum = enum_map[key]
					value = enum(getattr(enum, value))
				entity_values.append(value)
			setattr(entity, key, entity_values)

	# Save
	key = entity.put()
	return entity_to_dict(entity, key, enum_map=enum_map)

def entity_to_dict(entity, key=None, enum_map={}):
	if key is None:
		key = entity.key

	entity = entity.to_dict()
	entity['id'] = key.integer_id()
	for key, value in entity.iteritems():
		if key in enum_map:
			entity[key] = value.name
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
	return succesful_response(map(entity_to_dict, Questionnaire.query().fetch()))

@app.get('/questionnaire/<questionnaire_id>')
def questionnaireGET(questionnaire_id):
	questionnaire_id = int(questionnaire_id)

	key = ndb.Key(Questionnaire, questionnaire_id)
	questionnaire = key.get()
	if questionnaire is None:
		return fail_response('Questionnaire not found.')

	sections = QuestionSection.query(QuestionSection.questionnaire_id == questionnaire.key.integer_id()).fetch()

	questionnaire = entity_to_dict(questionnaire)
	questionnaire['sections'] = map(entity_to_dict, sections)

	return succesful_response(questionnaire)

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
	try:
		return succesful_response(save_entity_from_request_json(
			Questionnaire,
			required = ['name']
		))
	except Exception as e:
		return fail_response(e)

@app.put('/questionnaire/<questionnaire_id>/section')
def sectionPUT(questionnaire_id):
	try:
		return succesful_response(save_entity_from_request_json(
			QuestionSection,
			required = ['label'],
			from_url = {
				'questionnaire_id': int(questionnaire_id)
			}
		))
	except Exception as e:
		return fail_response(e)

@app.put('/questionnaire/<questionnaire_id>/section/<section_id>/question')
def questionPUT(questionnaire_id, section_id):
	try:
		return succesful_response(save_entity_from_request_json(
			Question,
			required = ['question', 'question_type'],
			repeated = ['choices'],
			optional = ['hint_text'],
			from_url = {
				'questionnaire_id': int(questionnaire_id),
				'section_id': int(section_id)
			},
			enum_map = {
				'question_type': QuestionType
			}
		))
	except Exception as e:
		return fail_response(e)

app.run(server='gae')

# Questionnaire: 4644337115725824
# Section: 5770237022568448
