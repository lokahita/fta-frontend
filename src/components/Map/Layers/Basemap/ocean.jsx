import XYZ from "ol/source/XYZ";

function ocean() {
    return new XYZ({
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}",
        attributions: 'Tiles Ocean © <a target="_blank" href="https://services.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer">ArcGIS</a>',
        crossOrigin: "Anonymous"
    })
}

export default ocean;