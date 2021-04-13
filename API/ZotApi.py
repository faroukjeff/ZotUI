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
trusted_ips = ["192.168.1.10","192.168.1.56","127.0.0.1"]

#API TEST Function
@app.route('/lispAPI/', methods=['GET', 'POST'])
@cross_origin()
def welcome():
    name = request.args['name']
    return "<h1>Hi {}, <br> This is a Zot API</h1>".format(name)

#Executes the zot commands by invoking a sbcl subprocess
@app.route('/listhellow/', methods=['GET', 'POST'])
@cross_origin() #Using CROSS for Security, to allow exchange of external ressouces safely
def runhellowlist():
    json_req = request.get_json() #GET zot code from app
    banned_keys = ["uiop:",":getenv","run-program","call-system","sys:","excl:","sb-ext:"]#banned plugins and functions due to security
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

@app.before_request #runs before request is processed and if the ip address of the request is not trusted then the access is forbidden
def internal_ip_firewall():
    if request.remote_addr not in trusted_ips:
        abort(403)  # Returns 403 Forbidden HTTP Request Response

if __name__ == '__main__':
    app.run(host='0.0.0.0')