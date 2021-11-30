import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputBase, MenuItem, Tab, Tabs, TextField, Typography } from "@material-ui/core";
import styled from "styled-components";
import { useState, useEffect, useContext } from 'react';
import Draggable from 'react-draggable';
import { Close, Visibility, VisibilityOff } from "@material-ui/icons";
import PropTypes from 'prop-types';
import {

    makeStyles,
} from '@material-ui/core/styles';
import { get } from "ol/proj";

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as turf from '@turf/turf';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Map, View } from 'ol';
import { Image as ImageLayer, Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM as OSMSource, ImageArcGISRest, TileArcGISRest, Stamen as StamenSource, XYZ as XYZSource, ImageWMS as ImageWMSSource, Vector as VectorSource } from 'ol/source/';
import { fromLonLat } from 'ol/proj';
import OSM from "ol/source/OSM";
import {
    Attribution,
    defaults as defaultControls,
} from 'ol/control'
import MapThemeContainer from "../MapThemeContainer";

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}



export default function Analysis({ open, handleCloseAnalysis, mapLayer, setBuffered, visibleAnalysis, setVisibleAnalysis }) {

    const [center, setCenter] = useState([117, -4]);
    const [zoom, setZoom] = useState(4.5);
    const [basemap, setBasemap] = useState('imagery');

    const handleClose = () => {
        handleCloseAnalysis(false);
    };
    const [title, setTitle] = useState('title');
    const [analysis, setAnalysis] = useState(false);
    const [table, setTable] = useState(false);
    const [url1, setUrl1] = useState("");
    const [url2, setUrl2] = useState("");
    const [url3, setUrl3] = useState("");

    const [layers, setLayers] = useState([true, true, true, true, true, true, true]);
    /*
    const urlCanopyTile = 'https://forests2020.ipb.ac.id/arcgis/rest/services/Ecosystem_CanopyCover/IndonesiaCanopyCover2018/MapServer'
    const urlPaddyTile = 'https://forests2020.ipb.ac.id/arcgis/rest/services/Ecosystem_CommodityDistribution/Paddy_Distribution_2019/MapServer'
    const urlCoffeeDistributionTile = 'https://forests2020.ipb.ac.id/arcgis/rest/services/Ecosystem_CommodityDistribution/Coffe_Distribution_2019/MapServer'
    const urlShake = 'https://gis.bmkg.go.id/arcgis/rest/services/Shakemap/Shakemap_20170424010111/MapServer'
    const urlForest = 'https://forests2020.ipb.ac.id/arcgis/rest/services/Ecosystem_Forest_KLHK/Primary_Swamp_Forest/MapServer'
    const oilPalm = 'https://forests2020.ipb.ac.id/arcgis/rest/services/UNDP/OilPalmAustin/MapServer'
    const alertDevegetation = 'https://forests2020.ipb.ac.id/arcgis/rest/services/Ecosystem_Devegetation/Devegetation_2019/MapServer'
    */
    const url ="https://geonode.cifor.org/geoserver/ows"

    useEffect(() => {
        //props.setTheme(false)
        if (open) {

            var wmsSource = new ImageWMSSource({
                url: url,
                params: { 'LAYERS': 'geonode:KapuasHulu2000_Geo' },
                ratio: 1,
                serverType: 'geoserver',
                crossOrigin: 'Anonymous'
            });

            //var resolution = peta.getView().getResolution();
            //console.log(resolution)
            var graphicUrl = wmsSource.getLegendUrl();
            setUrl1(graphicUrl);

            
            var wmsSource2 = new ImageWMSSource({
                url: url,
                params: { 'LAYERS': 'geonode:KapuasHulu2019_Geo' },
                ratio: 1,
                serverType: 'geoserver',
                crossOrigin: 'Anonymous'
            });

            var graphicUrl2= wmsSource2.getLegendUrl();
            setUrl2(graphicUrl2);

            var wmsSource3 = new ImageWMSSource({
                url: url,
                params: { 'LAYERS': 'geonode:KapuasHulu2038_Geo' },
                ratio: 1,
                serverType: 'geoserver',
                crossOrigin: 'Anonymous'
            });

            var graphicUrl3 = wmsSource3.getLegendUrl();
            setUrl3(graphicUrl3);
            /*
         
            const requestOptions = {
                method: 'GET'
            };
            fetch(urlCanopyTile + "/legend?f=json", requestOptions).then(res => res.json()).then(data => {

                var div = document.getElementById('canopy_legend');
                for (var l in data.layers) {
                    //console.log(data.layers[l])
                    for (var y in data.layers[l].legend) {
                        //console.log(data.layers[l].legend[y])
                        var img = document.createElement('img');
                        img.src = 'data:' + data.layers[l].legend[y].contentType + ';base64,' + data.layers[l].legend[y].imageData;
                        img.width = data.layers[l].legend[y].width;
                        img.height = data.layers[l].legend[y].height;
                        var div2 = document.createElement('div');
                        var span = document.createElement('span');
                        span.innerHTML = data.layers[l].legend[y].label;
                        div2.appendChild(img);
                        div2.appendChild(span);
                        div?.append(div2)

                    }
                }
            })
            //
            fetch(urlPaddyTile + "/legend?f=json", requestOptions).then(res => res.json()).then(data => {
                //console.log(data)
                //console.log(data.layers)
                //console.log(data.layers[0])
                //console.log(data.layers[0].legend[0])
                //console.log('data:'+data.layers[0].legend[0].contentType+';base64,'+data.layers[0].legend[0].imageData)
                var div = document.getElementById('paddy_legend');
                for (var l in data.layers) {
                    //console.log(data.layers[l])
                    for (var y in data.layers[l].legend) {
                        //console.log(data.layers[l].legend[y])
                        var img = document.createElement('img');
                        img.src = 'data:' + data.layers[l].legend[y].contentType + ';base64,' + data.layers[l].legend[y].imageData;
                        img.width = data.layers[l].legend[y].width;
                        img.height = data.layers[l].legend[y].height;
                        var div2 = document.createElement('div');
                        var span = document.createElement('span');
                        span.innerHTML = data.layers[l].legend[y].label;
                        div2.appendChild(img);
                        div2.appendChild(span);
                        div.append(div2)

                    }
                }
            })
            fetch(urlCoffeeDistributionTile + "/legend?f=json", requestOptions).then(res => res.json()).then(data => {
                //console.log(data)
                //console.log(data.layers)
                //console.log(data.layers[0])
                //console.log(data.layers[0].legend[0])
                //console.log('data:'+data.layers[0].legend[0].contentType+';base64,'+data.layers[0].legend[0].imageData)
                var div = document.getElementById('coffee_legend');
                for (var l in data.layers) {
                    //console.log(data.layers[l])
                    for (var y in data.layers[l].legend) {
                        //console.log(data.layers[l].legend[y])
                        var img = document.createElement('img');
                        img.src = 'data:' + data.layers[l].legend[y].contentType + ';base64,' + data.layers[l].legend[y].imageData;
                        img.width = data.layers[l].legend[y].width;
                        img.height = data.layers[l].legend[y].height;
                        var div2 = document.createElement('div');
                        var span = document.createElement('span');
                        span.innerHTML = data.layers[l].legend[y].label;
                        div2.appendChild(img);
                        div2.appendChild(span);
                        div.append(div2)

                    }
                }
            })
            fetch(urlShake + "/legend?f=json", requestOptions).then(res => res.json()).then(data => {
                //console.log(data)
                //console.log(data.layers)
                //console.log(data.layers[0])
                //console.log(data.layers[0].legend[0])
                //console.log('data:'+data.layers[0].legend[0].contentType+';base64,'+data.layers[0].legend[0].imageData)
                var div = document.getElementById('bmkg_legend');
                for (var l in data.layers) {
                    //console.log(data.layers[l])
                    for (var y in data.layers[l].legend) {
                        //console.log(data.layers[l].legend[y])
                        var img = document.createElement('img');
                        img.src = 'data:' + data.layers[l].legend[y].contentType + ';base64,' + data.layers[l].legend[y].imageData;
                        img.width = data.layers[l].legend[y].width;
                        img.height = data.layers[l].legend[y].height;
                        var div2 = document.createElement('div');
                        var span = document.createElement('span');
                        span.innerHTML = data.layers[l].legend[y].label;
                        div2.appendChild(img);
                        div2.appendChild(span);
                        div.append(div2)

                    }
                }
            })
            fetch(urlForest + "/legend?f=json", requestOptions).then(res => res.json()).then(data => {
                //console.log(data)
                //console.log(data.layers)
                //console.log(data.layers[0])
                //console.log(data.layers[0].legend[0])
                //console.log('data:'+data.layers[0].legend[0].contentType+';base64,'+data.layers[0].legend[0].imageData)
                var div = document.getElementById('forest_legend');
                for (var l in data.layers) {
                    //console.log(data.layers[l])
                    if (l == 0) {
                        for (var y in data.layers[l].legend) {
                            //console.log(data.layers[l].legend[y])
                            var img = document.createElement('img');
                            img.src = 'data:' + data.layers[l].legend[y].contentType + ';base64,' + data.layers[l].legend[y].imageData;
                            img.width = data.layers[l].legend[y].width;
                            img.height = data.layers[l].legend[y].height;
                            var div2 = document.createElement('div');
                            var span = document.createElement('span');
                            span.innerHTML = data.layers[l].legend[y].label;
                            div2.appendChild(img);
                            div2.appendChild(span);
                            div.append(div2)

                        }
                    }
                }
            })
            fetch(oilPalm + "/legend?f=json", requestOptions).then(res => res.json()).then(data => {
                //console.log(data)
                //console.log(data.layers)
                //console.log(data.layers[0])
                //console.log(data.layers[0].legend[0])
                //console.log('data:'+data.layers[0].legend[0].contentType+';base64,'+data.layers[0].legend[0].imageData)
                var div = document.getElementById('oil_legend');
                for (var l in data.layers) {
                    //console.log(data.layers[l])
                    for (var y in data.layers[l].legend) {
                        //console.log(data.layers[l].legend[y])
                        var img = document.createElement('img');
                        img.src = 'data:' + data.layers[l].legend[y].contentType + ';base64,' + data.layers[l].legend[y].imageData;
                        img.width = data.layers[l].legend[y].width;
                        img.height = data.layers[l].legend[y].height;
                        var div2 = document.createElement('div');
                        var span = document.createElement('span');
                        span.innerHTML = data.layers[l].legend[y].label;
                        div2.appendChild(img);
                        div2.appendChild(span);
                        div.append(div2)

                    }
                }
            })
            fetch(alertDevegetation + "/legend?f=json", requestOptions).then(res => res.json()).then(data => {
                //console.log(data)
                //console.log(data.layers)
                //console.log(data.layers[0])
                //console.log(data.layers[0].legend[0])
                //console.log('data:'+data.layers[0].legend[0].contentType+';base64,'+data.layers[0].legend[0].imageData)
                var div = document.getElementById('devegetation_legend');
                for (var l in data.layers) {
                    //console.log(data.layers[l])
                    if (l == 0) {
                        for (var y in data.layers[l].legend) {
                            //console.log(data.layers[l].legend[y])
                            var img = document.createElement('img');
                            img.src = 'data:' + data.layers[l].legend[y].contentType + ';base64,' + data.layers[l].legend[y].imageData;
                            img.width = data.layers[l].legend[y].width;
                            img.height = data.layers[l].legend[y].height;
                            var div2 = document.createElement('div');
                            var span = document.createElement('span');
                            span.innerHTML = data.layers[l].legend[y].label;
                            div2.appendChild(img);
                            div2.appendChild(span);
                            div.append(div2)

                        }
                    }
                }
            })
            */
        }
    }, [open])



    function openAnalysis(title) {
        setTitle(title)
        setAnalysis(true)
    }

    function openTable(title) {
        setTitle(title)
        setTable(true)
    }

    function showHide(id) {
        const data = layers.slice();
        //console.log(data[0]);
        //var index = mapLayer.findIndex(x => x.id === id);
        //console.log(index);
        data[id - 1] = !data[id - 1]
        setLayers(data);

        //setLayers(oldArray => [...oldArray, newArray])
    }
    /*
    function showHide(id) {
        //console.log(map.getLayers())
        var layers = map.getLayers().getArray()
        if (id == 1) {
            setLayer1(!layers[id].getVisible())
        }
        if (id == 2) {
            setLayer2(!layers[id].getVisible())
        }
        if (id == 3) {
            setLayer3(!layers[id].getVisible())
        }
        if (id == 4) {
            setLayer4(!layers[id].getVisible())
        }
        if (id == 5) {
            setLayer5(!layers[id].getVisible())
        }
        if (id == 6) {
            setLayer6(!layers[id].getVisible())
        }
        layers[id].setVisible(!layers[id].getVisible())

    }
    */
    return (
        <Dialog
            open={open}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
            fullWidth={true}
            maxWidth="lg"

        >
            <DialogTitle style={{ cursor: 'move', padding: '5px 10px', backgroundColor: '#f3f3f3' }} id="draggable-dialog-title">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Thematic Analysis</span>
                    <IconButton size="small" onClick={handleClose} >
                        <Close />
                    </IconButton>
                </div>


            </DialogTitle>
            <DialogContent style={{ maxHeight: "75vh", padding: '10px' }} >
                <p>Forecasting land cover and decision tool</p>
                <Wrapper>
                    <LeftContent>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Data Source</TableCell>
                                        <TableCell>Data Name</TableCell>
                                        <TableCell>Legend</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    <TableRow key="1">
                                        <TableCell scope="row">
                                            CIFOR
                                        </TableCell>
                                        <TableCell>
                                            Kapuas Hulu Vegetation 2000
                                        </TableCell>
                                        <TableCell>
                                            <div id="legend1">
                                            <img crossOrigin="Anonymous" referrerPolicy="origin" src={url1} alt={'Kapuas Hulu Vegetation 2000'} />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {
                                                //<Button variant="outline-secondary" onClick={() => showHide(1)} size="sm" >{layer1?<Eye size={12} />: <EyeSlash size={12} />}</Button>
                                            }
                                            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => showHide(1)} >
                                                {layers[0] ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key="2">
                                        <TableCell scope="row">
                                            CIFOR
                                        </TableCell>
                                        <TableCell>
                                            Kapuas Hulu Vegetation 2019
                                        </TableCell>
                                        <TableCell>
                                            <div id="legend2">
                                            <img crossOrigin="Anonymous" referrerPolicy="origin" src={url2} alt={'Kapuas Hulu Vegetation 2019'} />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {
                                                //<Button variant="outline-secondary" onClick={() => showHide(1)} size="sm" >{layer1?<Eye size={12} />: <EyeSlash size={12} />}</Button>
                                            }
                                            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => showHide(2)} >
                                                {layers[1] ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key="3">
                                        <TableCell scope="row">
                                            CIFOR
                                        </TableCell>
                                        <TableCell>
                                            Kapuas Hulu Vegetation 2038
                                        </TableCell>
                                        <TableCell>
                                            <div id="legend3">
                                            <img crossOrigin="Anonymous" referrerPolicy="origin" src={url3} alt={'Kapuas Hulu Vegetation 2038'} />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {
                                                //<Button variant="outline-secondary" onClick={() => showHide(1)} size="sm" >{layer1?<Eye size={12} />: <EyeSlash size={12} />}</Button>
                                            }
                                            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => showHide(3)} >
                                                {layers[2] ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                   
                                    {
                                        /*
                                    
                                    <TableRow key="1">
                                        <TableCell scope="row">
                                            IPB
                                        </TableCell>
                                        <TableCell>
                                            Canopy Cover
                                        </TableCell>
                                        <TableCell>
                                            <div id="canopy_legend"></div>
                                        </TableCell>
                                        <TableCell>
                                            {
                                                //<Button variant="outline-secondary" onClick={() => showHide(1)} size="sm" >{layer1?<Eye size={12} />: <EyeSlash size={12} />}</Button>
                                            }
                                            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => showHide(1)} >
                                                {layers[0]? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow key="2">
                                        <TableCell scope="row">
                                            IPB
                                        </TableCell>
                                        <TableCell>
                                            Paddy Field Distribution 2019
                                        </TableCell>
                                        <TableCell>
                                            <div id="paddy_legend"></div>
                                        </TableCell>
                                        <TableCell>
                                            {
                                                //<Button variant="outline-secondary" onClick={() => showHide(1)} size="sm" >{layer1?<Eye size={12} />: <EyeSlash size={12} />}</Button>
                                            }
                                            <IconButton color="primary" aria-label="upload picture" component="span"  onClick={() => showHide(2)}  >
                                            {layers[1]? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key="3">
                                        <TableCell scope="row">
                                            IPB
                                        </TableCell>
                                        <TableCell>
                                            Coffee Distribution
                                        </TableCell>
                                        <TableCell>
                                            <div id="coffee_legend"></div>
                                        </TableCell>
                                        <TableCell>
                                            {
                                                //<Button variant="outline-secondary" onClick={() => showHide(1)} size="sm" >{layer1?<Eye size={12} />: <EyeSlash size={12} />}</Button>
                                            }
                                            <IconButton color="primary" aria-label="upload picture" component="span"  onClick={() => showHide(3)} >
                                            {layers[2]? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key="4">
                                        <TableCell scope="row">
                                            BMKG
                                        </TableCell>
                                        <TableCell>
                                            Shake Analysis
                                        </TableCell>
                                        <TableCell>
                                            <div id="bmkg_legend"></div>
                                        </TableCell>
                                        <TableCell>
                                            {
                                                //<Button variant="outline-secondary" onClick={() => showHide(1)} size="sm" >{layer1?<Eye size={12} />: <EyeSlash size={12} />}</Button>
                                            }
                                            <IconButton color="primary" aria-label="upload picture" component="span"  onClick={() => showHide(4)} >
                                            {layers[3]? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key="5">
                                        <TableCell scope="row">
                                            KLHK
                                        </TableCell>
                                        <TableCell>
                                            Primary Swamp Forest
                                        </TableCell>
                                        <TableCell>
                                            <div id="forest_legend"></div>
                                        </TableCell>
                                        <TableCell>
                                            {
                                                //<Button variant="outline-secondary" onClick={() => showHide(1)} size="sm" >{layer1?<Eye size={12} />: <EyeSlash size={12} />}</Button>
                                            }
                                            <IconButton color="primary" aria-label="upload picture" component="span"  onClick={() => showHide(5)} >
                                            {layers[4]? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key="6">
                                        <TableCell scope="row">
                                            Austin
                                        </TableCell>
                                        <TableCell>
                                            Oil Palm Distribution
                                        </TableCell>
                                        <TableCell>
                                            <div id="oil_legend"></div>
                                        </TableCell>
                                        <TableCell>
                                            {
                                                //<Button variant="outline-secondary" onClick={() => showHide(1)} size="sm" >{layer1?<Eye size={12} />: <EyeSlash size={12} />}</Button>
                                            }
                                            <IconButton color="primary" aria-label="upload picture" component="span"  onClick={() => showHide(6)} >
                                            {layers[5]? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key="7">
                                        <TableCell scope="row">
                                            IPB
                                        </TableCell>
                                        <TableCell>
                                            Devegetation Alert
                                        </TableCell>
                                        <TableCell>
                                            <div id="devegetation_legend"></div>
                                        </TableCell>
                                        <TableCell>
                                            {
                                                //<Button variant="outline-secondary" onClick={() => showHide(1)} size="sm" >{layer1?<Eye size={12} />: <EyeSlash size={12} />}</Button>
                                            }
                                            <IconButton color="primary" aria-label="upload picture" component="span"  onClick={() => showHide(7)} >
                                            {layers[6]? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    */
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </LeftContent>
                    <RightContent >
                        <MapThemeContainer style={{ maxHeight: "30vh" }} id="mapThemeContainer" center={center} zoom={zoom} basemap={basemap} layers={layers} />
                    </RightContent>
                </Wrapper>
            </DialogContent>
        </Dialog>
    )
}

const Wrapper = styled.div`
  margin:0px;
  display: flex;
`;

const LeftContent = styled.div`
  margin:0px;
  flex-grow:1;
  width: 42%;
  max-height: 450px;
  overflow-y: scroll;
  margin-right: 10px;
`;

const RightContent = styled.div`
  margin:0px;
  width: 58%;
  max-height: 450px;
  overflow-y: hidden;
`;

const FormInput = styled.div`
  margin:0px;
  display: flex;
`;

const Label = styled.div`
    width: 150px;
`;
const Entry = styled.div`
    flex-grow: 1;
    display: flex;
`;

const EntryMiddle = styled.div`
    flex-grow: 1;
    padding-right: 10px;
`;