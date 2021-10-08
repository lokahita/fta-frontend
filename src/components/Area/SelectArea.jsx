import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Tab, Tabs, TextField, Typography } from "@material-ui/core";
import styled from "styled-components";
import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { Close } from "@material-ui/icons";

import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { makeStyles } from '@material-ui/core/styles';
import Config from '../../config.json';

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
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


function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}



const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    show: {
        visibility: 'visible'
    },
    hide: {
        visibility: 'hidden',
        display: 'none'
    },
}));

export default function SelectArea({ open, handleCloseSelectArea, 
    labelArea, setLabelArea, setBoundary, setBbox, setZoomBbox,
    setVisibleBbox, setVisibleBoundary
    }) {

    const classes = useStyles();
    const [value, setValue] = useState(0);

    const [idContinent, setIdContinent] = useState(0);
    const [labelContinent, setLabelContinent] = useState('');
    const [idCountry, setIdCountry] = useState(0);
    const [labelCountry, setLabelCountry] = useState('');
    const [idRegion, setIdRegion] = useState(0);
    const [labelRegion, setLabelRegion] = useState('');
    const url_list_continent = Config.api_domain + "/continents/";
    const url_get_continent = Config.api_domain + "/continents/id/";
    const url_list_countries = Config.api_domain + "/countries/continent/";
    const url_get_country = Config.api_domain + "/countries/id/";
  
    const url_list_regions = Config.api_domain + "/regions/country/";
    const url_get_region = Config.api_domain + "/regions/id/";
    const url_search_region = Config.api_domain + "/regions/search/";
    const [listContinents, setListContinents] = useState();
    const [listCountries, setListCountries] = useState();
    const [listRegions, setListRegions] = useState();
    const [localLabelArea, setLocalLabelArea] = useState('Select Continent/Country/Region');

    const [data, setData] = useState();
    const [query, setQuery] = useState('');


    useEffect(() => {

        let mounted = true;

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        //
        fetch(url_list_continent, requestOptions).then(res => res.json()).then(data => {
            if (mounted) {
                //console.log(data);
                var dataset = [{ id: 0, name: "All Continents" }]
                //var dataset = []
                data.data.forEach(element => {
                    dataset.push(element);
                });
                //console.log(dataset)
                setListContinents(dataset);
            }
        });
      

        return function cleanup() {
            mounted = false;
        }
    }, []);

   

    function getContinents() {
        if (typeof (listContinents) !== 'undefined') {
            //var items=props.presensiDataLast.data;
            if (listContinents !== null) {
                if (listContinents.length > 0) {
                    return listContinents.map((row, index) => {
                        //console.log(row.id, index)
                        return (<MenuItem key={index} value={row.id}>
                            {row.name}
                        </MenuItem>
                        )
                    })
                }
            } else {
                return null
            }
        } else {
            return null
        }
    }
    function getCountries() {
        if (typeof (listCountries) !== 'undefined') {
            //var items=props.presensiDataLast.data;
            if (listCountries !== null) {
                if (listCountries.length > 0) {
                    return listCountries.map((row, index) => {
                        //console.log(row.id, index)
                        return (<MenuItem key={index} value={row.id}>
                            {row.name}
                        </MenuItem>
                        )
                    })
                }
            } else {
                return null
            }
        } else {
            return null
        }
    }


    function getRegions() {
        if (typeof (listRegions) !== 'undefined') {
            //var items=props.presensiDataLast.data;
            if (listRegions !== null) {
                if (listRegions.length > 0) {
                    return listRegions.map((row, index) => {
                        //console.log(row.id, index)
                        return (<MenuItem key={index} value={row.id}>
                            {row.name}
                        </MenuItem>
                        )
                    })
                }
            } else {
                return null
            }
        } else {
            return null
        }
    }
    const handleChangeContinents = (event) => { 
        setIdContinent(event.target.value)
        var raw = listContinents.filter(x => x.id === event.target.value)
        //console.log(event.target.value);

        setLabelContinent(raw[0].name);

        if (event.target.value === 0) {
            setLocalLabelArea("Select Continent/Country/Region")
            setListCountries([{ id: 0, name: 'All Countries' }])
        } else {
            setIdCountry(0);
            setLocalLabelArea(raw[0].name)
            load_countries(event.target.value)
        }

    }
    const handleChangeCountries = (event) => { 
        setIdCountry(event.target.value);
        
        var raw = listCountries.filter(x => x.id === event.target.value)
        //console.log(event.target.value);

        setLabelCountry(raw[0].name);

        if (event.target.value === 0) {
            setLocalLabelArea(labelContinent)
            setListRegions([{ id: 0, name: 'All Regions' }])
        } else {
            //alert ('Generate Regions')
            setIdRegion(0);
            setLocalLabelArea(labelContinent+ "/" + raw[0].name)
            load_regions(event.target.value)
        }

    }

    const handleChangeRegion = (event) => {

        setIdRegion(event.target.value);
        var raw = listRegions.filter(x => x.id === event.target.value)
        //console.log(event.target.value);

        if (event.target.value === 0) {
            setLocalLabelArea(labelContinent+ "/" + labelCountry )
        } else {
            //alert ('Generate Regions')
            setLocalLabelArea(labelContinent + "/" + labelCountry + "/" + raw[0].name)
        }

    };

  
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

   

    function load_countries(id) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(url_list_countries + id, requestOptions).then(res => res.json()).then(data => {
            //console.log(data.data);
            var dataset = [{ id: 0, name: "All Countries" }]
            data.data.forEach(element => {
                dataset.push(element);
            });
            //console.log(dataset)
            setListCountries(dataset);
        });
    }

    function load_regions(id) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(url_list_regions + id, requestOptions).then(res => res.json()).then(data => {
            //console.log(data.data);
            var dataset = [{ id: 0, name: "All Regions" }]
            data.data.forEach(element => {
                dataset.push(element);
            });
            //console.log(dataset)
            setListRegions(dataset);
        });
    }

   
    const handleClose = () => {
        handleCloseSelectArea(false);
    };

    function handlingRefine() {
        //alert('oke')
        if (idContinent > 0) {
            if (idCountry > 0) {
                if (idRegion > 0) {
                    const requestOptions = {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' }
                    };

                    //props.setShowArea(true)
                    fetch(url_get_region + idRegion, requestOptions).then(res => res.json()).then(data => {

                        if (data.status === "ok") {
                            //console.log(data.message);
                            setLabelArea(localLabelArea);
                            var bbox = JSON.parse(data.message.bbox);
                            var geom = JSON.parse(data.message.geom);

                            //console.log(bbox.coordinates[0][0][0])
                            var center = JSON.parse(data.message.center);
                            console.log(center.coordinates)
                            setBbox([bbox.coordinates[0][0][0], bbox.coordinates[0][0][1], bbox.coordinates[0][2][0], bbox.coordinates[0][2][1]])
                            //props.setBboxLabel('[' + bbox.coordinates[0][0][0].toFixed(2) + ', ' + bbox.coordinates[0][0][1].toFixed(2) + ', ' + bbox.coordinates[0][2][0].toFixed(2) + ', ' + bbox.coordinates[0][2][1].toFixed(2) + ']')
                            setBoundary(geom)
                            setZoomBbox(true)
                            setVisibleBoundary(true)
                            setVisibleBbox(true)
                            //props.setBboxGeom([center, geom, 2]);


                        }

                    });
                } else {
                    const requestOptions = {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' }
                    };

                    //alert('aaa')
                    //props.setShowArea(true)
                    fetch(url_get_country + idCountry, requestOptions).then(res => res.json()).then(data => {
                        if (data.status === "ok") {
                            //console.log(data.message);
                            //props.setAreaName(areaLabel)
                            setLabelArea(localLabelArea);
                            var bbox = JSON.parse(data.message.bbox);
                            var center = JSON.parse(data.message.center);

                            var geom = JSON.parse(data.message.geom);
                            //console.log(bbox.coordinates[0][0][0])
                            setBbox([bbox.coordinates[0][0][0], bbox.coordinates[0][0][1], bbox.coordinates[0][2][0], bbox.coordinates[0][2][1]])
                            //props.setBboxLabel('[' + bbox.coordinates[0][0][0].toFixed(2) + ', ' + bbox.coordinates[0][0][1].toFixed(2) + ', ' + bbox.coordinates[0][2][0].toFixed(2) + ', ' + bbox.coordinates[0][2][1].toFixed(2) + ']')
                            setBoundary(geom)
                            setZoomBbox(true)
                            setVisibleBoundary(true)
                            setVisibleBbox(true)
                            //props.setPerformZoom(true)
                            //props.setBboxGeom([center, geom, 1]);
                        }

                    });

                }
            } else {
                /*
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                };

                //alert('aaa')
                //props.setShowArea(true)
                fetch(url_get_continent + idContinent, requestOptions).then(res => res.json()).then(data => {
                    if (data.status === "ok") {
                        //console.log(data.message);
                        //props.setAreaName(areaLabel)
                        setLabelArea(localLabelArea);
                        var bbox = JSON.parse(data.message.bbox);
                        var center = JSON.parse(data.message.center);

                        var geom = JSON.parse(data.message.geom);
                        //console.log(bbox.coordinates[0][0][0])

                        setBbox([bbox.coordinates[0][0][0], bbox.coordinates[0][0][1], bbox.coordinates[0][2][0], bbox.coordinates[0][2][1]])
                        //props.setBboxLabel('[' + bbox.coordinates[0][0][0].toFixed(2) + ', ' + bbox.coordinates[0][0][1].toFixed(2) + ', ' + bbox.coordinates[0][2][0].toFixed(2) + ', ' + bbox.coordinates[0][2][1].toFixed(2) + ']')
                        setBoundary(geom)
                        setZoomBbox(true)
                        setVisibleBoundary(true)
                        setVisibleBbox(true)
                        //props.setPerformZoom(true)
                        //props.setBboxGeom([center, geom, 1]);
                    }

                });
                */ 
               alert('Please select a country')
            }
        } else {
            setLabelArea("All Continents")
            setBbox([-133044556.24688484, -20037508.342789244, 133044555.79934952, 20037508.342789244])
            setZoomBbox(true)
            setVisibleBoundary(true)
            setVisibleBbox(true)
            //props.setBboxLabel('[-133044556.25, -20037508.34, 133044555.80, 20037508.35]');
            //props.setCountry()
            //props.setPerformZoom(true)
            //props.setBboxGeom([{ type: "Point", coordinates: [60, -2] }, { type: "Polygon", coordinates: [[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]] }, 0]);
        }
    }

    function handleSearch(event) {
        //console.log(key);
        let key = event.target.value;

        setQuery(key);
        if (key.length < 2) {
            setData();
        } else {
            //alert('cari')
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };
            fetch(url_search_region + key, requestOptions).then(res => res.json()).then(data => {
                setData(data.data)
                //console.log(data.data)
            });
        }
    }

    function getRowsData() {
        if (typeof (data) !== 'undefined') {
            //var items=props.presensiDataLast.data;
            if (data !== null) {
                if (data.length > 0) {
                    return data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell><Button size="small" variant="contained" color="primary" onClick={() => handlingRefineSearch(row)}>Select</Button></TableCell>
                        </TableRow>
                    ))
                }
            } else {
                return null
            }
        } else {
            return null
        }
    }

    function handlingRefineSearch(row) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        //props.setShowArea(true)
        fetch(url_get_region + row.id, requestOptions).then(res => res.json()).then(data => {
            if (data.status === "ok") {
                //console.log(data.message);
                //props.setAreaName(row.name)
                setLabelArea(row.name)
                var bbox = JSON.parse(data.message.bbox);
                var geom = JSON.parse(data.message.geom);
                //console.log(bbox.coordinates[0][0][0])
                var center = JSON.parse(data.message.center);
                //console.log(center.coordinates)
                setBbox([bbox.coordinates[0][0][0], bbox.coordinates[0][0][1], bbox.coordinates[0][2][0], bbox.coordinates[0][2][1]])
                //props.setBboxLabel('[' + bbox.coordinates[0][0][0].toFixed(2) + ', ' + bbox.coordinates[0][0][1].toFixed(2) + ', ' + bbox.coordinates[0][2][0].toFixed(2) + ', ' + bbox.coordinates[0][2][1].toFixed(2) + ']')
                setBoundary(geom)
                setZoomBbox(true)
                setVisibleBoundary(true)
                setVisibleBbox(true)
                //props.setBboxGeom([center, geom, 2]);


            }

        });
    }



    return (
        <Dialog
            open={open}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
            fullWidth={true}
            maxWidth="xs"
        >
            <DialogTitle style={{ cursor: 'move', padding: '5px 10px', backgroundColor: '#f3f3f3' }} id="draggable-dialog-title">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h5 style={{ margin: '0px' }}>Define Study Area</h5>
                    <IconButton size="small" onClick={handleClose} >
                        <Close />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent style={{ minHeight: "55vh", padding: '0px' }} >
                <Paper square>
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        aria-label="select and search area study"
                        variant="fullWidth"
                    >
                        <Tab label="Select" {...a11yProps(0)} />
                        <Tab label="Search" {...a11yProps(1)} />
                    </Tabs>
                </Paper>
                <TabPanel value={value} index={0}  >
                    <h3 style={{ margin: '0px 0px 15px 0px', textAlign: 'center' }}>{localLabelArea}</h3>
                    <FormControl fullWidth style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', minHeight: "35vh" }}>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Continent"
                            value={idContinent}
                            onChange={handleChangeContinents}
                            variant="outlined"
                            size="small"
                        >
                            {
                                getContinents()
                            }
                        </TextField>
                        <TextField
                            id="outlined-select-province"
                            select
                            label="Country"
                            value={idCountry}
                            onChange={handleChangeCountries}
                            variant="outlined"
                            size="small"
                            className={idContinent > 0 ? classes.show : classes.hide}
                        >
                            {
                                getCountries()
                            }
                        </TextField>
                        <TextField
                            id="outlined-select-municipal"
                            select
                            label="Region"
                            value={idRegion}
                            onChange={handleChangeRegion}
                            variant="outlined"
                            size="small"
                            className={idContinent > 0 && idCountry > 0 ? classes.show : classes.hide}
                        >
                            {
                                getRegions()
                            }
                        </TextField>
                        <Button variant="contained" fullWidth color="primary" onClick={handlingRefine}>Refine Area</Button>
                        <Button variant="contained" fullWidth color="secondary" onClick={handleClose}>Cancel</Button>
                    </FormControl>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <FormControl fullWidth style={{ marginBottom: "10px" }}>
                        <TextField
                            id="outlined-select-currency"
                            label="Type Area Name"
                            defaultValue={query}
                            onChange={handleSearch}
                            size="small"
                            variant="outlined"
                            autoComplete="off"
                        />
                    </FormControl>
                    <TableContainer>
                        <Table size="small" aria-label="a dense table">
                            <TableHead color="#ddd">
                                <TableRow>
                                    <TableCell>Id </TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {
                                    getRowsData()
                                }
                                {
                                    /*
                                    rows.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.obj}</TableCell>
                                    </TableRow>
                                ))
                                */
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
            </DialogContent>

        </Dialog>
    )
}
/*

 <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>

            */