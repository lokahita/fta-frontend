import { useContext, useEffect } from "react";
import MapContext from "../MapContext";

import Image from "ol/layer/Image";
import ImageWMSSource from "ol/source/ImageWMS";

const GeonodeWMSLayer = ({ url, id, layer, visible }) => {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;

    var wmsForestSource = new ImageWMSSource({
      ratio: 1,
      params: {'LAYERS': layer},
      url: url,
      serverType: 'geoserver',
      crossOrigin: 'anonymous'
    })

    var forestLayer = new Image({
      source: wmsForestSource,
      visible: visible
    })
 
    forestLayer.set('id', id);
    map.addLayer(forestLayer);

    return () => {
      if (map) {
        map.removeLayer(forestLayer);
      }
    };
  }, [map]);

  
  useEffect(() => {
    if (!map) return;
    let layers = map.getLayers().getArray();
    //console.log(layers);
    //console.log(layers[5])
    var idx = 0;
    layers.forEach(function (l, i) {
        // /console.log(l)
        if (l.get("id") === id) {
            //console.log(i)
            idx = i;
        }

    })
   layers[idx].setVisible(visible);
    //layers[1].setSource(getBasemap());
}, [visible]);
  return null;
};
export default GeonodeWMSLayer;