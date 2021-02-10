import React, {Component, useState} from 'react';
import './App.css';
import Form_auth from './Form_Auth.js';
import ProjectInput from './ProjectInput.js';
import Modal from "react-modal";
import socketIOClient from "socket.io-client";
import MaterialTable from "material-table";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
//043280940074

Modal.setAppElement("#root");

export default class App extends React.Component {

    state = {
        modalState: true,
        projectdatabaseUpdated: [{}]
    }
    socket;

    componentDidMount() {
        this.configureSocket();
    }

    configureSocket = () => {
        var socket = socketIOClient();
        socket.on('auth_verified', (msg) => {
            if (msg.data == true) {
                this.setState({modalState: false});
            }
            else {
                console.log(msg.data)
                //var projectdatabaseUpdated = this.state.projectdatabaseUpdated ? <ProjectList project_list={this.state.projectdatabaseUpdated}/> : [{}];
                alert("INVALID CREDS!");
            }
        });
        socket.on("project_database", (msg) => {
            console.log(msg.data);
            this.setState({projectdatabaseUpdated: msg.data});

        });
        this.socket = socket;
    }

    send_auth = (data) => {
        this
            .socket
            .emit("auth_login", {data: data});
    }

    send_new_project = (data) => {
        this
            .socket
            .emit("add_project", {data: data});
    }

    render() {
        return (
            <Container>
                <div className="App">
                   
                    <div id="UserAuth">
                        <Form_auth modalState_prop={this.state.modalState} get_auth={this.send_auth}/>
                    </div>
                    
                    <Row>
                        <Col>
                            <div className="App-header">
                                <div className="App-logo">
                                    AWSCD
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <div id="ProjectHead" >
                        <p id="page heading">GOD'S EYE</p>
                    </div>
            
                    <div id="EventsDatabase">
                        <div style={{
                            maxWidth: "80%",
                            display: "block",
                            margin: "auto"
                        }}>
                            <MaterialTable
                                columns={[
                                {
                                    title: "SERIAL NUMBER",
                                    field: "SN",
                                    defaultSort: "asc",
                                    cellStyle: { backgroundColor: '#039be5', color: '#FFF', textAlign: "center"}, 
                                    headerStyle: { backgroundColor: '#039be5', textAlign: "center" } 
                                },
                                {
                                    title: "PURPOSE",
                                    field: "Purpose",
                                    cellStyle: { textAlign: "center" }, 
                                    headerStyle: { textAlign: "center" } 
                                }, {
                                    title: "NAME OF PROJECT",
                                    field: "Name of Project",
                                    cellStyle: { textAlign: "center" }, 
                                    headerStyle: { textAlign: "center" } 
                                },

                            ]}
                                data={this.state.projectdatabaseUpdated}
                                title="Projects Table"
                                options={{
                                    headerStyle: {
                                    backgroundColor: '#01579b',
                                    fontSize: 20,
                                    color: '#FFF'
                                    }
                                }}
                                
                            />
                            
                        </div>
                    </div>

                    <div id="AddProject">
                        <ProjectInput add_project={this.send_new_project}/>
                    </div>

                </div>
                
            </Container>
        );
    }
}


//wiki,brazil/apollo group,cloud dev desktop, IDE to devdesk, appsec, 