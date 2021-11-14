
import 'ol/ol.css';
import './App.css';
import Config from './config.json';

import styled from "styled-components";
import { useState, useEffect, forwardRef } from 'react';
import TopMenu from "./components/TopMenu";
import LeftMenu from "./components/LeftMenu";
import MapContainer from "./components/MapContainer";
import { IconButton, Slide } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import Area from './components/Area/Area';
import Data from './components/Data/Data';
import SelectArea from './components/Area/SelectArea';
import BrowseData from './components/Data/BrowseData';
import ImportData from './components/Data/ImportData';
import Analysis from './components/Analysis/Analysis';
import About from './components/About/About';

import { makeStyles } from '@material-ui/core/styles';

import logo_cifor from "./logo/CIFOR_green_vlr.png";
import logo_alliance from "./logo/Alliance_logos-ENGLISH.png";
import logo_catie from "./logo/catie.png";
import logo_cirad from "./logo/logo-cirad.png";
import logo_inbar from "./logo/logo-inbar.png";
import logo_tropenbos from "./logo/logo-tropenbos-small.png";
import logo_agroforestry from "./logo/agroforestry.png";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function App() {
  const classes = useStyles();

  const [center, setCenter] = useState([0, 0]);
  const [zoom, setZoom] = useState(1);
  const [basemap, setBasemap] = useState('imagery');

  const [menu, setMenu] = useState("about");
  const [slideBar, setSliderBar] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(2);

  const [selectArea, setSelectArea] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [browseData, setBrowseData] = useState(false);
  const [importData, setImportData] = useState(false);
  //const [openSearch, setOpenSearch] = useState(false);

  const [bbox, setBbox] = useState([-133044556.24688484, -20037508.342789244, 133044555.79934952, 20037508.342789244]);

  //const [bboxLabel, setBboxLabel] = useState('[' + bbox[0].toFixed(2) + ', ' + bbox[1].toFixed(2) + ', ' + bbox[2].toFixed(2) + ', ' + bbox[3].toFixed(2) + ']');
  const [visibleBbox, setVisibleBbox] = useState(false);
  const [boundary, setBoundary] = useState();
  const [visibleBoundary, setVisibleBoundary] = useState(false);
  const [zoomBbox, setZoomBbox] = useState(false);
  const [visibleStatistic, setVisibleStatistic] = useState(false);
  const [visibleAnalysis, setVisibleAnalysis] = useState(false);

  const [dataAll, setDataAll] = useState();
  const [mapLayer, setMapLayer] = useState([]);
  const url_list_harvesting = Config.api_domain + "/harvestings/bbox/";

  const [labelArea, setLabelArea] = useState('All Continents');
  const [identifierMetadata, setIdentifierMetadata] = useState("");
  const [identifierAttribute, setIdentifierAttribute] = useState("");
  const [identifierDelete, setIdentifierDelete] = useState("");
  const [identifierVisible, setIdentifierVisible] = useState("");

  const [zoomToMap, setZoomToMap] = useState();

  const [buffered, setBuffered] = useState();

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [sidebarTitle, setSidebarTitle] = useState({
    area: 'Study Area',
    data: 'Data ',
    about: 'About ',
  });

  const [sidebarContent, setSidebarContent] = useState({
    area: null,
    data: null,
  });

  useEffect(() => {
    //alert('ready')
    const queryString = window.location.href;
    //console.log(queryString)
    //console.log(queryString.replace("#/viewer", ""))
    let url = new URL(queryString.replace("#/viewer", ""));
    let params = new URLSearchParams(url.search);
    console.log(params.toString())
    console.log(params.has('identifier'));
    if (params.has('identifier')) {
      const id = params.get('identifier');
      console.log(id)
      const requestOptions = {
        method: 'GET'
      };
      //-180, -90, 180, 90
      //100.0248/-1.1223/103.8146/2.9191
      fetch(Config.api_domain + "/harvestings/identifier/" + id, requestOptions).then(res => res.json()).then(data => {
        setMenu('data')
        console.log(data.data);//
        var row = data.data;
        var identifier = row.identifier;
        var layerName = row.title;
        var urlWMS;
        var layerWMS;
        var layerKML;
        var layerGML;
        var layerSHP;
        var layerCSV;
        var layerExcel;
        var layerOriginal;
        var layerPdf;
        var layerGeojson;
        //console.log(row.references);

        var json_obj = JSON.parse(row.distributions);

        var download_scheme = json_obj.filter(p => p.protocol === 'WWW:DOWNLOAD-1.0-http--download')
        var original = download_scheme.filter(x => x.url.toLowerCase().includes('download'))
        //console.log(thumbs)
        //console.log(reflects)


        var original = download_scheme.filter(x => x.url.toLowerCase().includes('download'))
        var getmap = download_scheme.filter(x => x.url.toLowerCase().includes('getmap'));
        var getfeature = download_scheme.filter(x => x.url.toLowerCase().includes('getfeature'));

        var jpeg = getmap.filter(x => x.url.toLowerCase().includes('jpeg'))
        var png = getmap.filter(x => x.url.toLowerCase().includes('png'))
        var kml = download_scheme.filter(x => x.url.toLowerCase().includes('kml'));
        var raw = original.filter(x => !x.url.toLowerCase().includes('kml'))

        if (raw.length > 0) {
          //original dataset
          var url_domain = raw[0].url.replace("91.225.61.58", "landscapeportal.org");
          url_domain = url_domain.replace("91.225.62.74", "landscapeportal.org");
          layerOriginal = url_domain;
        } else {
          layerOriginal = "";
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
            urlWMS = main;
            layerWMS = unescape(id);
          } else if (png.length > 0) {
            var url_domain = png[0].url.replace("91.225.61.58", "landscapeportal.org");
            url_domain = url_domain.replace("91.225.62.74", "landscapeportal.org");
            var main = url_domain.split("?")[0]
            console.log(main)
            var layer = url_domain.split("?")[1].split("&");
            console.log(layer)
            var id = layer.filter(x => x.toLowerCase().includes('layers='))[0].replace("layers=", "")
            console.log(id)
            urlWMS = main;
            layerWMS = unescape(id);
          } else {
            urlWMS = "";
            layerWMS = "";
          }
          var pdf = getmap.filter(x => x.url.toLowerCase().includes('pdf'))
          if (pdf.length > 0) {
            var url_domain = pdf[0].url.replace("91.225.61.58", "landscapeportal.org");
            url_domain = url_domain.replace("91.225.62.74", "landscapeportal.org");
            layerPdf = url_domain;
          } else {
            layerPdf = "";
          }
          //console.log(png)
        } else {
          urlWMS = "";
          layerWMS = "";
          layerPdf = ""
        }

        if (getfeature.length > 0) {
          var shape = getfeature.filter(x => x.url.toLowerCase().includes('shape-zip'))
          if (shape.length > 0) {
            var url_domain = shape[0].url.replace("91.225.61.58", "landscapeportal.org");
            url_domain = url_domain.replace("91.225.62.74", "landscapeportal.org");
            layerSHP = url_domain;
          } else {
            layerSHP = "";
          }
          var csv = getfeature.filter(x => x.url.toLowerCase().includes('csv'))
          if (csv.length > 0) {
            var url_domain = csv[0].url.replace("91.225.61.58", "landscapeportal.org");
            url_domain = url_domain.replace("91.225.62.74", "landscapeportal.org");
            layerCSV = url_domain;
          } else {
            layerCSV = "";
          }
          var excel = getfeature.filter(x => x.url.toLowerCase().includes('excel'))
          if (excel.length > 0) {
            var url_domain = excel[0].url.replace("91.225.61.58", "landscapeportal.org");
            url_domain = url_domain.replace("91.225.62.74", "landscapeportal.org");
            layerExcel=url_domain;
          } else {
            layerExcel="";
          }

          var gml = getfeature.filter(x => x.url.toLowerCase().includes('gml2'))
          if (gml.length > 0) {
            var url_domain = gml[0].url.replace("91.225.61.58", "landscapeportal.org");
            url_domain = url_domain.replace("91.225.62.74", "landscapeportal.org");
            layerGML=url_domain;
          } else {
            layerGML="";
          }

          var geojson = getfeature.filter(x => x.url.toLowerCase().includes('json'))
          if (geojson.length > 0) {
            var url_domain = geojson[0].url.replace("91.225.61.58", "landscapeportal.org");
            url_domain = url_domain.replace("91.225.62.74", "landscapeportal.org");
            layerGeojson=url_domain;
          } else {
            layerGeojson="";
          }
        } else {
          layerSHP = "";
          layerCSV = "";
          layerExcel="";
          layerGML="";
          layerGeojson="";
        }

        if (kml.length > 0) {
          var url_domain = kml[0].url.replace("91.225.61.58", "landscapeportal.org");
          url_domain = url_domain.replace("91.225.62.74", "landscapeportal.org");
          layerKML=url_domain;
        } else {
          layerKML=""
        }

        setMapLayer(oldArray => [...oldArray, { id: identifier, title: layerName, server: 'geoserver', tipe: 'wms', url: urlWMS, geom: '', layer: layerWMS, original: layerOriginal, pdf: layerPdf, geojson: layerGeojson, kml: layerKML, gml: layerGML, shp: layerSHP, csv: layerCSV, excel: layerExcel, metadata: true, table: layerGeojson ? true : false, visible: true, opacity: 1 }])
        setZoomToMap(identifier)
      });
    }

  }, []);


  function handlingMenu(e) {
    //closeMenu();

    setMenu(e);
    if (e === 'analysis') {
      var sidebar = document.getElementById('sidebar');
      sidebar.style.width = "0px";

      var buttonContainer = document.getElementById('buttonContainer');
      buttonContainer.style.marginLeft = "15px";
      if (e === 'analysis') {
        setOpen(true)
      }
    } else {
      var sidebar = document.getElementById('sidebar');
      sidebar.style.width = "330px";
      var close = document.getElementById('close');
      close.style.display = "inline-block";
      var buttonContainer = document.getElementById('buttonContainer');
      buttonContainer.style.marginLeft = "350px";
    }

    //var mapContainer = document.getElementById('mapContainer');
    //mapContainer.style.marginLeft = "350px";
    //sideHelper.addClass('')

  }

  //document.getElementById("mySidenav").style.width = "250px";
  //document.getElementById("main").style.marginLeft = "250px";

  function closeMenu() {
    setMenu();
    var sidebar = document.getElementById('sidebar');
    sidebar.style.width = "0px";
    var close = document.getElementById('close');
    close.style.display = "none";
    var buttonContainer = document.getElementById('buttonContainer');
    buttonContainer.style.marginLeft = "15px";
    //var mapContainer = document.getElementById('mapContainer');
    //mapContainer.style.marginLeft = "0px";
  }



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //mountOnEnter unmountOnExit
  /*
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  */

  function handleCloseAnalysis(e) {
    setOpen(false);
    setMenu();
  }
  function handleCloseSelectArea(e) {
    setSelectArea(false);
  }
  function handleCloseBrowseData(e) {
    setBrowseData(false);
  }
  function handleCloseImportData(e) {
    setImportData(false);
  }

  function renderIt() {
    if (menu === 'area') {
      return <Area labelArea={labelArea} setSelectArea={(e) => setSelectArea(e)} drawing={drawing} setDrawing={(e) => setDrawing(e)}
        visibleBoundary={visibleBoundary} setVisibleBoundary={(e) => setVisibleBoundary(e)} bbox={bbox}
        visibleBbox={visibleBbox} setVisibleBbox={(e) => setVisibleBbox(e)} setZoomBbox={(e) => setZoomBbox(e)} />;
    } else if (menu === 'data') {
      return <Data setBrowseData={(e) => setBrowseData(e)} setImportData={(e) => setImportData(e)} mapLayer={mapLayer}
        deleteDataset={(e) => deleteDataset(e)} handleVisible={e => handleVisible(e)} setZoomToMap={(e) => setZoomToMap(e)}
        handleOpacity={(e, b) => handleOpacity(e, b)} />;
    } else if (menu === 'about') {
      return <About />;
    }


  }

  function deleteDataset(id) {
    //setDataset(oldArray => [...oldArray, newElement]);
    //console.log(dataset);

    const layers = mapLayer.slice();
    console.log(id);

    //console.log(map)
    //map.eachLayer(function(layer){
    //if(layer.options.id === id)
    //map.removeLayer(layer)
    //});
    //var index = mapLayer.findIndex(x => x.id === id);
    //setDataset(mapLayer.slice(index, 1));
    //console.log(typeof(id))
    //console.log(typeof(dataset.slice()[0].id))
    //console.log(dataset.filter(item => item.id !== id))
    setMapLayer(mapLayer.filter(item => item.id !== id));
    setIdentifierDelete(id)

  }

  function handleVisible(id) {
    //setIdentifierVisible(id);
    const data = mapLayer.slice();
    //console.log(data[0]);
    var index = mapLayer.findIndex(x => x.id === id);
    //console.log(index);
    data[index].visible = !data[index].visible
    setMapLayer(data);
  }

  function handleOpacity(id, val) {
    //console.log(id, val)
    //setIdentifierVisible(id);
    const data = mapLayer.slice();
    //console.log(data[0]);
    var index = mapLayer.findIndex(x => x.id === id);
    //console.log(index);
    data[index].opacity = val
    setMapLayer(data);
  }
  /*
  useEffect(() => {

    let mounted = true;

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };


    
    fetch(url_get_country + idCountry, requestOptions).then(res => res.json()).then(data => {
      if (mounted) {

        if (data.status === "ok") {
          //console.log(data.message);
          //props.setAreaName(areaLabel)
          var bbox = JSON.parse(data.message.bbox);
          var geom = JSON.parse(data.message.geom);

          //console.log(bbox.coordinates[0][0][0])
          // var center = JSON.parse(data.message.center);
          //console.log(center.coordinates)
          setBbox([bbox.coordinates[0][0][0], bbox.coordinates[0][0][1], bbox.coordinates[0][2][0], bbox.coordinates[0][2][1]])
          //props.setBboxLabel('[' + bbox.coordinates[0][0][0].toFixed(2) + ', ' + bbox.coordinates[0][0][1].toFixed(2) + ', ' + bbox.coordinates[0][2][0].toFixed(2) + ', ' + bbox.coordinates[0][2][1].toFixed(2) + ']')
          setBoundary(geom)
          //props.setPerformZoom(true)
          //props.setBboxGeom([center, geom, 2]);


        }

      }
    });



    return function cleanup() {
      mounted = false;
    }
  }, []);
  */

  useEffect(() => {

    async function loadDataset() {

      const response = await fetch(url_list_harvesting + bbox[0].toFixed(6) + "/" + bbox[1].toFixed(6) + "/" + bbox[2].toFixed(6) + "/" + bbox[3].toFixed(6))

      var json = await response.json();

      if (response.status === 200) {
        //console.log(json.data)
        setDataAll(json.data);//.sort((a, b) => (a.title > b.title) ? 1 : -1));

        const ele = document.getElementById('ipl-progress-indicator')
        if (ele) {
          // fade out
          ele.classList.add('available')
          setTimeout(() => {
            // remove from DOM
            ele.outerHTML = ''
          }, 1000)
        }
      } else {
        console.log(response.status)
      }
    }

    loadDataset();

  }, []);

  useEffect(() => {

    const requestOptions = {
      method: 'GET'
    };

    fetch(url_list_harvesting + bbox[0].toFixed(6) + "/" + bbox[1].toFixed(6) + "/" + bbox[2].toFixed(6) + "/" + bbox[3].toFixed(6), requestOptions).then(res => res.json()).then(data => {
      setDataAll(data.data);
    })
  }, [bbox]);



  return (
    <Container>
      <div id="ipl-progress-indicator" className="ipl-progress-indicator">
        <img alt="logo" src="loading.gif" width="120px" />
      </div>
      <SelectArea open={selectArea} handleCloseSelectArea={(e) => handleCloseSelectArea(e)}
        labelArea={labelArea} setLabelArea={setLabelArea}
        setBbox={setBbox} setBoundary={setBoundary} setZoomBbox={setZoomBbox}
        setVisibleBbox={setVisibleBbox} setVisibleBoundary={setVisibleBoundary}
      />
      <BrowseData open={browseData} handleCloseBrowseData={(e) => handleCloseBrowseData(e)}
        labelArea={labelArea} setSelectArea={(e) => setSelectArea(e)}
        dataAll={dataAll} setMapLayer={(e) => setMapLayer(e)}
      />
      <ImportData open={importData} handleCloseImportData={(e) => handleCloseImportData(e)} setMapLayer={(e) => setMapLayer(e)} />
      <Analysis open={open} handleCloseAnalysis={(e) => handleCloseAnalysis(e)} />
      <TopMenu />
      <Main>
        <Content>
          <LeftMenu menu={menu} setMenu={(e) => handlingMenu(e)} total={dataAll?.length} />
          <MapContainer id="mapContainer" center={center} zoom={zoom} basemap={basemap} setBasemap={setBasemap}
            bbox={bbox} visibleBbox={visibleBbox} boundary={boundary} visibleBoundary={visibleBoundary}
            zoomBbox={zoomBbox} setZoomBbox={setZoomBbox} drawing={drawing}
            setBbox={setBbox} setDrawing={setDrawing} setVisibleBbox={setVisibleBbox}
            setLabelArea={setLabelArea} visibleStatistic={visibleStatistic} mapLayer={mapLayer} setMapLayer={(e) => setMapLayer(e)}
            identifierDelete={identifierDelete} setIdentifierDelete={setIdentifierDelete}
            visibleAnalysis={visibleAnalysis} buffered={buffered} zoomToMap={zoomToMap}
            setZoomToMap={setZoomToMap}
          />

        </Content>
        <Sidebar id="sidebar">
          <Closer>
            <SidebarTitle>
              {sidebarTitle[menu]}
            </SidebarTitle>
            <IconButton id="close" size="small" onClick={() => closeMenu()} style={{ marginTop: '-10px' }} >
              <Close fontSize="small" />
            </IconButton>
          </Closer>
          {
            renderIt()
          }


        </Sidebar>
      </Main>
      <Footer>
        <BottomTwo>
          <BottomOne>
            <span>Led by:</span>
            <img alt="logo" style={{ maxHeight: "45px" }} src={logo_cifor} width="45px" />
          </BottomOne>
          <span>In partnership with:</span>
          <ImageList>
            <img alt="logo" style={{ maxHeight: "40px" }} src={logo_alliance} width="100px" />
            <img alt="logo" style={{ maxHeight: "30px" }} src={logo_catie} />
            <img alt="logo" style={{ maxHeight: "30px" }} src={logo_cirad} width="60px" />
            <img alt="logo" style={{ maxHeight: "30px" }} src={logo_inbar} />
            <img alt="logo" style={{ maxHeight: "30px" }} src={logo_tropenbos} />
            <img alt="logo" style={{ maxHeight: "30px" }} src={logo_agroforestry} />
          </ImageList>
        </BottomTwo>
        <BottomThree>
          <span>© 2021 @ CGIAR Research Program - Forests, Trees and Agroforestry</span>
        </BottomThree>
        <BottomFour>
          <a href="https://www.cifor.org/terms-of-use/" target="_blank" style={{ marginRight: "10px" }}>Term Of Use</a>
          <a href="https://www.cifor.org/privacy-policy/" target="_blank">Privacy Policy</a>
        </BottomFour>
      </Footer>
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  height:100vh;
  flex-direction: column;
`;

const Main = styled.div`
  display: flex;
  flex-grow: 1;
  height: 89vh;
`;


const Content = styled.div`
  background-color:white;
  flex-grow: 1;
  display: flex;
  width: 100%;
`;



const Sidebar = styled.div`
  height: 85.3vh;
  width: 330px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  margin-left: 70px;
  margin-top: 7.7vh;
  padding-top: 10px;
  background-color: white;
  overflow-x: hidden;
  overflow-y: hidden;
  transition: 0.8s;
  border-right: 1px solid #eee;
`;

const Closer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 5px;
`;

const SidebarTitle = styled.h3`
  padding-left:17px;
`;



const Footer = styled.div`
  display: flex;
  height: 7vh;
  justify-content: space-around;
  background-color: white;
`;

const BottomOne = styled.div`
  font-size: 12px;
  display: flex;
  margin-right: 10px;
  align-items: center;
  padding: 0px 10px;
`;

const BottomTwo = styled.div`
  font-size: 12px;
  display: flex; 
  flex-grow:1;
  align-items: center;
`;

const ImageList = styled.div`
  margin-left: 10px;
  font-size: 12px;
  display: flex;
  width: 50%;
  justify-content: space-around;
`;

const BottomThree = styled.div`
  font-size: 12px;
  align-items: center;
  display: flex;
  margin-right: 10px;
`;
const BottomFour = styled.div`
  font-size: 12px;
  align-items: center;
  display: flex;
  margin: 0px 10px;
`;