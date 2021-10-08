import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputBase, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import styled from "styled-components";
import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { Close } from "@material-ui/icons";
import no_thumb from "./no_preview.png"
import {
    alpha,
    ThemeProvider,
    withStyles,
    makeStyles,
    createTheme,
} from '@material-ui/core/styles';

import Config from '../../config.json';

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}


const newDataStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
    },
    wrapper: {
        display: "flex",
        //justifyContent: "space-between", 
        //alignItems: "left",
    },
    form: {
        flex: 1,
        margin: "10px",
        padding: "10px",
        boxShadow: "0px 0px 10px -1px rgba(0,0,0,0.35)",
        //-webkit-box-shadow: 0px 0px 10px -1px rgba(0,0,0,0.35);
        //-moz-box-shadow: 0px 0px 10px -1px rgba(0,0,0,0.35);
    },
    right: {
        flex: 1,
        padding: "10px"
    },
    title: {
        color: "#555",
        backgroundColor: "#eee",
        padding: "5px 10px",
        borderRadius: "10px",
        marginBottom: theme.spacing(1)
    },
    input: {
        marginBottom: theme.spacing(1)
    },
    cancel: {
        marginRight: theme.spacing(1),
    },
    bottom: {
        marginTop: theme.spacing(2)
    },
    list: {
        marginTop: theme.spacing(2),
    },

}));


