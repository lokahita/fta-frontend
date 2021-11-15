import './Landing.css';
import styled from "styled-components";
import Config from './config.json';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useState } from 'react';

import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

function HelpSingle() {

    const [open, setOpen] = useState(false);


    const handleCloseDialog = () => {
        setOpen(false);
    };

    return (
        <>
            <section id="geo-page-title">
                <div class="container">
                    <div class="row d-flex justify-content-between align-middle">
                        <div class="col-md-3">
                            <form>
                                <input type="text" name="" placeholder="Seach help..." />
                                <button><i class ="las la-search"></i></button>
                            </form>
                        </div>
                        <div class="col-md-3">
                            <p>Last update: 22 October 2021</p>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div class="container">
                    <div class="row">
                        <div class="col-md-3 hide-mobile">
                            <div id="sidebar">
                                <div class="sidebar__inner">
                                    <div class="widget_title">
                                        Help Menu
                                    </div>
                                    <ul>
                                        <li>
                                            <a href="#/help-single#getting-started">Getting started</a>
                                        </li>
                                        <li>
                                            <a href="#/help-single#browse-the-spatial-data-or-maps">Browse the spatial data or maps</a>
                                        </li>
                                        <li>
                                            <a href="#/help-single#learn-about-data">Learn about data</a>
                                        </li>
                                        <li>
                                            <a href="#/help-single#add-data-to-the-map">Add data to the map</a>
                                        </li>
                                        <li>
                                            <a href="#/help-single#find-a-specific-map">Find a specific map</a>
                                        </li>
                                        <li>
                                            <a href="#">Selecting a study area</a>
                                        </li>
                                        <li>
                                            <a href="#">Add your own data</a>
                                        </li>
                                        <li>
                                            <a href="#">Download the data</a>
                                        </li>
                                        <li>
                                            <a href="#">Change background map</a>
                                        </li>
                                        <li>
                                            <a href="#">Perform basic special activity</a>
                                        </li>
                                        <li>
                                            <a href="#">Print your map</a>
                                        </li>
                                        <li>
                                            <a href="#">Analysis Map</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-9">
                            <div class="help-single">
                                <section id="getting-started" class="text-left">
                                    <h1>Introduction</h1>
                                    <p class="big">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                </section>
                                <section id="browse-the-spatial-data-or-maps" class="text-left">
                                    <h2>Browse the spatial data or maps</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                                    <img src="assets/img/slider.png" />
                                    <figcaption>Picture 1</figcaption>
                                    <p>Sed augue lacus viverra vitae.Tortor aliquam nulla facilisi cras fermentum.Convallis tellus id interdum velit laoreet.Urna molestie at elementum eu facilisis sed odio morbi quis.</p>
                                </section>
                                <section id="learn-about-data" class="text-left">
                                    <h2>Learn about data</h2>
                                    <p>Volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim. Feugiat vivamus at augue eget arcu dictum varius duis. Cursus mattis molestie a iaculis at erat pellentesque adipiscing. Faucibus pulvinar elementum integer enim neque volutpat ac. </p>
                                    <p>Eu facilisis sed odio morbi. Tortor at auctor urna nunc. Leo vel fringilla est ullamcorper. Orci ac auctor augue mauris. Egestas dui id ornare arcu odio ut. In nibh mauris cursus mattis molestie a. Elementum sagittis vitae et leo duis ut diam. In nulla posuere sollicitudin aliquam ultrices sagittis. Mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus.</p>
                                </section>
                                <section id="add-data-to-the-map" class="text-left">
                                    <h2>Add data to the map</h2>
                                    <p>Quam elementum pulvinar etiam non. Malesuada bibendum arcu vitae elementum. A erat nam at lectus urna duis convallis. Augue ut lectus arcu bibendum at varius vel. Erat velit scelerisque in dictum non consectetur a erat. Viverra orci sagittis eu volutpat odio facilisis.</p>
                                    <p>Natoque penatibus et magnis dis parturient. Interdum velit euismod in pellentesque massa. Laoreet non curabitur gravida arcu. Quis viverra nibh cras pulvinar mattis. Amet justo donec enim diam vulputate ut. Viverra vitae congue eu consequat ac felis. Eget nullam non nisi est. At risus viverra adipiscing at in tellus integer feugiat scelerisque.</p>
                                </section>
                                <section id="find-a-specific-map" class="text-left">
                                    <h2>Find a specific map</h2>
                                    <p>Natoque penatibus et magnis dis parturient. Interdum velit euismod in pellentesque massa. Laoreet non curabitur gravida arcu. Quis viverra nibh cras pulvinar mattis. Amet justo donec enim diam vulputate ut. Viverra vitae congue eu consequat ac felis. Eget nullam non nisi est. At risus viverra adipiscing at in tellus integer feugiat scelerisque. Egestas congue quisque egestas diam in arcu cursus. Consequat interdum varius sit amet. Purus semper eget duis at tellus at urna condimentum mattis. Placerat duis ultricies lacus sed turpis. Purus sit amet luctus venenatis lectus magna fringilla urna porttitor. Dignissim diam quis enim lobortis scelerisque fermentum. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim. Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo. Tellus molestie nunc non blandit massa enim nec dui. Tincidunt nunc pulvinar sapien et ligula.</p>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default HelpSingle;

const Container = styled.div`
  display: flex;
  height:100vh;
  flex-direction: column;
`;
