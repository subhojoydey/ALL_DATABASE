import React, {Component, useState} from 'react';
import './App.css';
import Form_auth from './Form_Auth.js';
import ProjectInput from './ProjectInput.js';
import socketIOClient from "socket.io-client";
import MaterialTable from "material-table";
import Carousel from 'react-bootstrap/Carousel'
import Jumbotron from 'react-bootstrap/Jumbotron'

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
//043280940074


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
                //var projectdatabaseUpdated = this.state.projectdatabaseUpdated ? <ProjectList project_list={this.state.projectdatabaseUpdated}/> : [{}];
                alert("INVALID CREDS!");
            }
        });
        socket.on("project_database", (msg) => {
            this.setState({projectdatabaseUpdated: msg.data});
            alert("You are inside the mind of AWSSCD")
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
            
            <div className="App">
                
                <div id="UserAuth">
                    <Form_auth modalState_prop={this.state.modalState} get_auth={this.send_auth}/>
                </div>
                
                <div className="App-header">
                    <div className="App-logo">
                        AWSCD
                    </div>
                </div>

                <Jumbotron>
                    <div>
                        <div id="ProjectHead">INSIDE THE </div>
                        <div id="image"><img src="Illuminati-Logo.png" alt="img"/></div>
                    </div>
                </Jumbotron>

                <Carousel>
                    <Carousel.Item style={{'height':"150px"}}>
                        <img
                        className="d-block w-100"
                        src="carousal.jpg"
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        <h4 class="next-line">Now you know, we are also a part of Illuminati! :) . This page contains information on the funtivities partaken by AWSCD, you can look at them and bask at the awersomeness.</h4>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item style={{'height':"150px"}}>
                        <img
                        className="d-block w-100"
                        src="carousal.jpg"
                        alt="Second slide"
                        />

                        <Carousel.Caption>
                        <h4 class="next-line">The goal is to reduce redundancies of the various funtivities and collapse similar ideas together. This will help to not waste time on activities which are already being pursued.</h4>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item style={{'height':"150px"}}>
                        <img
                        className="d-block w-100"
                        src="carousal.jpg"
                        alt="Third slide"
                        />

                        <Carousel.Caption>
                        <h4 class="next-line">Feel free to ping up the engineers in charge of the activities and collaborate with them, look at the comments and feedbacks provided by other engineers and call out to engineers for help.</h4>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                
                <div id="ProjectDatabase">
                    <div style={{
                        maxWidth: "80%",
                        display: "block",
                        margin: "auto",
                        "padding-top": "30px",
                        "padding-bottom": "15px"
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

                    <div id="AddProject">
                        <ProjectInput add_project={this.send_new_project}/>
                    </div>

                </div>

            </div>
                
        );
    }
}


//wiki,brazil/apollo group,cloud dev desktop, IDE to devdesk, appsec, 