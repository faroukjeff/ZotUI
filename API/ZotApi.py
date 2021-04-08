import flask
from flask import flash, redirect, url_for
from flask import request, jsonify
from flask import send_from_directory
from flask_cors import CORS, cross_origin
import subprocess
from subprocess import Popen, PIPE


app = flask.Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#API TEST Function
@app.route('/lispAPI/', methods=['GET', 'POST'])
def welcome():
    name = request.args['name']
    return "<h1>Hi {}, <br> This is a Zot API</h1>".format(name)

#Executes the zot commands by invoking a sbcl subprocess
@app.route('/listhellow/', methods=['GET', 'POST'])
@cross_origin() #Using CROSS for Security, will add root origin when in prod
def runhellowlist():
    json_req = request.get_json() #GET zot code from app
    banned_keys = ["uiop:",":getenv","run-program"]#banned operations
    cmd_zot = json_req["cmd"]
    security_flag=0
    banned_op = ""
    for word in banned_keys:
        if word in cmd_zot:
            security_flag = 1
            word_val = [character for character in word if character.isalnum()]
            word_val = "".join(word_val)
            banned_op = word_val.upper()
            break
    
    if security_flag == 0:
        proc = subprocess.Popen(['sbcl', '--disable-debugger','--load', '/usr/local/zot/bin/start.lisp'], stdin=PIPE, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)

        for line in cmd_zot.split("\n"):
            if line != "":
                if line[0] != ";":
                    proc.stdin.write(line.encode())

        proc.stdin.write(b'(quit)')

        stdout,stderr = proc.communicate()
        output_string = str(stdout.decode()).strip()[0:-1].strip()#.replace("\n","<br>")
        output_string = clean_output(output_string)

    else:
        output_string = "Code Contains Banned Operation: " + banned_op + "\nAccess to shell is banned!"

    response = jsonify(output=output_string)
    return response
    #return "<h5>{}</h5>".format(clean_output(output_string))

def clean_output(output):
    find_key = '* This is '
    start = output.find(find_key)
    ret_output = ""
    if start != -1:
        ret_output = output[start:].strip()
    else:
        find_key = 'See the CREDITS and COPYING files in the\ndistribution for more information.'
        start = output.find(find_key) + len(find_key)
        ret_output = output[start:].strip()
    
    if "Backtrace for: #" in ret_output:
        end = ret_output.find("Backtrace for: #")
        ret_output = ret_output[:end]

    return ret_output

if __name__ == '__main__':
    app.run(host='0.0.0.0')