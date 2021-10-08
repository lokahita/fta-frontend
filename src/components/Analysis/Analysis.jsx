import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputBase, MenuItem, Tab, Tabs, TextField, Typography } from "@material-ui/core";
import styled from "styled-components";
import { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { Close, Visibility } from "@material-ui/icons";
import PropTypes from 'prop-types';
import {
    alpha,
    ThemeProvider,
    withStyles,
    makeStyles,
    createTheme,
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

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function Analysis({ open, handleCloseAnalysis, mapLayer, setBuffered, visibleAnalysis, setVisibleAnalysis }) {
  
    const handleClose = () => {
        handleCloseAnalysis(false);
    };
    const [title, setTitle] = useState('title');
    const [analysis, setAnalysis] = useState(false);
    const [table, setTable] = useState(false);
    const [layer1, setLayer1] = useState(true);
    const [layer2, setLayer2] = useState(true);
    const [layer3, setLayer3] = useState(true);
    const [layer4, setLayer4] = useState(true);
    const [layer5, setLayer5] = useState(true);
    const [layer6, setLayer6] = useState(true);
    const [layer7, setLayer7] = useState(true);

    const urlCanopyTile = 'https://forests2020.ipb.ac.id/arcgis/rest/services/Ecosystem_CanopyCover/IndonesiaCanopyCover2018/MapServer'
    const urlPaddyTile = 'https://forests2020.ipb.ac.id/arcgis/rest/services/Ecosystem_CommodityDistribution/Paddy_Distribution_2019/MapServer'
    const urlCoffeeDistributionTile = 'https://forests2020.ipb.ac.id/arcgis/rest/services/Ecosystem_CommodityDistribution/Coffe_Distribution_2019/MapServer'
    const urlShake = 'https://gis.bmkg.go.id/arcgis/rest/services/Shakemap/Shakemap_20170424010111/MapServer'
    const urlForest = 'https://forests2020.ipb.ac.id/arcgis/rest/services/Ecosystem_Forest_KLHK/Primary_Swamp_Forest/MapServer'
    const oilPalm = 'https://forests2020.ipb.ac.id/arcgis/rest/services/UNDP/OilPalmAustin/MapServer'
    const alertDevegetation = 'https://forests2020.ipb.ac.id/arcgis/rest/services/Ecosystem_Devegetation/Devegetation_2019/MapServer'
    const tileRef = useRef();
    //<TileLayer ref={tileRef} url={urlBasemap} attribution={attribution} />

    const [map, setMap] = useState(null);
    /*
    const displayMap2 = useMemo(
        () => (
            <div id='map-thematic' />
        ),
        []
    )
            */

    useEffect(() => {
        init_map();
        //props.setTheme(false)
        const requestOptions = {
            method: 'GET'
        };
        /*
        fetch(urlCanopyTile + "/legend?f=json", requestOptions).then(res => res.json()).then(data => {
            //console.log(data)
            //console.log(data.layers)
            //console.log(data.layers[0])
            //console.log(data.layers[0].legend[0])
            //console.log('data:'+data.layers[0].legend[0].contentType+';base64,'+data.layers[0].legend[0].imageData)
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
                    div.append(div2)

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

    }, [])


    var tile = new XYZSource({
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        attributions: 'Tiles Imagery © <a target="_blank" href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer">ArcGIS</a>',
        crossOrigin: "Anonymous"
    });

    function init_map() {
        const peta = new Map({
            target: 'map-thematic',
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
            ],
            overlays: [],
            view: new View({
                center: fromLonLat([117, -1]),
                zoom: 5
            }),
            controls: defaultControls().extend([
                new Attribution({ collapsed: false }),
            ]),
        })
        /*
        tile.on('imageloadstart', function () {
            //progress.addLoading();
            alert('processing')
        });

        tile.on('imageloadend', function () {
            alert('loaded')
        });

        tile.on('imageloaderror', function () {
            alert('error')
        });
        */

        /*
        var wmsCanopySource = new XYZSource({
            url: urlCanopyTile + "/tile/{z}/{y}/{x}",
            crossOrigin: "Anonymous"
        });

        var canopyLayer = new TileLayer({
            source: wmsCanopySource,
        })

        peta.addLayer(canopyLayer)


        var wmsPaddySource = new XYZSource({
            url: urlPaddyTile + "/tile/{z}/{y}/{x}",
            crossOrigin: "Anonymous"
        });

        var paddyLayer = new TileLayer({
            source: wmsPaddySource,
        })
        peta.addLayer(paddyLayer)


        var wmsCoffeeSource = new XYZSource({
            url: urlCoffeeDistributionTile + "/tile/{z}/{y}/{x}",
            crossOrigin: "Anonymous"
        });

        var coffeeLayer = new TileLayer({
            source: wmsCoffeeSource,
        })
        peta.addLayer(coffeeLayer)

        /*
      var wmsThematic2Source = new TileArcGISRest({
          ratio: 1,
          params: {},
          url: urlThematicTile,
          crossOrigin: 'anonymous'
      })
      /
        var wmsShakeSource = new ImageArcGISRest({
            ratio: 1,
            params: {},
            url: urlShake,
            crossOrigin: 'anonymous'
        })

        var shakeLayer = new ImageLayer({
            source: wmsShakeSource,
        })
        peta.addLayer(shakeLayer)


        /*
        var wmsCoffeeSource = new ImageArcGISRest({
            ratio: 1,
            params: {},
            url: urlCoffee,
            crossOrigin: 'anonymous'
        })

        var coffeeLayer = new ImageLayer({
            source: wmsCoffeeSource,
        })

        peta.addLayer(coffeeLayer)
        /



        var wmsForestSource = new ImageArcGISRest({
            ratio: 1,
            params: {},
            url: urlForest,
            crossOrigin: 'anonymous'
        })

        var forestLayer = new ImageLayer({
            source: wmsForestSource,
        })
        peta.addLayer(forestLayer)


        var wmsOilSource = new ImageArcGISRest({
            ratio: 1,
            params: {},
            url: oilPalm,
            crossOrigin: 'anonymous'
        })

        var oilLayer = new ImageLayer({
            source: wmsOilSource,
        })
        peta.addLayer(oilLayer)

        var wmsDevegetationSource = new ImageArcGISRest({
            ratio: 1,
            params: {},
            url: alertDevegetation,
            crossOrigin: 'anonymous'
        })

        var devegetationLayer = new ImageLayer({
            source: wmsDevegetationSource,
        })
        peta.addLayer(devegetationLayer)
        */
        setMap(peta)
    }

    function openAnalysis(title) {
        setTitle(title)
        setAnalysis(true)
    }

    function openTable(title) {
        setTitle(title)
        setTable(true)
    }

    function showHide(id){
        //console.log(map.getLayers())
        var layers = map.getLayers().getArray()
        if(id == 1){
            setLayer1(!layers[id].getVisible())
        }
        if(id == 2){
            setLayer2(!layers[id].getVisible())
        }
        if(id == 3){
            setLayer3(!layers[id].getVisible())
        }
        if(id == 4){
            setLayer4(!layers[id].getVisible())
        }
        if(id == 5){
            setLayer5(!layers[id].getVisible())
        }
        if(id == 6){
            setLayer6(!layers[id].getVisible())
        }
        layers[id].setVisible(!layers[id].getVisible())
      
    }

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
            <DialogContent style={{ minHeight: "75vh", padding: '10px' }} >
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
                                            <IconButton color="primary" aria-label="upload picture" component="span"  onClick={() => showHide(1)} >
                                                <Visibility />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    
                                    <TableRow key="1">
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
                                            <IconButton color="primary" aria-label="upload picture" component="span" >
                                                <Visibility />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key="1">
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
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <Visibility />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key="1">
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
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <Visibility />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key="1">
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
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <Visibility />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key="1">
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
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <Visibility />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key="1">
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
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <Visibility />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </LeftContent>
                    <RightContent>
                    <div id='map-thematic' />
                    <p>Map</p>
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
  width: 50%;
  max-height: 70vh;
  overflow-y: scroll;
`;

const RightContent = styled.div`
  margin:0px;
  flex-grow:1;
  width: 50%;
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