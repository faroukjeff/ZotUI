import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import './App.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/eclipse.css';
require('codemirror/mode/commonlisp/commonlisp');
require('codemirror/mode/xml/xml');


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#34a0a4',
    },
    secondary: {
      main: '#457eac',
    },
  },
});

const stylesDialog = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    color: "#FFFFFF",
    backgroundColor:"#34a0a4",
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color:"#FFFFFF",
  },
});


const DialogTitle = withStyles(stylesDialog)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    color : "#cfd8dc",
    backgroundColor : "#263238"
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    backgroundColor : "#34a0a4"
  },
}))(MuiDialogActions);

const buttonrun = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      color:"white",
      background: "#40916c"
    },
  },
}));

const buttonin = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      color:"white",
      background: "#34a0a4"
    },
  },
}));

const buttonout = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      color:"white",
      background: "#168aad"
    },
  },
}));

const buttondoc = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      color:"white",
      background: "#1a759f"
    },
  },

}));

const buttonpin = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      color:"white",
      background: "#1e6091"
    },
  },

}));

const buttonshort = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      color:"white",
      background: "#184e77"
    },
  },

}));

const buttondom = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      color:"white",
    },
  },
}));

const useStyles = makeStyles({
  list: {
    width: 100,
  },
  fullList: {
    width: 'auto',
  },
});

const useStylesalert = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {

  const classesalert = useStylesalert();
  const [warnopen, setOpenwarn] = React.useState(false);
  const [erroropen, setOpenerror] = React.useState(false);
  const [successopen, setOpensuccess] = React.useState(false);

  const handleClosewarn = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenwarn(false);
  };

  const handleCloseerror = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenerror(false);
  };

  const handleClosesuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpensuccess(false);
  };

  const classesm = useStyles();
  const [state, setState] = React.useState({
    top: false,
    bottom:false
  });

