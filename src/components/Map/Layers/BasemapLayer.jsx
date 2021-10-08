import { useContext, useEffect } from "react";
import MapContext from "../MapContext";
import OLTileLayer from "ol/layer/Tile";
import { osm, gray, natgeo, ocean, street, topo, imagery, stamen } from "./Basemap";

const BasemapLayer = ({ basemap, zIndex = 0 }) => {
    const { map } = useContext(MapContext);

    function getBasemap() {
        //console.log(basemap);
        switch (basemap) {
            case 'osm':
                return osm();
            case 'gray':
                return gray();
            case 'ocean':
                return ocean();
            case 'natgeo':
                return natgeo();
            case 'street':
                return street();
            case 'topo':
                return topo();
            case 'imagery':
                return imagery();
            case 'stamen':
                return stamen();
            default:
                return osm();
        }
    }

    useEffect(() => {
        if (!map) return;
        let source = getBasemap()

        let tileLayer = new OLTileLayer({
            source,
            zIndex,
        });

        map.addLayer(tileLayer);

        return () => {
            if (map) {
                map.removeLayer(tileLayer);
            }
        };
    }, [map]);

    useEffect(() => {
        if (!map) return;
        let layers = map.getLayers().getArray()
        layers[0].setSource(getBasemap());
    }, [basemap]);

    return null;
};
export default BasemapLayer;