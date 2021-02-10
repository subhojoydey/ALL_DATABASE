let express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http, {
    pingTimeout: 60000, // 1 minutes
    pingInterval: 5000 // 5 seconds
});
let AWS = require('aws-sdk');
AWS.config.loadFromPath('./creds.json');
let userAuth_verified = false;

let connectPORT = process.env.PORT || 3000;

let bcrypt = require('bcrypt');
let saltRounds = 10;


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/build/index.html');
});

//serves the public folder
app.use(express.static(__dirname + '/build'));

http.listen(connectPORT, () => {
    console.log(`listening on *: ${connectPORT}`);
});


/*bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash("1", salt, function(err, hash) {
        // Store hash in your password DB
        console.log(hash)
    });
});
*/

var dynamodb = new AWS.DynamoDB.DocumentClient();
var dynamoDB = new AWS.DynamoDB();


/*
{
    Items: [ { 'S/N': [Object], email: [Object], password: [Object] } ],
    Count: 1,
    ScannedCount: 1
  }*/

const getItemCount_Users = async() => {
    var params = {
        TableName : "User_Auth",
    };
    await dynamoDB.scan(params, function(err, data) {
        if (err) console.log("Error while getting total number of items in User Table", err.stack); // an error occurred
        else     return data.Count;
    });
}


const addUser = async(user_details) => {
    var item_count = getItemCount_Users();
    var params = {
        TableName : "User_Auth",
        Item: {
            "S/N": item_count+1,
            "Name": user_details.name,
            "password": user_details.password
        }
    };
    
    dynamodb.put(params, function(err, data) {
        if (err) console.log("Error while adding to User Table", err.stack); // an error occurred   
    });
}


const addProject = async(user_details, socket) => {
    var params = {
        TableName : "Team_Projects",
    };
    await dynamoDB.scan(params, function(err, data) {
        if (err) console.log("Error while getting total number of items in User Table", err.stack); // an error occurred
        else {
            console.log(data);
            var params = {
                TableName : "Team_Projects",
                Item: {
                    "SN": data.Count+1,
                    "Name of Project": user_details.NP,
                    "Purpose": user_details.Purpose
                }
            };

            dynamodb.put(params, function(err, data) {
                if (err) console.log("Error while adding to User Table", err.stack);
                else {
                    queryTable_Projects(socket);
                } // an error occurred   
            });
        };
    });
}

const queryTable_checkPass = async (user_detail, socket) => {
    var params = {
        TableName : "User_Auth",
        FilterExpression: "#Name = :Name",
        ExpressionAttributeNames: {
            "#Name": "Name"
        }, 
        ExpressionAttributeValues: {
            ":Name": user_detail.alias
        }
    };
    await dynamodb.scan(params, async function(err, data) {
        if (err) console.log(err);
        else {console.log(user_detail,data);if (data.Count != 0){await compareHash(user_detail.password,data.Items[0].password, socket)}else{socket.emit("auth_verified",{data:false});}};
        });
}

const compareHash = async (user_pass,hash,socket) => {
    await bcrypt.compare(user_pass, hash, async function(err, result) {
        // result == true
        if (result==true) {
            userAuth_verified = true;
            console.log("VERIFIED");
            socket.emit("auth_verified",{data:result});
            queryTable_Projects(socket);
        }else {socket.emit("auth_verified",{data:result});}
    });
}


const queryTable_Projects = async (socket) => {
    var params = {
        TableName : "Team_Projects"
    };
    await dynamodb.scan(params, async function(err, data) {
        if (err) console.log(err);
        else {//delete data.Items[0]["SN"];
            socket.emit("project_database",{data:data.Items});
    }
        });
}

/*
const queryTable_Projects_Update = async (SN,socket) => {
    console.log(SN);
    var params = {
        TableName : "Team_Projects",
        KeyConditionExpression: "#serial = :serial",
        ExpressionAttributeNames: {
            "#serial": "SN"
        }, 
        ExpressionAttributeValues: {
            ":serial": SN
        }
    };
    dynamodb.query(params, function(err, data) {
        if (err) console.log(err);
        else socket.emit("project_database_updated",{data:data.Items});
        });
}*/

io.on('connection', function (socket) {

    io.eio.pingTimeout = 60000; // 1 minutes
    io.eio.pingInterval = 5000; // 5 seconds

    socket.on('auth_login', async(msg) => {
        clearTimeout(socket.inactivityTimeout);
        await queryTable_checkPass(msg.data, socket);
        //console.log(authentication);
        //await queryTable_Events(socket);
        socket.inactivityTimeout = setTimeout(() => socket.disconnect(true), 60000);
    });

    socket.on("add_project", async(msg) => {
        clearTimeout(socket.inactivityTimeout);
        await addProject(msg.data, socket);
        socket.inactivityTimeout = setTimeout(() => socket.disconnect(true), 60000);
        //console.log(authentication);
        //await queryTable_Events(socket);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});