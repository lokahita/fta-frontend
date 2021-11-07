import React, { useContext, useEffect, useState } from "react";
import MapContext from "../MapContext";
import styled from "styled-components";

import Draggable from 'react-draggable';
import { Button, IconButton, MenuItem, TextField } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import {
    Control
} from 'ol/control';
import { OSM as OSMSource, Stamen as StamenSource, XYZ as XYZSource, ImageWMS as ImageWMSSource, Vector as VectorSource } from 'ol/source/';

import { Image as ImageLayer, Group as LayerGroup, Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';

import {
    Style,
    Fill as FillStyle,
    RegularShape as RegularShapeStyle,
    Stroke as StrokeStyle,
    Circle as CircleStyle
} from 'ol/style';

import Draw from 'ol/interaction/Draw';

const DrawingControl = ({ setMapLayer }) => {
    const { map } = useContext(MapContext);

    const [drawing, setDrawing] = useState(false);
    const [drawingO, setDrawingO] = useState(false);

    const [labelDrawing, setLabelDrawing] = useState('Start Drawing');
    const [pointColor, setPointColor] = useState("#FF0000");
    const [strokeColor, setStrokeColor] = useState('#EEFF00');
    const [strokeWidth, setStrokeWidth] = useState(1);
    const [fillColor, setFillColor] = useState('#FFFFFF');
    const [fillColorAlpha, setFillColorAlpha] = useState(1.0);

    var draw; // global so we can remove it later

    useEffect(() => {
        if (!map) return;

        const drawingDiv = document.createElement('div');
        drawingDiv.className = 'ol-control ol-unselectable drawing';
        drawingDiv.innerHTML = '<button title="Draw"><i class="fa fa-pencil"></i></button>';
        drawingDiv.addEventListener('click', function () {
            var cek = document.getElementById("drawing");
            cek.classList.contains('show') ? setDrawing(false) : setDrawing(true);
        });

        const drawingControl = new Control({
            element: drawingDiv
        });
        map.controls.push(drawingControl);
        return () => map.controls.remove(drawingControl);
    }, [map]);



    function handleFillColor(val) {
        setFillColor(val)
        var r = parseInt(val.substr(1, 2), 16)
        var g = parseInt(val.substr(3, 2), 16)
        var b = parseInt(val.substr(5, 2), 16)

        var fill_color_rgba = document.getElementById('fill_color_rgba');
        var a = document.getElementById('fill_color_alpha');
        fill_color_rgba.innerHTML = "rgba(" + r + ", " + g + ", " + b + ", " + a.value + ")";
    }

    function handleFillColorAlpha(val) {
        setFillColorAlpha(val)
        var fill_color = document.getElementById('fill_color');
        var rgb = fill_color.value;
        var r = parseInt(rgb.substr(1, 2), 16)
        var g = parseInt(rgb.substr(3, 2), 16)
        var b = parseInt(rgb.substr(5, 2), 16)

        var fill_color_rgba = document.getElementById('fill_color_rgba');

        fill_color_rgba.innerHTML = "rgba(" + r + ", " + g + ", " + b + ", " + val + ")";
    }

    function handleStartDrawing() {

        if (drawingO) {
            setDrawingO(false);
            setLabelDrawing('Start Drawing')

            var typeSelect2 = document.getElementById('type2');

            // drawing = false;
            //console.log(draw);
            map.getInteractions().forEach((interaction) => {
                if (interaction instanceof Draw) {
                    //  interaction.setActive(false);
                    map.removeInteraction(interaction)
                }
                //console.log(interaction);
            });


            //map.removeOverlay(helpTooltip)
            //map.removeOverlay(measureTooltip)
            var point_color = document.getElementById("point_color")
            var stroke_color = document.getElementById("stroke_color")
            var stroke_width = document.getElementById("stroke_width")
            var fill_color = document.getElementById("fill_color")
            var fill_color_alpha = document.getElementById("fill_color_alpha")
            point_color.disabled = false;
            stroke_color.disabled = false;
            stroke_width.disabled = false;
            fill_color.disabled = false;
            fill_color_alpha.disabled = false;
            typeSelect2.disabled = false;

        } else {
            setDrawingO(true);
            setLabelDrawing('Finish Drawing');
            var typeSelect2 = document.getElementById('type2');
            var point_color = document.getElementById("point_color")
            var stroke_color = document.getElementById("stroke_color")
            var stroke_width = document.getElementById("stroke_width")
            var fill_color = document.getElementById("fill_color")
            var fill_color_alpha = document.getElementById("fill_color_alpha")
            point_color.disabled = true;
            stroke_color.disabled = true;
            stroke_width.disabled = true;
            fill_color.disabled = true;
            fill_color_alpha.disabled = true;
            typeSelect2.disabled = true;
            addInteraction2();
            //setDrawing(true)
            //addInteraction();
        }
    }


    function addInteraction2() {
        var typeSelect2 = document.getElementById('type2');
        var value = typeSelect2.value;
        var point_color = document.getElementById("point_color")
        var stroke_color = document.getElementById("stroke_color")
        var stroke_width = document.getElementById("stroke_width")
        var fill_color_rgba = document.getElementById("fill_color_rgba")
        var sourceDrawing = new VectorSource();

        var vectorDrawing = new VectorLayer({
            source: sourceDrawing,
            zIndex: 901,
            style: new Style({
                fill: new FillStyle({
                    color: fill_color_rgba.innerHTML,
                }),
                stroke: new StrokeStyle({
                    color: stroke_color.value,
                    width: stroke_width.value,
                }),
                image: new CircleStyle({
                    radius: 3,
                    fill: new FillStyle({
                        color: point_color.value,
                    }),
                }),
            }),
        });
        var random = Date.now()
        vectorDrawing.set('id', 'drawing-' + random)

        var layers = map.getLayers().getArray();
        //console.log(layers);
        //console.log(layers[5])
        var idx = 0;
        layers.forEach(function (l, i) {
            //console.log(l)
            if (l instanceof LayerGroup) {
                //console.log(i)
                idx = i;
            }

        })
        var group = layers[idx]
        group.getLayers().array_.push(vectorDrawing)
        map.updateSize();
        
        //map.addLayer(vectorDrawing);
        setMapLayer(oldArray => [...oldArray, { id: 'drawing-' + random, title: value + "-" + random, server: 'local', tipe: 'geojson', url: '', layer: '', original: '', pdf: '', geojson: '', kml: '', gml: '', shp: '', csv: '', excel: '', metadata: false, table: false, visible: true, opacity: 1 }]);


        draw = new Draw({
            source: sourceDrawing,
            type: value,
        });
        map.addInteraction(draw);
    }


    return (
        <Draggable handle="#draggable-drawing" cancel={'[class*="MuiDialogContent-root"]'}>

            <div id="drawing" className={drawing ? 'drawContainer show' : 'drawContainer hide'} >

                <Wrapper id="draggable-drawing">
                    <Title>Drawing</Title>
                    <IconButton size="small" onClick={() => setDrawing(false)} >
                        <Close />
                    </IconButton>
                </Wrapper>
                <FormInput>
                    {
                        /*
                        <TextField
                            size="small"
                            id="outlined-select-currency"
                            select
                            fullWidth
                            label="Drawing Type"
                            value={1}
                        >
                            <MenuItem key={1} value={1}>
                                Point
                            </MenuItem>
                            <MenuItem key={2} value={2}>
                                Linestring
                            </MenuItem>
                            <MenuItem key={3} value={3}>
                                Polygon
                            </MenuItem>
                        </TextField>
                        */
                    }
                    <form className="form-inline">
                        <label htmlFor="type2">Geometry type: &nbsp;</label>
                        <select id="type2" style={{ border: 'solid 1px #ddd;' }}>
                            <option value="Point">Point</option>
                            <option value="LineString">LineString</option>
                            <option value="Polygon">Polygon</option>
                        </select>
                    </form>
                </FormInput>
                <ButtonWrapper>
                    <span><b>Styling Symbology</b></span>
                    <form className="form">
                        <label htmlFor="point_color">Point Color: &nbsp; </label>
                        <input type="color" id="point_color" name="point_color" value={pointColor} onChange={(e) => setPointColor(e.target.value)} />
                        <br />
                        <label htmlFor="stroke_color">Stroke Color: &nbsp;</label>
                        <input type="color" id="stroke_color" name="stroke_color" value={strokeColor} onChange={(e) => setStrokeColor(e.target.value)} />
                        <br />
                        <label htmlFor="stroke_width">Stroke Width: &nbsp;</label>
                        <select id="stroke_width" style={{ border: 'solid 1px #ddd;' }} value={strokeWidth} onChange={(e) => setStrokeWidth(e.target.value)}>
                            <option value="0.5">0.5</option>
                            <option value="1">1</option>
                            <option value="1.5">1.5</option>
                            <option value="2">2</option>
                            <option value="2.5">2.5</option>
                        </select>
                        <br />
                        <label htmlFor="fill_color">Fill Color: &nbsp; <span id="fill_color_rgba">rgba(255, 255, 255, 1)</span></label>
                        <br />
                        <input type="color" id="fill_color" name="fill_color" value="#ffffff" value={fillColor} onChange={(e) => handleFillColor(e.target.value)} />
                        <input className="ml-2" type="range" min="0" max="1" step="0.01" id="fill_color_alpha" value={fillColorAlpha} onChange={(e) => handleFillColorAlpha(e.target.value)} />
                    </form>

                </ButtonWrapper>
                <ButtonWrapper>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        type="button"
                        style={{ marginBottom: '1em' }}
                        onClick={handleStartDrawing}
                    >
                        {labelDrawing}
                    </Button>
                </ButtonWrapper>
            </div>
        </Draggable>
    );
};
export default DrawingControl;

const Wrapper = styled.div`
  padding:5px;
  cursor: move;
  display: flex;
  justify-content: space-between;
  border: 1px solid #ccc;
  background-color:#eee;
`;

const Title = styled.h5`
  margin:0px;
  padding-top:4px;
`;


const FormInput = styled.div`
  margin:10px;
  display: flex;
`;


const ButtonWrapper = styled.div`
  margin:10px;
  display: flex;
  flex-direction: column;
`;
