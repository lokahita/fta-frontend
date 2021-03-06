import styled from "styled-components";
import { fromLonLat } from "ol/proj";
import { Layers, BasemapLayer, VectorLayer, GraticuleLayer } from "./Map/Layers";
import {
  Controls, FullScreenControl, GraticuleControl, ZoomControl, ZoomToExtentControl,
  ScaleLineControl, OverviewMapControl, AttributionControl, MeasureControl,
  IdentifyControl, DrawingControl
} from "./Map/Controls";
import { Interactions, DrawBbox } from "./Map/Interactions";

import Map from "./Map";
import ZoomToMap from './Map/ZoomToMap';
import { vector } from "./Map/Source"
import { Button, ButtonGroup, IconButton } from "@material-ui/core";
import { Close, ExpandLess, ExpandMore, LayersRounded, LocalPrintshop, Print as PrintIcon } from "@material-ui/icons";
import { useRef, useState, useEffect } from "react";

import Basemap from './Map/Basemap';
import Print from './Map/Print/Print';
import BoundaryLayer from "./Map/Layers/BoundaryLayer";
import BBoxLayer from "./Map/Layers/BBoxLayer";
import MeasurementLayer from "./Map/Layers/MeasurementLayer";
import GroupLayer from "./Map/Layers/GroupLayer";
import MagicLayer from "./Map/Layers/MagicLayer";
import IdentifyLayer from "./Map/Layers/IdentifyLayer";
import { ImageWMS as ImageWMSSource } from 'ol/source/';
import Config from '../config.json';

