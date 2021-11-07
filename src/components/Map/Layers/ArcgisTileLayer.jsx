import { useContext, useEffect } from "react";
import MapContext from "../MapContext";

import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";

const ArcgisTileLayer = ({ url, id, visible }) => {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;
    var wmsSource = new XYZ({
      url: url + "/tile/{z}/{y}/{x}",
      crossOrigin: "Anonymous"
    });

    var xyzLayer = new TileLayer({
      source: wmsSource,
      visible: visible
    })
    /*
    var esriSource = new ImageArcGISRest({
      //Config.proxy_domain + 
      ratio: 1,
      params: {},
      url: url,
    });
    var esriLayer = new ImageLayer({
      source: esriSource
    })
    */
    xyzLayer.set('id', id);
    map.addLayer(xyzLayer);

    return () => {
      if (map) {
        map.removeLayer(xyzLayer);
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
export default ArcgisTileLayer;