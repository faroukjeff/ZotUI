import flask
from flask import flash, redirect, url_for
from flask import request, jsonify,abort
from flask import send_from_directory
from flask_cors import CORS, cross_origin
import subprocess
from subprocess import Popen, PIPE


app = flask.Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#Executes the zot commands by invoking a sbcl subprocess
@app.route('/execzot/', methods=['GET', 'POST'])
@cross_origin() #Using CROSS for Security, to allow exchange of external ressouces safely
def execzot():
    json_req = request.get_json() #GET zot code from app
    cmd_zot = json_req["cmd"]
    security_flag,banned_op=check_banned(cmd_zot)
    if security_flag == 0:
        #by using subprocess the shell is never called and no process other than sbcl can be executed
        proc = subprocess.Popen(['sbcl', '--disable-debugger','--load', '/usr/local/zot/bin/start.lisp'], stdin=PIPE, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)

        for line in cmd_zot.split("\n"):
            if line != "":
                if line[0] != ";":
                    proc.stdin.write(line.encode())

        proc.stdin.write(b'(quit)')
        stdout,stderr = proc.communicate()
        try:
            output_string = str(stdout.decode()).strip()[0:-1].strip()
            output_string = clean_output(output_string)
        except:
            print(stderr)
            output_string = "ZOT ERROR#ERRSTD" #specific code error for stin/out exception

    else:
        output_string = "Code Contains Banned Operation: " + banned_op + "\nAccess to shell is banned!"

    response = jsonify(output=output_string)
    return response

def check_banned(cmd_zot):
    banned_keys = ["uiop:",":getenv","run-program","call-system","sys:","excl:","sb-ext:"]#banned plugins and functions due to security
    for word in banned_keys:
        if word in cmd_zot:
            word_val = [character for character in word if character.isalnum()]
            word_val = "".join(word_val)
            banned_op = word_val.upper()
            return 1,banned_op
    return 0,""

def clean_output(output): #Removing unecessary text from returned output
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