from google.appengine.ext import ndb
from google.appengine.ext.ndb import msgprop
from protorpc import messages

class QuestionType(messages.Enum):
	TEXT = 1
	DRAWING = 2
	CHOICE = 3

class AnswerType(messages.Enum):
	TEXT = 1
	DRAWING = 2

class Questionnaire(ndb.Model):
	name = ndb.StringProperty(required=True)
	section_ids = ndb.IntegerProperty(indexed=True, repeated=True)

class QuestionSection(ndb.Model):
	questionnaire_id = ndb.IntegerProperty(required=True, indexed=True)
	label = ndb.StringProperty(required=True)
	question_ids = ndb.IntegerProperty(indexed=True, repeated=True)

class Question(ndb.Model):
	questionnaire_id = ndb.IntegerProperty(indexed=True, required=True)
	section_id = ndb.IntegerProperty(indexed=True, required=True)
	question_type = msgprop.EnumProperty(QuestionType, required=True)
	question = ndb.StringProperty(required=True)
	choices = ndb.StringProperty(required=False, repeated=True)
	hint_text = ndb.StringProperty(required=False)

class Patient(ndb.Model):
	age = ndb.IntegerProperty(indexed=True, required=False)
	ward = ndb.StringProperty(required=False)
	hospital = ndb.StringProperty(required=False)

class Answer(ndb.Model):
	patient_id = ndb.IntegerProperty(indexed=True, required=True)
	question_id = ndb.IntegerProperty(indexed=True, required=True)
	answered = ndb.DateTimeProperty(auto_now_add=True, required=True)
	answer_type = msgprop.EnumProperty(AnswerType, required=True)
	selection = ndb.StringProperty(required=False)
	drawing = ndb.BlobProperty(required=False)
