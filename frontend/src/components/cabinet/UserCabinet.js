import React, {Component} from "react";
import {TextField, Button, Grid, Typography, ButtonGroup} from "@material-ui/core";
import {Link} from "react-router-dom";
import axios from "axios";
import Header from "../../containers/Header";
import SettingsIcon from '@material-ui/icons/Settings';
import {connect} from "react-redux";
import PropTypes from "prop-types";


export default class UserCabinet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
        }
    }

    componentDidMount() {
        const user_id = this.props.match.params.userID;
        axios.get(`http://127.0.0.1:8000/api/cabinet/${user_id}`)
            .then(res => {
                this.setState({
                    user: res.data
                });
            })
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
    };


    sections = [
        {title: 'Дивлюсь', url: '/home'},
        {title: 'Подивився', url: '/home'},
        {title: 'Заплановано', url: '/home'},
    ];

    render() {
        return (
            <Grid style={{
                background: '#F1F2F2',
            }}>
                <Grid container
                      spacing={1}
                      direction="column"
                      style={{
                          minHeight: '100vh',
                          align: 'center',
                          margin: 'auto',
                          width: '81.5%',
                          background: 'white',
                      }}>
                    <Header style={{
                        background: '#FBCEB5',
                    }}/>
                    <Grid item xs={12} style={{
                        display: 'flex',
                        padding: '5%'
                    }}>
                        {this.state.user.map(user => (
                            <img src={user.avatar} alt="avatar" width="130px" height="130"/>
                        ))}
                        <Grid container style={{
                            width: '130px',
                            height: '130px',
                            marginLeft: '15px'
                        }}>
                            <Typography style={{
                                margin: 'auto',
                                fontSize: '30px'
                            }}>
                                {this.state.user.map(user => (
                                    user.user.username))}
                            </Typography>
                        </Grid>
                        <Grid style={{
                            marginLeft: 'auto',
                            marginTop: '10px'
                        }}>
                            <Button fullWidth={true} variant="outlined" href={`/cabinet/settings/${this.state.user.map(user => (
                                    user.user.id))}`}
                                    style={{
                                        maxWidth: '40px',
                                        maxHeight: '40px',
                                        minWidth: '40px',
                                        minHeight: '40px',
                                    }}>
                                <SettingsIcon style={{
                                    width: '30px',
                                    height: '30px',
                                }}/>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            <ButtonGroup component="nav" variant="dense" size={"large"}>
                                {this.sections.map((section) => (
                                    <Button
                                        href={section.url}
                                    >
                                        {section.title}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
