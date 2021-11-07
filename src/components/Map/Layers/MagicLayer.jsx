import { useContext, useEffect } from "react";
import MapContext from "../MapContext";

import OLVectorLayer from "ol/layer/Vector";
import { Vector as VectorSource } from 'ol/source/';

import {
    Style,
    Fill as FillStyle
} from 'ol/style';

const MagicLayer = ({ zIndex = 0 }) => {
    const { map } = useContext(MapContext);


    useEffect(() => {
        if (!map) return;

        var sourceMeasurement = new VectorSource();

        var magicLayer = new OLVectorLayer({
            source: sourceMeasurement,
            zIndex: zIndex,
            style: new Style({
                fill: new FillStyle({
                    color: 'rgba(255, 255, 255, 0)',
                }),
            }),
        });
        magicLayer.set('id', 'magic_layer');
        map.addLayer(magicLayer);
        return () => {
            if (map) {
                map.removeLayer(magicLayer);
            }
        };

    }, [map]);

    return null;
};
export default MagicLayer;