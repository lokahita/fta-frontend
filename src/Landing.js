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

function Landing() {
	
	const [open, setOpen] = useState(false);

   
	const handleCloseDialog = () => {
		setOpen(false);
};

	return (
		<>
			<Dialog
				open={open}
				PaperComponent={PaperComponent}
				aria-labelledby="draggable-dialog-title"
				fullWidth={true}
				maxWidth="xs"
			>
				<DialogTitle style={{ cursor: 'move', padding: '5px 10px', backgroundColor: '#f3f3f3' }} id="draggable-dialog-title">
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<span>Guidelines </span>
						<IconButton size="small" onClick={handleCloseDialog} >
							<Close />
						</IconButton>
					</div>
				</DialogTitle>
				<DialogContent style={{ padding: '10px' }}>
					<ul>

					<li>Geospatial Data Curation Steps <a href="https://doi.org/10.17528/cifor/fta22913" target="_blank">https://doi.org/10.17528/cifor/fta22913</a></li>
    				<li>Spatial metadata: Guidelines and procedures <a href="https://doi.org/10.17528/cifor/fta21369" target="_blank">https://doi.org/10.17528/cifor/fta21369</a></li>
    				<li>Geospatial data quality: Guidelines and procedures <a href="https://doi.org/10.17528/cifor/fta21368" target="_blank">https://doi.org/10.17528/cifor/fta21368</a></li>

					</ul>
				</DialogContent>
			</Dialog>
			<section id="geo-hero" style={{ backgroundImage: "url('assets/img/maps.jpeg')" }}>
				<div className="container d-flex align-items-center">
					<div className="geo-hero-text">
						<h4>Welcome to the</h4>
						<h2>FTA geoportal</h2>
						<p style={{ color: "white" }}>This is a spatial data sharing tools, as well as a platform for displaying the geospatial datasets from research that has been funded by the CGIAR Research Program on Forests, Trees and Agroforestry (FTA).</p>
					</div>
				</div>
			</section>
			<section id="geo-slider">
				<div className="container">
					<strong>The platform will enable you to</strong>
					<div id="geo-slides" className="carousel slide" data-ride="carousel">
						<ol className="carousel-indicators">
							<li data-target="#geo-slides" data-slide-to="0" class="active"></li>
							<li data-target="#geo-slides" data-slide-to="1"></li>
							<li data-target="#geo-slides" data-slide-to="2"></li>
							<li data-target="#geo-slides" data-slide-to="3"></li>
							<li data-target="#geo-slides" data-slide-to="4"></li>
							<li data-target="#geo-slides" data-slide-to="5"></li>
							<li data-target="#geo-slides" data-slide-to="6"></li>
						</ol>
						<div className="carousel-inner">
							<div class="carousel-item active">
								<img src="assets/img/browse-slider.png" alt="First slide" width="500px" />
								<h3>Discover geospatial data resources</h3>
								<p>Search maps with either a geographic location or criteria designated on a map. Search results are displayed as summary statements derived from the metadata records citing each information item found.</p>
							</div>
							<div className="carousel-item">
								<img src="assets/img/view-slider.png" alt="Second slide" width="500px" />
								<h3>Preview geospatial data resources</h3>
								<p>Discover and view mapped data maintained on web-accessible maps (live maps) without launching a map viewer.<br /><br /></p>
							</div>
							<div className="carousel-item">
								<img src="assets/img/compare-slider.png" alt="Third slide" width="500px" />
								<h3>Create maps that combine geospatial resources</h3>
								<p>Combine mapped data from different live map sources from the geoportal data catalogue. You can then view the composite map during the same geoportal session.</p>
							</div>
							<div className="carousel-item">
								<img src="assets/img/print-slider.png" alt="Fourth slide" width="500px" />
								<h3>Compare, print and download geospatial data resources</h3>
								<p>You can compare existing data and download the comparison in CSV, PDF or JPEG format.<br /><br /></p>
							</div>
							<div className="carousel-item">
								<img src="assets/img/analysis-slider.png" alt="Fifth slide" width="500px" />
								<h3>Data Analysis</h3>
								<p>A simple overlay analysis can be achieved by superimposing the multiple layers or datasets that represent different themes for analysing or identifying relationships in each layer</p>
							</div>
							<div className="carousel-item">
								<img src="assets/img/upload-slider.png" alt="Sixth slide" width="500px" />
								<h3>Upload local or private geospatial data</h3>
								<p>You can upload your shape file data, i.e., research area, to the geoportal and review it with the existing data catalogue and baseline map.</p>
							</div>
							<div className="carousel-item">
								<img src="assets/img/draw-slider.png" alt="Seventh slide" width="500px" />
								<h3>Add primitive spatial objects</h3>
								<p>You can add spatial objects including points, lines and polygons to the geoportal.<br /><br /></p>
							</div>
						</div>
						<a className="carousel-control-prev" href="#geo-slides" role="button" data-slide="prev">
							<span><i class="las la-arrow-left"></i></span>
						</a>
						<a className="carousel-control-next" href="#geo-slides" role="button" data-slide="next">
							<span><i class="las la-arrow-right"></i></span>
						</a>
					</div>
				</div>
			</section>
			<section id="geo-started">
				<div className="container">
					<h2>Ready to get started?</h2>
					<p>Explore over 100 globat and local data sets to learn about conservation, land use, forest comunities and much more.</p>
					<button className="geo-btn btn-primary" onClick={() => window.location.href = '#/viewer'}>Discovering</button>
				</div>
			</section>
			<section id="geo-blog">
				<div className="container">
					<h2>Highlighted Maps</h2>
					<div className="geo-article">
						<div className="row">
							<div className="col-md-6">
								<div className="geo-thumbnail">
									<img src="assets/img/vegetation.png" />
								</div>
							</div>
							<div className="col-md-6">
								<div className="entry-title">Vegetation maps</div>
								<p>These 1:50,000 scale ecological vegetation maps cover more than 60 classes of natural and man-made vegetation including various forest types, but also details on logged-over areas, peat swamps, heath forests, oil palm estates, various mixed agroforestry systems, mosaics of fallow and smallholder agriculture.</p>
								<a href={Config.base_domain + "#/viewer?identifier=28C6FF20-081D-4BCD-A88E-EE1EBD09FD16"} className="geo-btn btn-secondary">View</a>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6">
								<div className="entry-title">Oil palm</div>
								<p>We also have  Information about the oil palm smallholder plantations in Central and West Kalimantan for 2015 and 2016 </p>
								<a href={Config.base_domain + "#/viewer?identifier=47e6e22c-c376-11eb-ae8f-0242ac190008"} className="geo-btn btn-secondary">View</a>
							</div>
							<div className="col-md-6">
								<div className="geo-thumbnail">
									<img src="assets/img/oil.png" />
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6">
								<div className="geo-thumbnail">
									<img src="assets/img/potential.png" />
								</div>
							</div>
							<div className="col-md-6">
								<div className="entry-title">Potential restoration</div>
								<p>This thematic data has been analysed using potential sites and cost analysis. The potential sites have been determined based on data from the Borneo and SWAMP (Sustainable Wetlands Adaptation and Mitigation Program) atlas project. The cost has been calculated based on the cost of the workers’ wages, land acquisition, transportation and seed. Using the highest priority sites means that the locations can be low cost, low maintenance and more likely to achieve the aims of the restoration project.  </p>
								<a href={Config.base_domain + "#/viewer?identifier=958ad418-0ee2-11ec-bfa9-0242ac190008"} class="geo-btn btn-secondary">View</a>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6">
								<div className="entry-title">Peat Depth Maps</div>
								<p>These maps show the distribution of wetlands, peatlands and the peat depth that covers the tropics and sub tropics (40° N to 60° S: 180° E to -180° W), excluding small islands. It was mapped using 231 meters spatial resolution by combining a hydrological model and annual time series of satellite-derived estimates of soil moisture to represent water flow and surface wetness that were then combined with geomorphological data. </p>
								<a href={Config.base_domain + "#/viewer?identifier=d00355ae-45e0-11ec-8a33-0242ac190008"} className="geo-btn btn-secondary">View</a>
							</div>
							<div className="col-md-6">
								<div className="geo-thumbnail">
									<img src="assets/img/peat_depth.png" />
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6">
								<div className="geo-thumbnail">
									<img src="assets/img/climate.png" />
								</div>
							</div>
							<div className="col-md-6">
								<div className="entry-title">Climate Maps</div>
								<p>These maps show the geographic distribution of the monthly or annual average values of climate variables, i.e., precipitation.</p>
								<a href={Config.base_domain + "#/viewer?identifier=5753f586-70c2-11e5-9ed2-0025909b69da"} class="geo-btn btn-secondary">View</a>
							</div>
						</div>
					</div>
					<button className="geo-btn btn-primary" onClick={() => window.location.href = '#/viewer'}>More Maps..</button>
				</div>
			</section>
			<section id="geo-cta">
				<div className="container">
					<h2>Didn't find what you need?</h2>
					<p>Help is full of usefull guides and tutorials to help get you started in no time</p>
					<ul>
						<li><a href={Config.base_domain + "help.html"} target="_blank">Search data <i class="las la-angle-right"></i></a></li>
						<li><a href={'https://data.cifor.org/geoportal/contributor/'} target="_blank">Contribute new data <i class="las la-angle-right"></i></a></li>
						<li><a href={Config.base_domain + "guidelines.html"} target="_blank" >Guidelines<i class="las la-angle-right"></i></a></li>
					</ul>
				</div>
			</section>
		</>
	);
}

export default Landing;

const Container = styled.div`
  display: flex;
  height:100vh;
  flex-direction: column;
`;
