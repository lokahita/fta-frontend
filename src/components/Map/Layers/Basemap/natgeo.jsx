import XYZ from "ol/source/XYZ";

function natgeo() {
    return new XYZ({
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
        attributions: 'Tiles Natgeo World © <a target="_blank" href="https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer">ArcGIS</a>',
        crossOrigin: "Anonymous"
    })
}

export default natgeo;