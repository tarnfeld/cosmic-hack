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
	# id = ndb.IntegerProperty(indexed=True)
	name = ndb.StringProperty(required=True)
	section_id = ndb.IntegerProperty(indexed=True, repeated=True)

class QuestionSection(ndb.Model):
	# id = ndb.IntegerProperty(indexed=True)
	questionnaire_id = ndb.IntegerProperty(indexed=True)
	label = ndb.StringProperty(required=True)
	question_id = ndb.IntegerProperty(indexed=True, repeated=True)

class Question(ndb.Model):
	# id = ndb.IntegerProperty(indexed=True)
	questionnaire_id = ndb.IntegerProperty(indexed=True)
	section_id = ndb.IntegerProperty(indexed=True)
	question_type = msgprop.EnumProperty(QuestionType)
	question = ndb.StringProperty(required=True)
	choice = ndb.StringProperty(required=False, repeated=True)
	hint_text = ndb.StringProperty(required=False)

class Patient(ndb.Model):
	# id = ndb.IntegerProperty(indexed=True)
	age = ndb.IntegerProperty(indexed=True, required=False)
	ward = ndb.StringProperty(required=False)

class Answer(ndb.Model):
	# id = ndb.IntegerProperty(indexed=True)
	patient_id = ndb.IntegerProperty(indexed=True)
	question_id = ndb.IntegerProperty(indexed=True)
	answered = ndb.DateTimeProperty(auto_now_add=True)
	answer_type = msgprop.EnumProperty(AnswerType)
	selection = ndb.StringProperty(required=False)
	drawing = ndb.BlobProperty(required=False)
