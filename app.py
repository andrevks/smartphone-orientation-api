
from flask import Flask, jsonify, request
import json
app = Flask(__name__)
    


@app.route('/')
@app.route('/home')
def home():
  return 'Home Page'

@app.route('/accmeters', methods=['GET'])
def get_accmeter():
  acc_values = {} 
  try: 
   with open('ACC_VALUES.json','r') as f:
      acc_values = json.load(f)
      print(acc_values)
  except Exception:
    print('Error in reading file')
  except TypeError:
    acc_values = {
      'title':'NO accelerometer values',
      'body':{'x':None, 'y':None, 'z':None}
    }
  finally:
      return jsonify(acc_values)


@app.route('/accmeters', methods=['POST'])
def create_accmeter():
  content = request.get_json()
  # title = request.json['title']
  title = content['title']
  print(title)
  # body = request.json['body']
  body = content['body']
  print(body)
  new_accmeter = { 'title':title, 'body':body }
  try:
    with open('ACC_VALUES.json','w') as f:
      json.dump(new_accmeter, f)

  except Exception:
    print('Error in saving file')
  finally:
      return jsonify(new_accmeter)

if __name__ == '__main__':
  try:
    with open('ACC_VALUES.json','w') as f:
      empty_state = {'body':'No accmeter values'}
      json.dump(empty_state, f)
  except Exception:
    print('Error in saving file')

  app.run(host='0.0.0.0', port=5050)