export default function MapContainer({ center, zoom, basemap, setBasemap, bbox, visibleBbox,
  boundary, visibleBoundary, zoomBbox, setZoomBbox, drawing, setBbox, setDrawing, setVisibleBbox,
  setLabelArea, visibleStatistic, mapLayer, setMapLayer, identifierDelete, setIdentifierDelete, visibleAnalysis, buffered,
  zoomToMap, setZoomToMap
}) {
  const basemapRef = useRef();
  const [showBasemap, setShowBasemap] = useState(false);
  const [showMeasurement, setShowMeasurement] = useState(false);
  const [showPrint, setShowPrint] = useState(false);
  const [render, setRender] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  //  const [drawingMeasurement, setDrawingMeasurement] = useState(false);
  //  const [clearMeasurement, setClearMeasurement] = useState(false);
  //  const [measurementType, setMeasurementType] = useState({ id: 1, name: "Length (LineString)" });

  function handleCloseBasemap(e) {
    setShowBasemap(false);
  }
  function handleCloseMeasurement(e) {
    setShowMeasurement(false);
  }

  function handlePrint() {
    setShowPrint(true)
    setRender(true)
  }
  function handleClosePrint(e) {
    setShowPrint(false);
  }

  function closeMenu() {
    var legendContainer = document.getElementById('legendContainer');
    var legendContent = document.getElementById('legendContent');
    if (collapsed) {
      legendContainer.style.width = "200px";
      legendContainer.style.height = "250px";
      setCollapsed(false)
      setTimeout(function () {
        legendContent.style.display = 'block';
      }, 500)
    } else {
      legendContainer.style.width = "115px";
      legendContainer.style.height = "40px";
      setCollapsed(true);
      legendContent.style.display = 'none';
    }

  }


  //<Close fontSize="small" onClick={() => closeMenu()} />
  //ExpandMore

  function load_legend_wms() {
    if (typeof (mapLayer) !== 'undefined') {
      //var items=props.presensiDataLast.data;
      if (mapLayer !== null) {

        if (mapLayer.length > 0) {

          return mapLayer.map((row, index) => {
            // console.log(row)
            //console.log(row.layer)
            //Config.proxy_domain +
            if (row.tipe === "wms") {
              //alert('main')
              //Config.proxy_domain + 
              if (row.server === 'geoserver' && row.visible) {
                var wmsSource = new ImageWMSSource({
                  url: row.url,
                  params: { 'LAYERS': row.layer },
                  ratio: 1,
                  serverType: row.server,
                  crossOrigin: 'Anonymous'
                });

                //var resolution = peta.getView().getResolution();
                //console.log(resolution)
                var graphicUrl = wmsSource.getLegendUrl();

                return (<div key={index} style={{ fontSize: '12px' }}>
                  <b>{row.title}</b>
                  <br />
                  <img src={Config.proxy_domain + graphicUrl} alt={row.title} />
                </div>
                )
              } else if (row.server === 'esri' && row.visible) {

                var url_replace = row.url + "/legend?f=pjson";
                //var src = 'https://geoservices.big.go.id/rbi/rest/services/HIDROGRAFI/GARISPANTAI_50K_2021/MapServer/0/images/208cf6314143ad5675accb3a37e0ca81';
                get_src(url_replace, index);

                return (<div key={index} style={{ fontSize: '12px' }}>
                  <b>{row.title}</b>
                  <br />
                  <img id={"img-" + index} alt={row.title} />
                </div>
                )



              }
            } else if (row.tipe === 'zip' && row.visible) {

              if (row.geom === 'Point') {
                return (<div key={index} style={{ fontSize: '12px' }}>
                  <b>{row.title}</b>
                  <br />

                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", border: '1px solid #ccc', borderColor: '#49a5d2', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>

                  </div>
                </div>
                )
              } else if (row.geom === 'LineString') {
                return (<div key={index} style={{ fontSize: '12px' }}>
                  <b>{row.title}</b>
                  <br />

                  <div style={{ marginTop: '9.5px', marginBottom: '9.5px', width: "20px", height: "1px", border: '0.5px solid #49a5d2', borderColor: '#49a5d2', backgroundColor: '#49a5d2' }}>

                  </div>
                </div>
                )
              }
              else {
                return (<div key={index} style={{ fontSize: '12px' }}>
                  <b>{row.title}</b>
                  <br />

                  <div style={{ width: "20px", height: "20px", border: '1px solid #ccc', borderColor: '#49a5d2', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>

                  </div>
                </div>
                )
              }


            }

            /*
            var wmsSource = new ImageWMSSource({
                url:  row.url,
                params: { 'LAYERS': row.layer },
                ratio: 1,
                serverType: row.server,
                crossOrigin: 'Anonymous'
            });

            //var resolution = peta.getView().getResolution();
            //console.log(resolution)
            var graphicUrl = wmsSource.getLegendUrl(props.resolution);
            //console.log(graphicUrl)


            if (row.layer) {
                //<img src={main + "?" + request} alt="alt" />
                return <Row className="mr-0" key={index}>
                    <Col xs={10} className="ml-2 mt-1 font-11"><b>{row.title}</b>
                        <br />
                        <img crossOrigin="Anonymous" referrerPolicy="origin" src={graphicUrl} alt={row.title} onLoad={() => { console.log(this) }} />
                    </Col>
                </Row>
            } else {
                if (row.tipe === 'zip') {
                    return <Row className="mr-0" key={index}>
                        <Col xs={10} className="ml-2 mt-1 font-11"><b>{row.title}</b> <br />
                            <div className="border bg-light border-primary" style={{ width: "20px", height: "20px" }}>

                            </div>
                        </Col>
                    </Row>
                } else {
                    return null
                }
            }
            */
          })
        } else {
          return <p>{'no legend'}</p>
        }
      }
    }
  }


  function get_src(url, index) {

    const requestOptions = {
      method: 'GET'
    };
    fetch(url, requestOptions).then(res => res.json()).then(data => {
      //console.log(data);
      var img = document.getElementById('img-' + index);
      img.src = url.replace("/legend?f=pjson", "") + '/0/images/' + data.layers[0].legend[0].url;

      //setDataAttribute(data.fields)

    });
    //return src;
  }



  const icon = collapsed ? <ExpandMore fontSize="small" /> : <ExpandLess fontSize="small" />
  return (
    <Map center={fromLonLat(center)} zoom={zoom} basemap={basemap}>
      <ButtonContainer id="buttonContainer">
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button color="primary" startIcon={<LayersRounded />} size="small" onClick={() => setShowBasemap(true)}>Basemap</Button>
        </ButtonGroup>

        <ButtonGroup disableElevation variant="contained" color="primary" style={{ marginLeft: '10px' }}>
          <Button color="primary" startIcon={<LocalPrintshop />} size="small" onClick={() => handlePrint()}>Print Map</Button>
        </ButtonGroup>

      </ButtonContainer>
      <LegendContainer id="legendContainer" className="legendContainer">
        <Closer>
          <Title>Legend</Title>
          <IconButton id="icon" size="small" onClick={() => closeMenu()}>
            {icon}
          </IconButton>
        </Closer>
        <LegendContent id="legendContent">
          {
            load_legend_wms()
          }
        </LegendContent>
      </LegendContainer>

      <Basemap basemap={basemap} setBasemap={setBasemap} open={showBasemap} handleCloseBasemap={(e) => handleCloseBasemap(e)} />
      <Print render={render} setRender={(e) => setRender(e)} open={showPrint} handleClosePrint={(e) => handleClosePrint(e)} mapLayer={mapLayer} />
      <ZoomToMap zoomToMap={zoomToMap} setZoomToMap={setZoomToMap} />
      <Layers>
        <BasemapLayer
          basemap={basemap}
          zIndex={0}
        />
        <GraticuleLayer zIndex={99} />
        <BoundaryLayer zIndex={98} visible={visibleBoundary} boundary={boundary} />
        <BBoxLayer zIndex={97} visible={visibleBbox} bbox={bbox} zoomBbox={zoomBbox} setZoomBbox={setZoomBbox} />
        <MeasurementLayer zIndex={100} />
        <MagicLayer zIndex={101} />
        <IdentifyLayer zIndex={102} />
        <GroupLayer zIndex={11} mapLayer={mapLayer} identifierDelete={identifierDelete} setIdentifierDelete={setIdentifierDelete} />

        {
          /*
    <StatisticLayer zIndex={12} visible={visibleStatistic} />
        <AnalysisLayer zIndex={13} visible={visibleAnalysis} buffered={buffered} />

           <GroupLayer zIndex={11} />
  
          {showLayerStats && (
              <StatistikLayer
                source={vector({ features: new GeoJSON().readFeatures(geojsonObject, { featureProjection: get('EPSG:3857') }) })}
                style={styles.MultiPolygon}
              />
            )}
          <BBoxLayer zIndex={10} visible={true} bbox={bbox} />
          
          <GraticuleLayer />
          showLayer1 && (
              <VectorLayer
                source={vector({ features: new GeoJSON().readFeatures(geojsonObject, { featureProjection: get('EPSG:3857') }) })}
                style={styles.MultiPolygon}
              />
            )}
            {showLayer2 && (
              <VectorLayer
                source={vector({ features: new GeoJSON().readFeatures(geojsonObject2, { featureProjection: get('EPSG:3857') }) })}
                style={styles.MultiPolygon}
              />
              
              <Button color="primary" startIcon={<PrintIcon />} size="small" onClick={() => setShowPrint(true)}>Print Map</Button>
             <FullScreenControl />
            
          <GraticuleControl />
            )
            */
        }
      </Layers>
      <Controls>

        <ZoomControl />
        <ZoomToExtentControl />
        <FullScreenControl />
        <GraticuleControl />
        <ScaleLineControl />
        <OverviewMapControl basemap={basemap} />
        <AttributionControl />
        <MeasureControl
        //measurementType={measurementType} 
        //setMeasurementType={(e)=>setMeasurementType(e)}
        //setDrawing={(e) => setDrawingMeasurement(e)} 
        //setClearMeasurement={(e)=>setClearMeasurement(e)}
        />
        <IdentifyControl mapLayer={mapLayer} />
        <DrawingControl setMapLayer={(e)=>setMapLayer(e)} />
      </Controls>
      <Interactions>
        <DrawBbox drawing={drawing} setBbox={setBbox} setDrawing={setDrawing} setVisibleBbox={setVisibleBbox} setLabelArea={setLabelArea} />
        {
          /*
          <DrawMeasurement drawing={drawingMeasurement} setDrawing={setDrawingMeasurement} 
          clearMeasurement={clearMeasurement} setClearMeasurement={(e)=>setClearMeasurement(e)}
          measurementType={measurementType} 
          />
          */
        }
      </Interactions>

    </Map>
  )
}

const ButtonContainer = styled.div`
    position: absolute;
    z-index:1;
    margin-left: 350px;
    margin-top: 15px;
    color: white;
    transition: 0.8s;
`;

const LegendContainer = styled.div`
    position: absolute;
    right:0;
    z-index:1;
    color: black;
    width:200px; 
    background-color: white;
    margin-top: 15px;
    margin-right: 50px;
    padding:5px;
    border: 1px solid #eee;
    height: 250px;
    transition: all 0.8s;
`;


const Title = styled.h5`
  margin:0px;
  color:#2F4E6F;
`;
const Closer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 5px;
`;

const LegendContent = styled.div`
  margin-top:10px;
  max-height:200px;
  overflow-y: auto;
`;

const StatistikLegendContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const StatistikLabel = styled.div`

`;

const Box1 = styled.div`
  border: 1px solid #ccc;
  background-color:#ffffff;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  margin-bottom: 3px;
`;
const Box2 = styled.div`
  border: 1px solid #ccc;
  background-color: #ffbfbf;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  margin-bottom: 3px;
`;
const Box3 = styled.div`
  border: 1px solid #ccc;
  background-color: #ff8080;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  margin-bottom: 3px;
`;
const Box4 = styled.div`
  border: 1px solid #ccc;
  background-color: #ff4040;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  margin-bottom: 3px;
`;
const Box5 = styled.div`
  border: 1px solid #ccc;
  background-color: #ff0000;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  margin-bottom: 3px;
`;