# ZotUI
 
# Deploy the API

To deploy the API, the first step is to **install ZOT** and make sure that it runs perfectly by trying this command in the terminal: **“sbcl --disable-debugger –load /usr/local/zot/bin/start.lisp”**.

**To install Zot, please refer to the Zot documentation linked the bibliography below.**

After Zot is ready and running, the machine should have Python installed. More specifically, the Python version where Zot was developed using **Python 3.9.2** but anything greater than Python 3.7 should be working fine. The Python dependencies to be installed are:**
•	Requests, install by running “pip install requests” in the terminal.
•	Flask, install by running “pip install Flask” in the terminal.
•	CORS for Flask, install by running “pip install Flask-Cors”**
**To start the API just run the script “ZotAPI.py”.**

 
# Deploy React

To deploy the React app, first make sure that **Nodejs** is installed on the machine, the version used in the development process was **Nodejs v14.17.0**.

To install the dependencies, the command **“npm install”** should executed from the root of the project which is where the file **“package.json”** is located. This will create a node_modules folder within the project’s directory.

Then replace the codemirror’s lisp file**(”zot-ui\node_modules\codemirror\mode\commonlisp\commonlisp.js”)** with the one provided with the project to add the ZOT keywords to the syntax highlighting of the codemirror component.

**However, if we use the “node_modules” folder shipped with the source code, then there is no need to run the “npm install” command or to replace the codemirror component files as everything is ready.**

To start the server, execute the command **“npm start”** from the root of the project folder. 