export default function BrowseData({ open, handleCloseBrowseData, setSelectArea, labelArea, dataAll, setMapLayer }) {
    const classes = newDataStyles();

    const url_list_organizations = Config.api_domain + "/organizations/";
    const url_list_themes = Config.api_domain + "/themes/";
    const url_list_year = Config.api_domain + "/query/year/";
    const url_list_keywords = Config.api_domain + "/keywords/";

    const [idCountry, setIdCountry] = useState('');
    const [data, setData] = useState();
    const [dataAttribute, setDataAttribute] = useState();

    const [numberData, setNumberData] = useState(0);
    const [title, setTitle] = useState();
    const [identifier, setIdentifier] = useState();
    const [abstract, setAbstract] = useState();
    const [type, setType] = useState();
    const [organization, setOrganization] = useState();
    const [subjects, setSubjects] = useState();

    const [idTheme, setIdTheme] = useState(0);
    const [listThemes, setListThemes] = useState();

    const [idOrganization, setIdOrganization] = useState(0);
    const [listOrganizations, setListOrganizations] = useState();

    const [idYear, setIdYear] = useState('All');
    const [listYears, setListYears] = useState();

    const [idKeywords, setIdKeywords] = useState(0);
    const [listKeywords, setListKeywords] = useState();

    const [idFlagship, setIdFlagship] = useState(0);
    const [listFlagship, setListFlagship] = useState();

    const [query, setQuery] = useState("");
    const [urlWMS, setUrlWMS] = useState();
    const [layerWMS, setLayerWMS] = useState();
    const [layerOriginal, setLayerOriginal] = useState();
    const [layerPdf, setLayerPdf] = useState();
    const [layerKML, setLayerKML] = useState();
    const [layerGML, setLayerGML] = useState();
    const [layerSHP, setLayerSHP] = useState();
    const [layerCSV, setLayerCSV] = useState();
    const [layerExcel, setLayerExcel] = useState();
    const [layerGeojson, setLayerGeojson] = useState();

    const [metadata, setMetadata] = useState({
        title: 'title',
        abstract: 'abstract',
        identifier: 'identifier',
        type: 'type',
        organization: 'organization',
        subjects: null,
    });

    const [layerName, setLayerName] = useState("");
    const [urlThumb, setUrlThumb] = useState(no_thumb);
    const [server, setServer] = useState("geoserver");

    function setDataAktif(e, row) {
        //alert(id)
        //var list = document.getElementsByClassName("label-menu");
        //console.log(e, row)
        var aktif = document.getElementsByClassName("bgKuning");
        if (aktif.length > 0) {
            if (!aktif[0].classList.contains("data"))
                aktif[0].classList.add("data");
            aktif[0].classList.remove("bgKuning");
        }
        if (e !== null) {
            if (e.target.parentNode.classList.contains("data"))
                e.target.parentNode.classList.remove("data")
            e.target.parentNode.classList.add("bgKuning");
        }

        load_aktif(row)
    }

    const handleClose = () => {
        handleCloseBrowseData(false);
    };


    function addAndGo() {
        handleCloseBrowseData(false);
        setMapLayer(oldArray => [...oldArray, { id: identifier, title: layerName, server: server, tipe: 'wms', url: urlWMS, geom:'', layer: layerWMS, metadata: true, table: layerGeojson ? true : false, visible: true, opacity: 1 }])
    }

    function addAndKeep() {
        setMapLayer(oldArray => [...oldArray, { id: identifier, title: layerName, server: server, tipe: 'wms', url: urlWMS, geom:'', layer: layerWMS, metadata: true, table: layerGeojson ? true : false, visible: true, opacity: 1 }])
    }

    const handleChangeTheme = (event) => {
        setIdTheme(event.target.value);
        //console.log(e.target.value);
        setIdOrganization(0);
        setIdYear('All');
        setIdKeywords(0);
        setIdFlagship(0)
        setQuery("")
        if (event.target.value === "0") {
            setData(dataAll);//.slice(0, 10));
            setNumberData(dataAll.length);
            setDataAktif(null, dataAll.slice(0, 1)[0])
        } else {
            //console.log(e.target);
            var raw = listThemes.filter(x => x.id === event.target.value)
            load_theme(raw[0].name)
        }
    };

    function load_theme(key) {
        //console.log(dataAll, ' ', key);

        //var result = data.filter(p => {
        //console.log(data);
        //console.log(key)
        //var result = dataAll.filter(p => p.organizations.id === id);
        var result;
        if (key === 0 || key === "All") {
            result = dataAll;
        } else {
            result = dataAll.filter(p => p.keywords.toLowerCase().includes(key.toLowerCase()));
        }

        setData(result);//.slice(0, 10));
        setNumberData(result.length);

        if (result.length > 0) {
            setDataAktif(null, result.slice(0, 1)[0])
        } else {
            emptyDataset();
        }

    }


    const handleChangeOrganization = (event) => {
        setIdOrganization(event.target.value);
        setIdYear('All');
        setIdKeywords(0);
        setIdFlagship(0)
        setQuery("")
        if (event.target.value === "0" ) {
            load_theme(idTheme)
        } else {
            load_organizations(event.target.value)
        }
    };

    function load_organizations(id) {
        //console.log(data);

        //var result = data.filter(p => {
        //console.log(data);
        var themes;
        if (idTheme === 0 ) {
            themes = dataAll;
        } else {
            //alert(idTheme)
            var raw = listThemes.filter(x => x.id === idTheme)
            var key = raw[0].name
            themes = dataAll.filter(p => p.keywords.toLowerCase().includes(key.toLowerCase()));
        }

       
        var result
        if (id === 0 || id === "All") {
            result = themes;
        } else {
            console.log(id)
            result = themes.filter(p => p.organizations.id === parseInt(id));
        }


        setData(result);//.slice(0, 10));
        setNumberData(result.length);

        if (result.length > 0) {
            setDataAktif(null, result.slice(0, 1)[0])
        } else {
            emptyDataset();
        }
    }

    const handleChangeYear = (event) => {
        setIdYear(event.target.value);
        setIdKeywords(0);
        setQuery("")
        if (event.target.value === "All") {
        
            load_organizations(idOrganization)
        } else {
            load_years(event.target.value)
        }

    };


    const handleChangeKeywords = (event) => {
        setIdKeywords(event.target.value);
        setQuery("")
        if (event.target.value === "All") {
            //console.log(data)
            //setData(dataAll);//.slice(0, 10));
            //setNumberData(dataAll.length);
            //setDataAktif(null, dataAll.slice(0, 1)[0])
            //var themes = dataAll.filter(p => p.keywords.toLowerCase().includes(idTheme.toLowerCase()));
            //var organizations = themes.filter(p => p.organizations.id === parseInt(idOrganization));
            load_years(idYear)
        } else {
            var raw = listKeywords.filter(x => x.id === event.target.value)
            load_keywords(raw[0].name)
        }
    };
    function validateForm() {
        return true;// !loading && selectedFile && selectedFile.length > 0 && shapeFile && name;
    }

    function createData(id, title, modified) {
        return { id, title, modified };
    }

    function createAttr(id, name, type) {
        return { id, name, type };
    }

  

    const BootstrapInput = withStyles((theme) => ({
        root: {
            'label + &': {
                marginTop: theme.spacing(3),
            },
        },
        input: {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.common.white,
            border: '1px solid #ced4da',
            fontSize: 16,
            width: 'auto',
            flexGrow: 1,
            padding: '5px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:focus': {
                boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
                borderColor: theme.palette.primary.main,
            },
        },
    }))(InputBase);

    useEffect(() => {
        if (dataAll) {
            setData(dataAll)
            setNumberData(dataAll.length);
            //console.log(dataAll)
            setDataAktif(null, dataAll?.slice(0, 1)[0])
        }
    }, [dataAll])



    useEffect(() => {

        let mounted = true;
        let mounted2 = true;
        let mounted3 = true;
        let mounted4 = true;
        let mounted5 = true;

        var flagship = [{ id: 0, name: "All" }, { id: 1, name: "Yes" }, { id: 2, name: "No" }]
        //console.log(dataset)
        setListFlagship(flagship);

        const requestOptions = {
            method: 'GET'
        };

        fetch(url_list_organizations, requestOptions).then(res => res.json()).then(data => {
            if (mounted2) {
                //console.log(data.data);
                var dataset = [{ id: 0, name: "All" }]
                data.data.forEach(element => {
                    dataset.push(element);
                });
                //console.log(dataset)
                setListOrganizations(dataset);
            }
        });

        fetch(url_list_themes, requestOptions).then(res => res.json()).then(data => {
            if (mounted3) {
                //console.log(data.data);
                var dataset = [{ id: 0, name: "All" }]
                data.data.forEach(element => {
                    dataset.push(element);
                });
                //console.log(dataset)
                setListThemes(dataset);
            }
        });

        fetch(url_list_year, requestOptions).then(res => res.json()).then(data => {
            if (mounted4) {
                //console.log(data.data);
                var dataset = [{ year: "All" }]
                data.data.forEach(element => {
                    dataset.push(element);
                });
                //console.log(dataset)
                setListYears(dataset);
            }
        });

        fetch(url_list_keywords, requestOptions).then(res => res.json()).then(data => {
            if (mounted5) {
                //console.log(data.data);
                var dataset = [{ id: 0, name: "All" }]
                data.data.forEach(element => {
                    dataset.push(element);
                });
                //console.log(dataset)
                setListKeywords(dataset);
            }
        });


        return function cleanup() {
            //mounted = false;
            mounted2 = false;
            mounted3 = false;
            mounted4 = false;
            mounted5 = false;
        }

    }, []);

    function getTheme() {
        if (typeof (listThemes) !== 'undefined') {
            //var items=props.presensiDataLast.data;
            if (listThemes !== null) {
                if (listThemes.length > 0) {
                    return listThemes.map((row, index) => {
                        //console.log(row.id, index)

                        return (<MenuItem key={index} value={row.id}>
                            {row.name}
                        </MenuItem>)
                    })
                }
            } else {
                return <option></option>
            }
        } else {
            return <option></option>
        }
    }
    function getOrganizations() {
        if (typeof (listOrganizations) !== 'undefined') {
            //var items=props.presensiDataLast.data;
            if (listOrganizations !== null) {
                if (listOrganizations.length > 0) {
                    return listOrganizations.map((row, index) => {
                        //console.log(row.id, index)

                        return (<MenuItem key={index} value={row.id}>
                            {row.name}
                        </MenuItem>)
                    })
                }
            } else {
                return <option></option>
            }
        } else {
            return <option></option>
        }
    }

    function getYears() {
        if (typeof (listYears) !== 'undefined') {
            //var items=props.presensiDataLast.data;
            if (listYears !== null) {
                if (listYears.length > 0) {
                    return listYears.map((row, index) => {
                        //console.log(row.id, index)

                        return (<MenuItem key={index} value={row.year}>
                            {row.year}
                        </MenuItem>)
                    })
                }
            } else {
                return <option></option>
            }
        } else {
            return <option></option>
        }
    }


    function getKeywords() {
        if (typeof (listKeywords) !== 'undefined') {
            //var items=props.presensiDataLast.data;
            if (listKeywords !== null) {
                if (listKeywords.length > 0) {
                    return listKeywords.map((row, index) => {
                        //console.log(row.id, index)

                        return (<MenuItem key={index} value={row.id}>
                            {row.name}
                        </MenuItem>)
                    })
                }
            } else {
                return <option></option>
            }
        } else {
            return <option></option>
        }
    }

    
    function getFlagship() {
        if (typeof (listFlagship) !== 'undefined') {
            //var items=props.presensiDataLast.data;
            if (listFlagship !== null) {
                if (listFlagship.length > 0) {
                    return listFlagship.map((row, index) => {
                        //console.log(row.id, index)

                        return (<MenuItem key={index} value={row.id}>
                            {row.name}
                        </MenuItem>)
                    })
                }
            } else {
                return <option></option>
            }
        } else {
            return <option></option>
        }
    }

    function getRowsData() {
        if (typeof (data) !== 'undefined') {
            //var items=props.presensiDataLast.data;
            if (data !== null) {

                if (data.length > 0) {

                    return data.map((row, index) => {
                        //console.log(row)
                        /*
                         if (index === 0)
                             return <Row key={index} className="mx-0 border-bottom bg-kuning font-11" onClick={(e) => setDataAktif(e, row)}><Col xs={8} className="px-1 breaking ">{row.title}</Col><Col xs={4} className="px-2">{row.publication_date}</Col></Row>
                         else
                             return <Row key={index} className="mx-0 border-bottom font-11" onClick={(e) => setDataAktif(e, row)}><Col xs={8} className="px-1 breaking">{row.title}</Col><Col xs={4} className="px-2">{row.publication_date}</Col></Row>
                         */
                        ///cr = cr + 1
                        //return <tr><td className="p-2">{cr}</td><td className="p-2">{row.name}</td><td className="p-2">{row.sj}</td><td className="p-2">{row.kategori}</td><td className="p-2">{row.katalog}</td><td className="p-2 pointer"> <FileEarmarkText size={14} onClick={() => showMetadata(row)} className="mr-2" /> {' '} {row.viewable === 'true' ? <Eye onClick={() => showView(row)} className="mr-2" size={14} /> : ""} {' '} {row.downloadable === 'true' ? <Download size={12}  onClick={() => showDownload(row)} /> : ""}  </td></tr>
                        if (index === 0) {
                            return (
                                <TableRow key={row.id} className="bgKuning"  onClick={(e) => setDataAktif(e, row)}>
                                    <TableCell style={{fontSize:'11px'}}>{row.title}</TableCell>
                                    <TableCell style={{fontSize:'11px'}}>{row.publication_date}</TableCell>
                                </TableRow>
                            )
                        } else {
                            return (<TableRow key={row.id} className="data"  onClick={(e) => setDataAktif(e, row)}>
                                <TableCell style={{fontSize:'11px'}}>{row.title}</TableCell>
                                <TableCell style={{fontSize:'11px'}}>{row.publication_date.replace("T", " ")}</TableCell>
                            </TableRow>
                            )
                        }

                    })
                } else {
                    return null
                }
            } else {
                return null
            }
        } else {
            return null
        }
    }

    function emptyDataset() {
        /*
        setIdentifier("");
        setTitle("");
        setAbstract("");
        setLayerName("");
        setType("");
        setUrlThumb(no_thumb);
        setSubjects("");
        setOrganization("");
        */
    }

    function load_years(val) {
        //console.log(data);

        //var result = data.filter(p => {
        //console.log(data);
        var organizations;


        if (idOrganization === 0) {
            organizations = dataAll;
        } else {
            organizations = dataAll.filter(p => p.organizations.id === parseInt(idOrganization));
        }

        //var result = themes.filter(p => p.organizations.id === parseInt(id));
        var result;
        //console.log(organizations[0]);
        if (val === "All") {
            result = organizations;
        } else {
            console.log(val)
            result = organizations.filter(p => parseInt(p.publication_date.substring(0, 4)) === val);
        }

        setData(result);//.slice(0, 10));
        setNumberData(result.length);

        if (result.length > 0) {
            setDataAktif(null, result.slice(0, 1)[0])
        } else {
            emptyDataset();
        }
    }

    function load_keywords(val) {
        var organizations;
        var years;


        if (idOrganization === 0) {
            organizations = dataAll;
        } else {
            organizations = dataAll.filter(p => p.organizations.id === parseInt(idOrganization));
        }

        if (idYear === "All") {
            years = organizations;
        } else {
            //onsole.log(val)
            years = organizations.filter(p => parseInt(p.publication_date.substring(0, 4)) === idYear);
        }


        //var result = themes.filter(p => p.organizations.id === parseInt(id));
        var result;
        // console.log(organizations[0]);
        if (val === "All") {
            result = years;
        } else {
            //console.log(val)
            result = years.filter(p => p.keywords.toLowerCase().includes(val.toLowerCase()));
        }

        setData(result);//.slice(0, 10));
        setNumberData(result.length);
       
        if (result.length > 0) {
            setDataAktif(null, result.slice(0, 1)[0])
        } else {
            emptyDataset();
        }
    }

    function handleSearch(event) {
        setQuery(event.target.value)
        /*
        if (key.length < 2) {
            //console.log(data)
            //setData(dataAll);//.slice(0, 10));
            //setNumberData(dataAll.length);
            //setDataAktif(null, dataAll.slice(0, 1)[0])
            //var themes = dataAll.filter(p => p.keywords.toLowerCase().includes(idTheme.toLowerCase()));
            //var organizations = themes.filter(p => p.organizations.id === parseInt(idOrganization));
            //
            //var raw = listKeywords.filter(x => x.id ===idKeywords)
            //console.log(raw[0].name)
            //load_keywords(raw[0].name)
            //if (idKeywords === 0){
//
 //           }
   //         else{
     //           var raw = listKeywords.filter(x => x.id ===idKeywords)
       //         load_keywords(raw[0].name)
        //    }
            
            //load_keywords(raw[0].name)
        } else {
            //alert(key)

        }*/

    }
    function handleSearch2(key) {
        // console.log(key);

        /*
        if (key.length < 2) {
            //alert('cari')
            //setData(dataAll);
            //setNumberData(dataAll.length);
            alert('key: ' + key)
            var organizations;
            var years;
            var keywords;


            if (idOrganization === 0) {
                organizations = dataAll;
            } else {
                organizations = dataAll.filter(p => p.organizations.id === parseInt(idOrganization));
            }

            if (idYear === "All") {
                years = organizations;
            } else {
                //onsole.log(val)
                years = organizations.filter(p => parseInt(p.publication_date.substring(0, 4)) === idYear);
            }

            // console.log(organizations[0]);



            if (idKeywords === "All") {
                keywords = years;
            } else {
                var raw = listKeywords.filter(x => x.id === idKeywords)
                keywords = years.filter(p => p.keywords.toLowerCase().includes(raw[0].name.toLowerCase()));
            }

            var result = keywords;

            setData(result);//.slice(0, 10));
            setNumberData(result.length);
        } else {
        */
        if (key.length > 2) {
            var organizations;
            var years;
            var keywords;


            if (idOrganization === 0) {
                organizations = dataAll;
            } else {
                organizations = dataAll.filter(p => p.organizations.id === parseInt(idOrganization));
            }

            if (idYear === "All") {
                years = organizations;
            } else {
                //onsole.log(val)
                years = organizations.filter(p => parseInt(p.publication_date.substring(0, 4)) === idYear);
            }

            // console.log(organizations[0]);
            if (idKeywords === "All") {
                keywords = years;
            } else {
                var raw = listKeywords.filter(x => x.id === idKeywords)
                keywords = years.filter(p => p.keywords.toLowerCase().includes(raw[0].name.toLowerCase()));
            }


            var result = keywords;
            var resultQ = result.filter(p => p.title.toLowerCase().includes(key.toLowerCase()));

            setData(resultQ);//.slice(0, 10));
            setNumberData(resultQ.length);

            if (resultQ.length > 0) {
                setDataAktif(null, resultQ.slice(0, 1)[0])
            } else {
                emptyDataset();
            }


        }
        setQuery(key);
    }

    function doSearch() {
        // console.log(key);
        var q = document.getElementById('q');

        var key = q.value;


        var organizations;
        var years;
        var keywords;


        if (idOrganization === 0) {
            organizations = dataAll;
        } else {
            organizations = dataAll.filter(p => p.organizations.id === parseInt(idOrganization));
        }


        if (idYear === "All") {
            years = organizations;
        } else {
            //onsole.log(val)
            years = organizations.filter(p => parseInt(p.publication_date.substring(0, 4)) === idYear);
        }
        // console.log(organizations[0]);
        if (idKeywords === 0) {
            keywords = years;
        } else {
            var raw = listKeywords.filter(x => x.id === idKeywords)
            keywords = years.filter(p => p.keywords.toLowerCase().includes(raw[0].name.toLowerCase()));
        }

        console.log(keywords);
        var result = keywords;
        var resultQ = result.filter(p => p.title.toLowerCase().includes(key.toLowerCase()));

        setData(resultQ);//.slice(0, 10));
        setNumberData(resultQ.length);

        if (resultQ.length > 0) {
            setDataAktif(null, resultQ.slice(0, 1)[0])
        } else {
            emptyDataset();
        }

    }

    function load_aktif(row) {
        if (row) {
            // console.log(row.keywords)
            setMetadata({
                title: row.title,
                abstract: row.abstract,
                identifier: row.identifier,
                type: row.data_type,
                organization: row.organizations.name,
                subjects: row.keywords,
            })

            setIdentifier(row.identifier);

            setLayerName(row.title);

            //console.log(row.references);

            var json_obj = JSON.parse(row.distributions);

            var download_scheme = json_obj.filter(p => p.protocol === 'WWW:DOWNLOAD-1.0-http--download')
            var thumbs = download_scheme.filter(x => x.url.toLowerCase().includes('thumbs'));            
            var original = download_scheme.filter(x => x.url.toLowerCase().includes('download'))
            var reflects = download_scheme.filter(x => x.url.toLowerCase().includes('reflect'));
            //console.log(download_scheme)
            //console.log(thumbs)
            console.log(reflects)

            if(thumbs.length > 0) {
                setUrlThumb(thumbs[0].url);
                //console.log(thumbs[0].url)
            }else{
                setUrlThumb(no_thumb);
            }
            var main;
            var layer;
            if(reflects.length>0){
                //console.log(reflects[0].url)
                var part = reflects[0].url.split("?")
                main = part[0].replace("wms/reflect","")
                layer = part[1].split("&")[0].replace("layers=","")
                //wfs_url = reflects[0].url
                //console.log(main)
                //console.log(layer)
                load_info_attribute(main+"wfs?", layer);
            }else{
                setDataAttribute()
            }
            var getmap = download_scheme.filter(x => x.url.toLowerCase().includes('getmap'));
            var getfeature = download_scheme.filter(x => x.url.toLowerCase().includes('getfeature'));

            var jpeg = getmap.filter(x => x.url.toLowerCase().includes('jpeg'))
            var png = getmap.filter(x => x.url.toLowerCase().includes('png'))

            var raw = original.filter(x => !x.url.toLowerCase().includes('kml'))
            console.log(raw)
            console.log(original)
            if (raw.length > 0) {
                //original dataset
                var url_domain = raw[0].url.replace("91.225.61.58", "landscapeportal.org");
                url_domain = url_domain.replace("91.225.62.74", "landscapeportal.org");
                setLayerOriginal(url_domain);
            } else {
                setLayerOriginal("")
            }

            if (getmap.length > 0) {
                //jpeg

                if (jpeg.length > 0) {
                    var url_domain = jpeg[0].url.replace("91.225.61.58", "landscapeportal.org");
                    url_domain = url_domain.replace("91.225.62.74", "landscapeportal.org");
                    var main = url_domain.split("?")[0]
                    console.log(main)
                    var layer = url_domain.split("?")[1].split("&");
                    console.log(layer)
                    var id = layer.filter(x => x.toLowerCase().includes('layers='))[0].replace("layers=", "")
                    console.log(id)
                    setUrlWMS(main);
                    setLayerWMS(unescape(id));
                } else if (png.length > 0) {
                    var url_domain = png[0].url.replace("91.225.61.58", "landscapeportal.org");
                    url_domain = url_domain.replace("91.225.62.74", "landscapeportal.org");
                    var main = url_domain.split("?")[0]
                    console.log(main)
                    var layer = url_domain.split("?")[1].split("&");
                    console.log(layer)
                    var id = layer.filter(x => x.toLowerCase().includes('layers='))[0].replace("layers=", "")
                    console.log(id)
                    setUrlWMS(main);
                    setLayerWMS(unescape(id));
                } else {
                    setUrlWMS("");
                    setLayerWMS("");
                }
                var pdf = getmap.filter(x => x.url.toLowerCase().includes('pdf'))
                if (pdf.length > 0) {
                    var url_domain = pdf[0].url.replace("91.225.61.58", "landscapeportal.org");
                    url_domain = url_domain.replace("91.225.62.74", "landscapeportal.org");
                    setLayerPdf(url_domain);
                } else {
                    setLayerPdf("")
                }
                //console.log(png)
            } else {
                setUrlWMS("");
                setLayerWMS("");
                setLayerPdf("")
            }



            ///console.log(jpeg)
            //console.log(png)
            
            //load_info_attribute(wfs[0].url, wfs[0].name);
            //var thumb = wms[0].url.replace("?", "/reflect?layers=") + wms[0].name;
            //setServer('geoserver')
            //setUrlWMS(wms[0].url.replace("?", ""))

            
            
            //OGC:WMS
            //OGC:WFS
            //WWW:LINK

            //console.log(json_obj);
            /*
            //var esri = json_obj.filter(p => p.protocol === "ESRI:ArcGIS:MapServer")
            var wms = json_obj.filter(p => p.protocol === 'OGC:WMS')
            var wfs = json_obj.filter(p => p.protocol === 'OGC:WFS')
            var link = json_obj.filter(p => p.protocol === 'WWW:LINK')

            var thumb;
            //console.log(typeof (esri));
            //console.log(typeof (wms));
            if (esri.length > 0) {
                //console.log('aye');
                //console.log(esri[0]);
                thumb = esri[0].url + "/info/thumbnail";
                setServer('esri')
                setUrlWMS(esri[0].url)
                setLayerWMS("")
            }else{
                thumb = wms[0].url.replace("?", "/reflect?layers=") + wms[0].name;
                setServer('geoserver')
                setUrlWMS(wms[0].url.replace("?", ""))
                setLayerWMS(wms[0].name)
            }
                 
            setUrlThumb(thumb);

            if (esri.length > 0) {
                load_info_attribute_esri(esri[0].url);
            }else{ 
                load_info_attribute(wfs[0].url, wfs[0].name);
            }
            */
            //var download_scheme = json_obj.filter(p => p.protocol === 'WWW:DOWNLOAD-1.0-http--download')
            //console.log(row.references.filter(p => p.scheme === 'WWW:LINK-1.0-http--link'));
            //console.log(row.references.filter(p => p.scheme === 'WWW:DOWNLOAD-1.0-http--download').filter(x => x.url.includes('wms?') && !x.url.includes('legend') && x.url.includes('png')));
            //WWW:DOWNLOAD-1.0-http--download

            //setUrlThumb(references[0].url);
            //var thumbs = download_scheme.filter(x => x.url.toLowerCase().includes('thumbs'));
            //setUrlThumb(Config.proxy_domain + url_domain)
            /*
            var original = download_scheme.filter(x => x.url.toLowerCase().includes('download'))
            var getmap = download_scheme.filter(x => x.url.toLowerCase().includes('getmap'));
            var jpeg = getmap.filter(x => x.url.toLowerCase().includes('jpeg'))
            var png = getmap.filter(x => x.url.toLowerCase().includes('png'))

            var getfeature = download_scheme.filter(x => x.url.toLowerCase().includes('getfeature'));

            var kml = download_scheme.filter(x => x.url.toLowerCase().includes('kml'));

            if (thumbs.length > 0) {
                setUrlThumb(Config.proxy_domain + thumbs[0].url);
            } else {

                if (png.length > 0) {
                    var url_domain = png[0].url.replace("91.225.61.58", "landscapeportal.org");
                    url_domain = url_domain.replace("91.225.62.74", "landscapeportal.org");
                    setUrlThumb(Config.proxy_domain + url_domain);
                } else if (jpeg.length) {
                    setUrlThumb(Config.proxy_domain + jpeg[0].url);
                } else {
                    setUrlThumb(no_thumb);
                }
            }

            var raw = original.filter(x => !x.url.toLowerCase().includes('kml'))
            console.log(raw)
            console.log(original)
            if (raw.length > 0) {
                //original dataset
                var url_domain = raw[0].url.replace("91.225.61.58", "landscapeportal.org");
                url_domain = url_domain.replace("91.225.62.74", "landscapeportal.org");
                setLayerOriginal(url_domain);
            } else {
                setLayerOriginal("")
            }

            if (getmap.length > 0) {
                //jpeg

                if (jpeg.length > 0) {
                    var url_domain = jpeg[0].url.replace("91.225.61.58", "landscapeportal.org");
                    url_domain = url_domain.replace("91.225.62.74", "landscapeportal.org");
                    var main = url_domain.split("?")[0]
                    console.log(main)
                    var layer = url_domain.split("?")[1].split("&");
                    console.log(layer)
                    var id = layer.filter(x => x.toLowerCase().includes('layers='))[0].replace("layers=", "")
                    // console.log(id)
                    setUrlWMS(main);
                    setLayerWMS(unescape(id));
                } else if (png.length > 0) {
                    var url_domain = png[0].url.replace("91.225.61.58", "landscapeportal.org");
                    url_domain = url_domain.replace("91.225.62.74", "landscapeportal.org");
                    var main = url_domain.split("?")[0]
                    console.log(main)
                    var layer = url_domain.split("?")[1].split("&");
                    console.log(layer)
                    var id = layer.filter(x => x.toLowerCase().includes('layers='))[0].replace("layers=", "")
                    console.log(id)
                    setUrlWMS(main);
                    setLayerWMS(unescape(id));
                } else {
                    setUrlWMS("");
                    setLayerWMS("");
                }


                var pdf = getmap.filter(x => x.url.toLowerCase().includes('pdf'))
                if (pdf.length > 0) {
                    var url_domain = pdf[0].url.replace("91.225.61.58", "landscapeportal.org");
                    url_domain = url_domain.replace("91.225.62.74", "landscapeportal.org");
                    setLayerPdf(url_domain);
                } else {
                    setLayerPdf("")
                }
                //console.log(png)
            } else {
                setUrlWMS("");
                setLayerWMS("");
                setLayerPdf("")
            }

            setDataAttribute()

            if (getfeature.length > 0) {
                var shape = getfeature.filter(x => x.url.toLowerCase().includes('shape-zip'))
                if (shape.length > 0) {
                    var url_domain = shape[0].url.replace("91.225.61.58", "landscapeportal.org");
                    url_domain = url_domain.replace("91.225.62.74", "landscapeportal.org");
                    setLayerSHP(url_domain)
                } else {
                    setLayerSHP("")
                }
                var csv = getfeature.filter(x => x.url.toLowerCase().includes('csv'))
                if (csv.length > 0) {
                    var url_domain = csv[0].url.replace("91.225.61.58", "landscapeportal.org");
                    url_domain = url_domain.replace("91.225.62.74", "landscapeportal.org");
                    setLayerCSV(url_domain)
                } else {
                    setLayerCSV("")
                }
                var excel = getfeature.filter(x => x.url.toLowerCase().includes('excel'))
                if (excel.length > 0) {
                    var url_domain = excel[0].url.replace("91.225.61.58", "landscapeportal.org");
                    url_domain = url_domain.replace("91.225.62.74", "landscapeportal.org");
                    setLayerExcel(url_domain)
                } else {
                    setLayerExcel("")
                }

                var gml = getfeature.filter(x => x.url.toLowerCase().includes('gml2'))
                if (gml.length > 0) {
                    var url_domain = gml[0].url.replace("91.225.61.58", "landscapeportal.org");
                    url_domain = url_domain.replace("91.225.62.74", "landscapeportal.org");
                    setLayerGML(url_domain)
                } else {
                    setLayerGML("")
                }

                var geojson = getfeature.filter(x => x.url.toLowerCase().includes('json'))
                if (geojson.length > 0) {
                    var url_domain = geojson[0].url.replace("91.225.61.58", "landscapeportal.org");
                    url_domain = url_domain.replace("91.225.62.74", "landscapeportal.org");
                    setLayerGeojson(url_domain)
                    load_info_attribute(url_domain)
                } else {
                    setLayerGeojson("")
                }
            } else {
                setLayerSHP("")
                setLayerCSV("")
                setLayerExcel("")
                setLayerGML("")
                setLayerGeojson("")
            }

            if (kml.length > 0) {
                setLayerKML(kml[0].url);
            } else {
                setLayerKML("");
            }
            */

        }
    }

    function viewSubject(subjects) {
        //console.log(subjects);
        if (subjects) {
            var s = JSON.parse(subjects);
            if (s) {
                var list = []
                s.forEach(function (x) {
                    //console.log(x.keywords);
                    x.keywords.forEach(function (y) {
                        list.push(y)
                    });
                });
                //console.log(s[0].keywords);
                //console.log(s[0].keywords.join(", "));
                //console.log(list)
                if (list)
                    return list.join(", ");
                else
                    return "";
            }
        }
    }

    function load_info_attribute_esri(url) {
        //console.log(url)
        //setDataAttribute()
        const requestOptions = {
            method: 'GET'
        };
        var url_replace = url + "/0?f=pjson";
        fetch(url_replace, requestOptions).then(res => res.json()).then(data => {
            //console.log(data.fields)
            setDataAttribute(data.fields);
        });

       
    }

    function load_info_attribute(url, name) {
        console.log(url)
        const requestOptions = {
            method: 'GET'
        };
        //http://sumbarprov.ina-sdi.or.id:8080/geoserver/wfs?SERVICE=WfS&REQUEST=GetFeature&VERSION=2.0.0&typeName=ADMIN:administrasi_ar_250k_130020201203152021&featureID=1&outputFormat=application/json
        //var url_replace = url.replace("GetFeature", "DescribeFeatureType").replace("json", "application/json")
        var url_replace = url + "SERVICE=WFS&REQUEST=DescribeFeatureType&VERSION=2.0.0&typeName=" + name + "&featureID=1&outputFormat=application/json"
        //http://landscapeportal.org/geoserver/wfs?typename=geonode%3Akenya_nyando_basin_landtenure1964&outputFormat=application/json&version=1.0.0&request=DescribeFeatureType&service=WFS
        //console.log(url_replace)
        console.log(url_replace)
        fetch(Config.proxy_domain + url_replace, requestOptions).then(res => res.json()).then(data => {
            if (data) {
                //console.log(data)
                //    console.log(data.featureTypes[0])
                //console.log(data.featureTypes[0].properties)
                setDataAttribute(data.featureTypes[0].properties);
            } else {
                setDataAttribute()
            }
        }).catch(function(error) {
            console.log(error);
            setDataAttribute()
        });

    }

    function getRowsAttribute() {
        if (typeof (dataAttribute) !== 'undefined') {
            //var items=props.presensiDataLast.data;
            if (dataAttribute !== null) {

                if (dataAttribute.length > 0) {

                    return dataAttribute.map((row, index) => {
                        //console.log(row)
                        return (
                            <TableRow key={"att" + index} >
                                <TableCell></TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.type}</TableCell>
                                <TableCell></TableCell>

                            </TableRow>

                        )
                        ///cr = cr + 1
                        //return <tr><td className="p-2">{cr}</td><td className="p-2">{row.name}</td><td className="p-2">{row.sj}</td><td className="p-2">{row.kategori}</td><td className="p-2">{row.katalog}</td><td className="p-2 pointer"> <FileEarmarkText size={14} onClick={() => showMetadata(row)} className="mr-2" /> {' '} {row.viewable === 'true' ? <Eye onClick={() => showView(row)} className="mr-2" size={14} /> : ""} {' '} {row.downloadable === 'true' ? <Download size={12}  onClick={() => showDownload(row)} /> : ""}  </td></tr>
                    })
                } else {
                    return (
                        <TableRow colSpan={4}>
                            <TableCell>No attribute found</TableCell>
                        </TableRow>
                    )
                }
            } else {
                return (
                    <TableRow >
                    <TableCell colSpan={4}>No attribute found</TableCell>
                </TableRow>
                )
            }
        } else {
            return (
                <TableRow>
                <TableCell colSpan={4}>No attribute found</TableCell>
            </TableRow>
            )
        }
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
                    <span>Data Browser</span>
                    <IconButton size="small" onClick={handleClose} >
                        <Close />
                    </IconButton>
                </div>


            </DialogTitle>
            <DialogContent style={{ height: "80vh", padding: "5px" }} >
                <Wrapper>
                    <LeftContent>
                        <Filter style={{fontSize: "12px"}}>
                            <Title>Filtering</Title>
                            <FormContainer style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', minHeight: "35vh" }}>
                                <FormInput>
                                    <Label>Study Area</Label>
                                    <EntryMiddle>
                                        <BootstrapInput defaultValue={labelArea} disabled fullWidth />
                                    </EntryMiddle>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => setSelectArea(true)}
                                    >
                                        Change
                                    </Button>
                                </FormInput>
                                <FormInput>
                                    <Label>Theme</Label>
                                    <Entry>
                                        <TextField
                                            id="outlined-select-currency"
                                            select
                                            value={idTheme}
                                            onChange={handleChangeTheme}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                        >
                                            {
                                                getTheme()
                                            }
                                        </TextField>
                                    </Entry>
                                </FormInput>
                                <FormInput>
                                    <Label>Organization</Label>
                                    <Entry>
                                        <TextField
                                            id="outlined-select-currency"
                                            select
                                            value={idOrganization}
                                            onChange={handleChangeOrganization}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                        >
                                            {
                                                getOrganizations()
                                            }
                                        </TextField>
                                    </Entry>
                                </FormInput>
                                <FormInput>
                                    <Label>Year</Label>
                                    <Entry>
                                        <TextField
                                            id="outlined-select-currency"
                                            select
                                            value={idYear}
                                            onChange={handleChangeYear}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                        >

                                            {
                                                getYears()
                                            }
                                        </TextField>
                                    </Entry>
                                </FormInput>
                                <FormInput>
                                    <Label>Keywords</Label>
                                    <Entry>
                                        <TextField
                                            id="outlined-select-currency"
                                            select
                                            value={idKeywords}
                                            onChange={handleChangeKeywords}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                        >
                                            {
                                                getKeywords()
                                            }
                                        </TextField>
                                    </Entry>
                                </FormInput>
                                <FormInput>
                                    <Label>Flagship Status</Label>
                                    <Entry>
                                        <TextField
                                            id="outlined-select-currency"
                                            select
                                            value={idKeywords}
                                            onChange={handleChangeKeywords}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                        >
                                            {
                                                getFlagship()
                                            }

                                            
                                        </TextField>
                                    </Entry>
                                </FormInput>
                                {

                                    /*
                                    <FormInput>
                                        <Label>Title Search (Any text)</Label>
                                        <Entry> 
                                                <BootstrapInput placeholder="type title" id="q" fullWidth autoComplete="off"  />
                                        </Entry>
                                    </FormInput>
                                    <FormInputRight>
                                        <Button variant="contained" color="primary" size="small"  onClick={doSearch}>Search</Button>
                                    </FormInputRight>
                                        */
                                }
                            </FormContainer>
                        </Filter>
                        <AvailableDataset  style={{fontSize: "12px"}}>
                            <Title>Available Dataset ({numberData})</Title>
                            <TableContainer style={{ maxHeight: 250 }} className="pointer">
                                <Table stickyHeader size="small" aria-label="a dense table">
                                    <TableHead color="#ddd">
                                        <TableRow>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Publication Time</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody >
                                        {
                                            getRowsData()
                                        }

                                        {
                                            /*
                                            rows.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.title}</TableCell>
                                                <TableCell>{row.modified}</TableCell>
                                            </TableRow>
                                        ))
                                        */
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AvailableDataset>
                    </LeftContent>
                    <RightContent>
                        <Metadata>
                            <Description style={{fontSize: '11px'}}>
                                <Title>Metadata</Title>
                                <p style={{ margin: '0px 0px 5px 0px' }}>Title: {metadata.title}</p>
                                <p style={{ margin: '0px 0px 5px 0px' }}>Type: {metadata.type}</p>
                                <p style={{ margin: '0px 0px 5px 0px' }}>Organization: {metadata.organization} </p>
                                <p style={{ margin: '0px 0px 5px 0px' }}>Keywords:<br />
                                    {
                                        viewSubject(metadata.subjects)
                                        //console.log(metadata)
                                    }
                                </p>
                                {
                                    /*
                                    {
                                    whiteSpace: 'nowrap',
                                    width: '250px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                    }
                                    */
                                }
                                <p style={{ maxHeight: '80px', overflowY: 'auto', margin: '0px 0px 5px 0px' }}>Abstract:<br />
                                    {metadata.abstract}
                                </p>
                            </Description>
                            <Thumbnail>
                                <p style={{ fontWeight: 'bold' }}>Map Preview</p>
                                <img src={Config.proxy_domain + urlThumb} alt="preview" width="150" height="80" style={{ border: '1px solid #ccc' }} onError={e => { e.target.src = no_thumb }} />
                            </Thumbnail>
                        </Metadata>
                        <Attribute  style={{fontSize: "12px"}}>
                            <Title>Data Attribute {dataAttribute?"("+dataAttribute.length+")": ""}</Title>
                            <TableContainer style={{ maxHeight: 240, }} >
                                <Table stickyHeader size="small" aria-label="a dense table">
                                    <TableHead color="#ddd">
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Type</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            getRowsAttribute()
                                        }
                                        {
                                            /*
                                            attr.map((att) => (
                                            <TableRow key={att.id}>
                                                <TableCell> </TableCell>
                                                <TableCell>{att.name}</TableCell>
                                                <TableCell>{att.type}</TableCell>
                                            </TableRow>
                                            ))
                                            */
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Attribute>
                    </RightContent>
                </Wrapper>
            </DialogContent>
            <DialogActions>
                <SpanContainer>
                    <span>Save Layer Name As</span>
                </SpanContainer>
                <Entry>
                  {
                    //<BootstrapInput placeholder="layer name" value={layerName} onChange={e => setLayerName(e.target.value)} fullWidth />
                  }
                  <TextField id="outlined-basic2" variant="outlined" defaultValue={layerName} onChange={e => setLayerName(e.target.value)} size="small" fullWidth  />
                </Entry>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.cancel}
                    onClick={addAndKeep}
                    size="small"
                >
                    Add and continue browsing
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={addAndGo}
                    size="small"
                >
                    Add and finish browsing
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const Wrapper = styled.div`
  margin:0px;
  display: flex;
  height: 100%;
`;

const FormContainer = styled.div`
`;

const LeftContent = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 5px 0px 5px 5px;
    width:50%;
`;

const RightContent = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 5px 5px 5px 0px;
    width:50%;
`;

const Filter = styled.div`
    max-height: 50%;
    padding-right: 10px;
`;

const FormInput = styled.div`
  margin:0px;
  display: flex;
`;

const FormInputRight = styled.div`
  margin:0px;
  display: flex;
  justify-content: flex-end;
`;

const Label = styled.div`
    width: 150px;
`;
const Entry = styled.div`
    flex-grow: 1;
    display: flex;
`;
const SpanContainer = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
`;

const EntryMiddle = styled.div`
    flex-grow: 1;
    padding-right: 10px;
`;
const AvailableDataset = styled.div`
    flex-grow: 1;
    padding-right: 10px;
`;

const Metadata = styled.div`
    display: flex;
    height: 50%;
    max-height: 50%;
`;

const Description = styled.div`
    flex-grow: 1;
    width:70%
`;

const Thumbnail = styled.div`
    flex-grow: 1;
    width: 30%;
`;

const Attribute = styled.div`
    flex-grow: 1;
`;

const Title = styled.h3`
  margin:0px;
  color:#2F4E6F;
`;
