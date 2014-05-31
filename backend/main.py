import sys
sys.path.append('modules')

from bottle import route, template, get, post, request, response, redirect, app
import bottle

import model

def succesful_response(data):
	return {
		"status": "ok",
		"response": data
	}

def fail_response(msg):
	return {
		"status": "err",
		"error_message": msg
	}

app = bottle.Bottle()

# Test with:
# curl -X GET http://localhost:8080/questionnaires

@app.put('/patient')
def patientPUT():
    return succesful_response({
        "id": 1,
        "age": 5,
        "ward": "B"
    })

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
	question_id = int(question_id)
	return succesful_response ({
		"id": 11230213,
		"patient_id": 1,
		"question_id": question_id,
		"answered_time_millis": 123456779,
		"answer_type": 	"SELECTION",
		"selection": "Foo"
	})

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
