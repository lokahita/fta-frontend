import XYZ from "ol/source/XYZ";

function street() {
    return new XYZ({
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
        attributions: 'Tiles World Street © <a target="_blank" href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer">ArcGIS</a>',
        crossOrigin: "Anonymous"
    })
}

export default street;