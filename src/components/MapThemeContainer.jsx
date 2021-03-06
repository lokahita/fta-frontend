import styled from "styled-components";
import { fromLonLat } from "ol/proj";
import { Layers, BasemapLayer, ArcgisTileLayer, ArcgisWMSLayer, GeonodeWMSLayer } from "./Map/Layers";
import {Controls, ZoomControl, AttributionControl} from "./Map/Controls";
import Map from "./Map/MapThematic";
export default function MapThemeContainer({ center, zoom, basemap, layers}) {
  const url ="https://geonode.cifor.org/geoserver/ows"
  return (
    <Map center={fromLonLat(center)} zoom={zoom} basemap={basemap}>
      <Layers>
        <BasemapLayer
          basemap={basemap}
          zIndex={0}
        />
          <GeonodeWMSLayer url={url} id={'cifor1'} layer={'geonode:KapuasHulu2000_Geo'} visible={layers[0]} />
          <GeonodeWMSLayer url={url} id={'cifor2'} layer={'geonode:KapuasHulu2019_Geo'} visible={layers[1]} />
          <GeonodeWMSLayer url={url} id={'cifor3'} layer={'geonode:KapuasHulu2038_Geo'} visible={layers[2]} />
          <GeonodeWMSLayer url={url} id={'cifor4'} layer={'geonode:KapuasHulu2057_Geo'} visible={layers[3]} />
          <GeonodeWMSLayer url={url} id={'cifor5'} layer={'geonode:site_geo'} visible={layers[4]} />
          <GeonodeWMSLayer url={url} id={'cifor6'} layer={'geonode:priority_site_geo'} visible={layers[5]} />
          
        {
          /*
        <ArcgisTileLayer url={urlCanopyTile} id={'canopy'} visible={layers[0]} />
        <ArcgisTileLayer url={urlPaddyTile} id={'paddy'} visible={layers[1]}  />
        <ArcgisTileLayer url={urlCoffeeDistributionTile} id={'coffe'}  visible={layers[2]}   />
        <ArcgisWMSLayer url={urlShake} id={'shake'} visible={layers[3]}  />
        <ArcgisWMSLayer url={urlForest} id={'forest'} visible={layers[4]}  />
        <ArcgisWMSLayer url={oilPalm} id={'oilPalm'} visible={layers[5]}  />
        <ArcgisWMSLayer url={alertDevegetation} id={'alertDevegetation'} visible={layers[6]}  />
          */
        }
      </Layers>
      <Controls>

        <ZoomControl />
        <AttributionControl />
      
      </Controls>

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