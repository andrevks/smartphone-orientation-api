
from flask import Flask, jsonify, request, json
from flask_cors import CORS, cross_origin

from werkzeug.wrappers import response
app = Flask(__name__)
cors = CORS(app, resources={r"*": {'origins':'*'}})
# cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
@app.route('/home')
def home():
  return 'Accelerometer FLASK API'

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
@cross_origin()
def create_accmeter():
  try:
    content = request.get_json()
    # title = request.json['title']
    title = content['title']
    print(title)
    # body = request.json['body']
    x = content['x']
    y = content['y']
    z = content['z']
    # # body = content['body']
    # print(body)
    new_accmeter = { 
      'title':title,
      'x': x,
      'y': y,
      'z': z
        }
    with open('ACC_VALUES.json','w') as f:
      json.dump(new_accmeter, f)

    response= json.dumps(new_accmeter)
    print(f'RESPONSE: {response}')

    return response

  except Exception:
    print('Error in saving file')
    return None

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add("Access-Control-Allow-Credentials", True)# Required for cookies, authorization headers with HTTPS
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization, Origin, Locale')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

if __name__ == '__main__':
  try:
    with open('ACC_VALUES.json','w') as f:
      empty_state = {'body':'No accmeter values'}
      json.dump(empty_state, f)
  except Exception:
    print('Error in saving file')

  app.run(host='0.0.0.0', port=5050, debug=True)