const toggleDrawer = (anchor, open) => (event) => {
  if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    return;
  }

  setState({ ...state, [anchor]: open });

  };

  const list = (anchor) => (
    <div
      className={clsx(classesm.list, {[classesm.fullList]:anchor === 'bottom',})}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      
      <Box display="flex" flexDirection="row" p={0} m={0} bgcolor="#a4b3b6">
            <Box p={1} >
              <div className={classesr.root}>
              <Button
                id="runbutton"
                variant="contained" 
                size='medium'
                color="secondary"
                onClick={() => sendApiRequest()} 
                endIcon={<Icon>play_circle</Icon>}
                >
                Run
                </Button>
              </div>
            </Box>
            <Box p={1} >
              <div className={classesi.root}>
              <Button 
                variant="contained" 
                size='medium' 
                color="primary" 
                onClick={() => downloadTxtFile("input")} 
                endIcon={<Icon>file_download</Icon>}
                >
                Download Code
                </Button>
              </div>
            </Box>

            <Box p={1} >
              <div className={classeso.root}>
              <Button
                variant="contained" 
                size='medium' 
                color="primary" 
                onClick={() => downloadTxtFile("output")} 
                endIcon={<Icon>send_and_archive</Icon>}
                >
                Download output
                </Button>
              </div>
            </Box>

            <Box p={1} >
              <div className={classesd.root}>
              <Button 
                variant="contained" 
                size= 'medium' 
                color="primary"
                endIcon={<Icon>{darkmodebuttonicon}</Icon>}
                onClick={() => toggledarkmode()}
                >
                {darkmodebutton}
                </Button>
              </div>
            </Box>

            <Box p={1} >
              <div className={classesp.root}>
              <Button
                id="pinbutton"
                variant="contained" 
                size='medium' 
                color="primary" 
                onClick={() => togglehidemenu()} 
                endIcon={<Icon>push_pin</Icon>}
                >
                {pinbutton_title}
                </Button>
              </div>
            </Box>

            <Box p={1} >
              <div className={classesshort.root}>
              <Button
                variant="contained" 
                size='medium' 
                color="primary" 
                onClick={() => handleClickOpenDialog()} 
                endIcon={<Icon>shortcut</Icon>}
                >
                keyboard Shortcuts
                </Button>
              </div>
            </Box>

            </Box>
          <div>
          </div>

    </div>
  );

  const classesr = buttonrun();
  const classesi = buttonin();
  const classeso = buttonout();
  const classesd = buttondoc();
  const classesp = buttonpin();
  const classesdrawer = buttondom();
  const classesshort = buttonshort();
  // eslint-disable-next-line
  const [value, setValue] = React.useState('Controlled');
  const [inputcode, setInputCode] = React.useState();
  const [outputcode, setOutputCode] = React.useState("Output Will be Shown Here :)");
  const [drawer_mode, setdrawer_mode] = React.useState('temporary');
  const [button_enable, setbutton_mode] = React.useState(false);
  const [pinbutton_title, setpinbutton_title] = React.useState("Pin Menu");
  const [bottomholder, setbottomholder] = React.useState({display: 'none'});
  const [darkmode, setdarkmode] = React.useState(true);
  const [themecolor, setthemecolor] = React.useState('#4f5b62');
  const [codemirrortheme, setcodemirrortheme] = React.useState('material');
  const [darkmodebutton, setdarkmodebutton] = React.useState('Light Theme');
  const [darkmodebuttonicon, setdarkmodebuttonicon] = React.useState('brightness_3');
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  // eslint-disable-next-line
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  function sendApiRequest() {
    var flag = 0;
    const array = ["uiop:", ":getenv", "run-program"]
    array.forEach(function (item, index) {
      if(inputcode.includes(item)){
        setOpenwarn(true);
        setOutputCode("Code Contains Banned Operation: " + item)
        flag=1;
      }
    });
    if (flag ===0){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cmd: inputcode })
        };
      fetch('http://192.168.1.3:5000/listhellow/', requestOptions)
      .then(response => response.json())
      .then(data => {
        setOutputCode(data.output)
        if(data.output.includes("Unhandled") && data.output != null){
          setOpenerror(true)
        }else{
          setOpensuccess(true)
        }
      });
    }
  }

  function downloadTxtFile(mode){
    const element = document.createElement("a");
    var textoption="";
    var filename="";
    if(mode === "input"){
      textoption = inputcode;
      filename = "zotCode.lisp";
    }
    else{
      textoption = outputcode;
      filename = "zotOutput.txt";
    }
    const file = new Blob([textoption],    
                {type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
  }

  function togglehidemenu(){
    let root = document.documentElement;

    if (drawer_mode === "temporary"){
      setdrawer_mode("permanent");
      root.style.setProperty('--pos-y', "90px");
      setbutton_mode(true);
      setpinbutton_title("Unpin Menu")
      setbottomholder({visibility: "display"})
    }else{
      setdrawer_mode("temporary");
      root.style.setProperty('--pos-y', "24px");
      setbutton_mode(false);
      setpinbutton_title("Pin Menu")
      setbottomholder({display: "none"})

    }
  }

  function clickbutton(){
    if(document.getElementById("runbutton")=== null){
      togglehidemenu();
      document.getElementById("runbutton").click();
      document.getElementById("pinbutton").click();
    }else{
      document.getElementById("runbutton").click()
    }    
  }

  function toggledarkmode(){
    let root = document.documentElement;
    if(darkmode){
      setcodemirrortheme("eclipse");
      setdarkmode(false)
      setdarkmodebutton("Dark Theme")
      setthemecolor("#dcdee0")
      root.style.setProperty('--color-sep', "#1a759f");
      setdarkmodebuttonicon("light_mode");
    }else{
      setcodemirrortheme("material");
      setdarkmode(true)
      setdarkmodebutton("Light Theme")
      setthemecolor("#4f5b62")
      root.style.setProperty('--color-sep', "#263238");
      setdarkmodebuttonicon("brightness_3");
    }
  }


  return (
  <html lang="en">
    <div>
      < KeyboardEventHandler
        handleFocusableElements = "true"
        handleKeys={['ctrl+i']}
        onKeyEvent={(key, e) => clickbutton()} />

    < KeyboardEventHandler
        handleFocusableElements = "true"
        handleKeys={['ctrl+q']}
        onKeyEvent={(key, e) => {togglehidemenu()}} />

    < KeyboardEventHandler
        handleFocusableElements = "true"
        handleKeys={['ctrl+b']}
        onKeyEvent={(key, e) => document.getElementById('menuicon').click()} />

    < KeyboardEventHandler
        handleFocusableElements = "true"
        handleKeys={['ctrl+m']}
        onKeyEvent={(key, e) => toggledarkmode()} />
    </div>

    <div>
      <ThemeProvider theme={theme}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <div>
        <AppBar position="fixed" color='primary'>
            <Toolbar>
                <div>
                  {['bottom'].map((anchor) => (
                  <React.Fragment key={anchor}>
                    <div className={classesdrawer.root}>
                      <IconButton
                      id="menuicon"
                      size="medium"
                      disabled = {button_enable}
                      onClick={toggleDrawer(anchor, true)}
                      aria-label="Open Run Me"
                      component="span">
                      <Icon>menu</Icon>
                      </IconButton>
                    </div>
                    <Drawer anchor={anchor} open={state[anchor]} variant={drawer_mode} onClose={toggleDrawer(anchor, false)}>
                      {list(anchor)}
                    </Drawer>
                  </React.Fragment>
                  ))}
                </div>
                <Typography variant="h2" color="inherit" align="right" >
                Zot UI
                </Typography>
            </Toolbar>
        </AppBar>
        <Toolbar style={{minHeight:'72px'}} />
        </div>
  <div>
  
  <Box display="flex" flexDirection="row" p={0} m={0} bgcolor={themecolor} >
    <Box p={1} >
    <div class="div-sep">
    &nbsp;&nbsp;Code Editor
      <br></br>
    </div>
      <CodeMirror
          value=';Input Code Here'
          options={{
            mode: 'commonlisp',
            theme: codemirrortheme,
            lineNumbers: true
          }}
          onChange={(editor, data, value) => setInputCode(value) }
    />
    </Box>

    <Box p={1} >
    <div class="div-sep">
    &nbsp;&nbsp;Zot Output
      <br></br>
    </div>
      <CodeMirror
          value={outputcode}
          options={{
            mode: "text",
            theme: codemirrortheme,
            lineNumbers: false
          }}
          onChange={(editor, data, value) => {} }
      />
    </Box>
  </Box>
    </div>
    <div>
      <Dialog onClose={handleCloseDialog} aria-labelledby="customized-dialog-title" open={openDialog}>
        <DialogTitle id="customized-dialog-title" onClose={handleCloseDialog}>
          Keyboard Shortcuts
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Press CTRL+I to Run the Code
          </Typography>
          <Typography gutterBottom>
            Press CTRL+Q to Pin/Unpin the Menu
          </Typography>
          <Typography gutterBottom>
            Press CTRL+B to Show the Menu
          </Typography>
          <Typography gutterBottom>
            Press CTRL+M to Toggle Theme
          </Typography>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </div>

    <div className={classesalert.root}>
      <Snackbar open={warnopen} autoHideDuration={6000} onClose={handleClosewarn} >
        <Alert onClose={handleClosewarn} severity="warning">
          Access to OS Commands is Banned!
        </Alert>
      </Snackbar>

      <Snackbar open={erroropen} autoHideDuration={6000} onClose={handleCloseerror}>
        <Alert onClose={handleCloseerror} severity="error">
          Code Returned Error!
        </Alert>
      </Snackbar>

      <Snackbar open={successopen} autoHideDuration={2000} onClose={handleClosesuccess}>
        <Alert onClose={handleClosesuccess} severity="success">
          Code Executed Successfully!
        </Alert>
      </Snackbar>
    </div>
    </ThemeProvider>
  </div>

  <textarea style={bottomholder} disabled="true" class="placeholderdiv" rows="4">
  
  </textarea>
  </html>
  );
}

export default App;