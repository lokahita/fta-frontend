import React, { useContext, useEffect, useState } from "react";
import { OverviewMap } from "ol/control";
import MapContext from "../MapContext";

import OLTileLayer from "ol/layer/Tile";
import { osm, gray, natgeo, ocean, street, topo, imagery, stamen } from "../Layers/Basemap";

const OverviewMapControl = ({ basemap }) => {
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
    let source = getBasemap()

    var overviewMap = new OverviewMap({
        // see in overviewmap-custom.html to see the custom CSS used
        className: 'ol-overviewmap ol-custom-overviewmap',
        layers: [
            new OLTileLayer({
                source: source
            })
        ],
        collapseLabel: '\u00BB',
        label: '\u00AB',
        collapsed: false,
    });

    useEffect(() => {
        if (!map) return;
      
      
        map.controls.push(overviewMap);

        return () => map.controls.remove(overviewMap);
    }, [map]);

    //var layers_ = controllers[4].getOverviewMap().getLayers().getArray()

    useEffect(() => {
        if (!map) return;
        //let layers = overviewMap.getOverviewMap().getLayers().getArray()
        //console.log(layers)
        var controllers = map.getControls().getArray()
        //console.log(controllers)
        //console.log(overviewMapControl.getOverviewMap().getLayers().getArray())
        //var layers_ = overviewMapControl.getOverviewMap().getLayers().getArray()
        var layers_ = controllers[8].getOverviewMap().getLayers().getArray()

        layers_[0].setSource(getBasemap());
    }, [basemap]);

    return null;
};
export default OverviewMapControl;