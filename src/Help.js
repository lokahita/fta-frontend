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

function Help() {

    const [open, setOpen] = useState(false);


    const handleCloseDialog = () => {
        setOpen(false);
    };

    return (
        <>
            <section id="geo-hero" class="no-bg">
                <div class="container d-flex align-items-center">
                    <div class="geo-hero-text">
                        <h4 class="dark">FTA GEOPORTAL - HELP CENTER</h4>
                        <h2 class="dark">What do you want to do?</h2>
                    </div>
                </div>
            </section>
            <section>
                <div class="container">
                    <div class="grid">
                        <article>
                            <a href="#/help-single#browse-the-spatial-data-or-maps">
                                <div class="entry-title">Browse the spartial data or maps</div>
                                <div class="entry-content">Excepteur sint occaecat cupidatat non proident</div>
                                <div class="read-more"><i class="las la-arrow-right"></i></div>
                            </a>
                        </article>
                        <article>
                            <a href="#/help-single#learn-about-data">
                                <div class="entry-title">Learn about data</div>
                                <div class="entry-content">Excepteur sint occaecat cupidatat non proident</div>
                                <div class="read-more"><i class="las la-arrow-right"></i></div>
                            </a>
                        </article>
                        <article>
                            <a href="#/help-single#add-data-to-the-map">
                                <div class="entry-title">Add data to the map</div>
                                <div class="entry-content">Excepteur sint occaecat cupidatat non proident</div>
                                <div class="read-more"><i class="las la-arrow-right"></i></div>
                            </a>
                        </article>
                        <article>
                            <a href="#/help-single#find-a-specific-map">
                                <div class="entry-title">Find a specific map</div>
                                <div class="entry-content">Excepteur sint occaecat cupidatat non proident</div>
                                <div class="read-more"><i class="las la-arrow-right"></i></div>
                            </a>
                        </article>
                        <article>
                            <a href="#/help-single">
                                <div class="entry-title">Selecting a study area</div>
                                <div class="entry-content">Excepteur sint occaecat cupidatat non proident</div>
                                <div class="read-more"><i class="las la-arrow-right"></i></div>
                            </a>
                        </article>
                        <article>
                            <a href="#/help-single">
                                <div class="entry-title">Add your own data</div>
                                <div class="entry-content">Excepteur sint occaecat cupidatat non proident</div>
                                <div class="read-more"><i class="las la-arrow-right"></i></div>
                            </a>
                        </article>
                        <article>
                            <a href="#/help-single">
                                <div class="entry-title">Download the data</div>
                                <div class="entry-content">Excepteur sint occaecat cupidatat non proident</div>
                                <div class="read-more"><i class="las la-arrow-right"></i></div>
                            </a>
                        </article>
                        <article>
                            <a href="#/help-single">
                                <div class="entry-title">Change background map</div>
                                <div class="entry-content">Excepteur sint occaecat cupidatat non proident</div>
                                <div class="read-more"><i class="las la-arrow-right"></i></div>
                            </a>
                        </article>
                        <article>
                            <a href="#/help-single">
                                <div class="entry-title">Perform basic spatial activity</div>
                                <div class="entry-content">Excepteur sint occaecat cupidatat non proident</div>
                                <div class="read-more"><i class="las la-arrow-right"></i></div>
                            </a>
                        </article>
                        <article>
                            <a href="#/help-single">
                                <div class="entry-title">Print yout map</div>
                                <div class="entry-content">Excepteur sint occaecat cupidatat non proident</div>
                                <div class="read-more"><i class="las la-arrow-right"></i></div>
                            </a>
                        </article>
                        <article>
                            <a href="#/help-single">
                                <div class="entry-title">Analysis map</div>
                                <div class="entry-content">Excepteur sint occaecat cupidatat non proident</div>
                                <div class="read-more"><i class="las la-arrow-right"></i></div>
                            </a>
                        </article>
                    </div>
                </div>
            </section>
            <section id="faq">
                <div class="container">
                    <div class="row justify-content-between">
                        <div class="col-md-3">
                            <h2>FAQs</h2>
                            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
                        </div>
                        <div class="col-md-8">
                            <div class="accordion" id="accordionExample">
                                <div class="card">
                                    <div class="card-header" id="headingOne">
                                        <h2 class="mb-0">
                                            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                Collapsible Group Item #1 <i class="las la-angle-up"></i>
                                            </button>
                                        </h2>
                                    </div>

                                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                        <div class="card-body">
                                            <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-header" id="headingTwo">
                                        <h2 class="mb-0">
                                            <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                Collapsible Group Item #2 <i class="las la-angle-up"></i>
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                        <div class="card-body">
                                            <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-header" id="headingThree">
                                        <h2 class="mb-0">
                                            <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                Collapsible Group Item #3 <i class="las la-angle-up"></i>
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                        <div class="card-body">
                                            <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Help;

const Container = styled.div`
  display: flex;
  height:100vh;
  flex-direction: column;
`;
