# ReactJS-with-Nodejs-with-IIS-Config
Implementation of Reactjs App with Node Js and URL Rewrite with IIS
Possible Configurations
Use IIS / ARR & Reverse Proxy
Use Nginx Reverse Proxy

Tools You Will Need
Make sure Node and NPM are installed on your computer. You can download both at nodejs.org (NPM is included in your Node installation)
Use a code editor of your choice. I am using and would personally recommend using VSCode. You can download VSCode at code.visualstudio.com.
Install URLRewrite: https://www.iis.net/downloads/microsoft/url-rewrite
Iisnode: https://github.com/azure/iisnode/releases/download/v0.2.21/iisnode-full-v0.2.21-x64.msi
Resources
Application Request Routing 
https://docs.microsoft.com/en-us/iis/extensions/url-rewrite-module/reverse-proxy-with-url-rewrite-v2-and-application-request-routing

How to host Reactjs App on IIS
https://dev.to/sumitkharche/how-to-deploy-react-application-on-iis-server-1ied

How to Host nodejs on IIS
https://stackoverflow.com/questions/46266609/host-node-js-on-windows-server-iis

Error when Configuration hosting Nodejs AI
https://qawithexperts.com/questions/127/error-this-configuration-section-cannot-be-used-at-this-path

Create your Node (Express) backend
First create a folder for your project, called react-node-app (for example).
Then, drag that folder into your code editor.

To create our Node project, run the following command in your terminal:

npm init -y

This will create a package.json file which will allow us to keep track of all our app scripts and manage any dependencies our Node app needs.

Our server code will live in a folder of the same name: server. Let's create that folder.

In it, we'll place a single file, out of which we'll run our server: index.js.

// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello! This is Server default");
});

app.get("/api1", (req, res) => {
  res.json({ message: "Hello from server1!" });
});

app.get("/api2", (req, res) => {
  res.json({ message: "Hello from server2!" });
});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
Then in our terminal, we will install Express as a dependency to use it:

npm i express

After that, we will create a script in package.json that will start our web server when we run it with npm start:

// server/package.json
...
"scripts": {
  "start": "node server/index.js"
},
...

Finally, we can run our app using this script by running npm start in our terminal and we should see that it is running on port 3001:

npm start

> node server/index.js

Server listening on 3001

Create your React frontend

After creating our backend, let's move to the frontend.

Open another terminal tab and use create-react-app to create a new React project with the name client:

npx create-react-app client

After that, we will have a React app with all of its dependencies installed.

The only change we have to make is to add a property called proxy to our package.json file.

This will allow us to make requests to our Node server without having to provide the origin it is running on (http://localhost:3001) every time we make a network request to it:

// client/package.json

...
"proxy": "http://localhost:3001",
...

Then we can start up our React app by running its start script, which is the same as our Node server. First make sure to cd into the newly-created client folder.

After that, will start up on localhost:3000:

cd client
npm start

Compiled successfully!

You can now view client in the browser.

Local:            http://localhost:3000

Make HTTP Requests from React to Node
Now that we have a working React app, we want to use it to interact with our API.

Let's see how to fetch data from the /api endpoint that we created earlier.

To do so, we can head to the App.js component in our src folder and make an HTTP request using useEffect.

We will make a simple GET request using the Fetch API to our backend and then have our data returned as JSON.

// client/src/App.js

import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;

Host node js on windows server (iis):
Add a website to IIS


check your new website modules to ensure iisnode is installed

If its there you're good


create the node app code JS file

Put this code in the file
// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello! This is Server default");
});

app.get("/api1", (req, res) => {
  res.json({ message: "Hello from server1!" });
});

app.get("/api2", (req, res) => {
  res.json({ message: "Hello from server2!" });
});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

add a web.config file to the directory and put this code in it
<configuration>
<system.webServer>

<handlers>
  <add name="iisnode" path="index.js" verb="*" modules="iisnode" />
</handlers>
<iisnode nodeProcessCommandLine="C:\Program Files (x86)\nodejs\node.exe" />
<rewrite>
  <rules>
    <rule name="nodejs">
      <match url="(.*)" />
      <conditions>
        <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
      </conditions>
      <action type="Rewrite" url="/index.js" />
    </rule>
  </rules>
</rewrite>

<security>
  <requestFiltering>
    <hiddenSegments>
      <add segment="node_modules" />
      <add segment="iisnode" />
    </hiddenSegments>
  </requestFiltering>
</security>

</system.webServer>
</configuration>

in a browser navigate to the new site and you should get this error because you haven't installed express package
In 
 
open a command prompt and install express

If you face Still issues like follow below 

Resolution
To C:\Windows\System32\inetsrv\config
Update the file with allow Handlers



Deploy Reactjs Application on IIS

Create production environment of your ReactJs application by 
 npm run build
Press Windows + R key and write inetmgr to open the IIS Manager. You can see the below screen.

After that right-click on Sites and then click on Add Website. Add the Site name and select application pool which we created earlier. After that under physical path section, you have to give the path of build folder & also give the port number where you want to host.


Now right click on new website i.e ReactApp -> Manage Website -> Browse. Your react app is now successfully deployed.

Application Request Routing (ARR) in IIS

Install ARR
Based on Url Rewrite version
https://www.iis.net/downloads/microsoft/application-request-routing version 5 
https://www.microsoft.com/en-us/download/details.aspx?id=47333 Version 4
Configure ARR as a Forward Proxy
To enable ARR as a proxy, and to create a URL Rewrite rule to enable ARR as a forward proxy, proceed as follows:
Open Internet Information Services (IIS) Manager.
In the Connections pane, select the server.
In the server pane, double-click Application Request Routing Cache.

4. In the Actions pane, click Server Proxy Settings. 

5. On the Application Request Routing page, select Enable proxy.

6. In the Actions pane, click Apply. This enables ARR as a proxy at the server level.
7. To start the process of turning ARR into a forward proxy, click on the server node in the Connections pane.
8. In the server pane, double-click URL Rewrite.

9. In the Actions pane, click Add Rule(s).

10. In the Add Rule dialog box, double-click Blank Rule.

11. In the Edit Inbound Rule dialog box, enter "Forward Proxy" for Name. In the Match URL area, enter the following:
Using: Regular Expression
Pattern: *

OR add web.config as below

<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
    <rules>
        <rule name="Reverse Proxy to route1" stopProcessing="true">
            <match url="route1" />
            <action type="Rewrite" url="http://192.168.100.115:5001/{R:0}" />
        </rule>
        <rule name="Reverse Proxy to route2" stopProcessing="true">
            <match url="route2" />
            <action type="Rewrite" url="http://192.168.100.115:5002/{R:0}" />
        </rule>
    </rules>
</rewrite>
    </system.webServer>
</configuration>




