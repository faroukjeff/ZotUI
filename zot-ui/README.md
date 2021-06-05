# Run React

To deploy the React app, first make sure that **Nodejs** is installed on the machine, the version used in the development process was **Nodejs v14.17.0**.

To install the dependencies, the command **“npm install”** should executed from the root of the project which is where the file **“package.json”** is located. This will create a node_modules folder within the project’s directory.

Then replace the codemirror’s lisp file**(”zot-ui\node_modules\codemirror\mode\commonlisp\commonlisp.js”)** with the one provided with the project to add the ZOT keywords to the syntax highlighting of the codemirror component.

**However, if we use the “node_modules” folder shipped with the source code, then there is no need to run the “npm install” command or to replace the codemirror component files as everything is ready.**

To start the server, execute the command **“npm start”** from the root of the project folder. 