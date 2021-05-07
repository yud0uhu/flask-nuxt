from flask import Flask, jsonify
from flask_cors import CORS


# configuration
DEBUG = True

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)
app.config['JSON_AS_ASCII'] = False 

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})


# sanity check route
@app.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong!')

tasks = {
    '1': 'スーパーで買い物をする',
    '2': 'Netflixを見る'
}

@app.route('/tasks', methods=['GET'])
def list_all_tasks():
    json = {
        'message': tasks
    }
    return jsonify(json)

if __name__ == '__main__':
    app.run()
