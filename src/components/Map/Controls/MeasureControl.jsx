import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import MapContext from "../MapContext";
import { Control } from 'ol/control';
import Draggable from 'react-draggable';
import { Button, IconButton, MenuItem, TextField } from "@material-ui/core";
import { Close } from "@material-ui/icons";

import { OSM as OSMSource, Stamen as StamenSource, XYZ as XYZSource, ImageWMS as ImageWMSSource, Vector as VectorSource } from 'ol/source/';

import { Image as ImageLayer, Group as LayerGroup, Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';


import { LineString, Polygon, MultiPolygon } from 'ol/geom';
import {
    Style,
    Fill as FillStyle,
    RegularShape as RegularShapeStyle,
    Stroke as StrokeStyle,
    Circle as CircleStyle
} from 'ol/style';
import { getArea, getLength } from 'ol/sphere';
import { unByKey } from 'ol/Observable';

import Overlay from 'ol/Overlay';

import Draw from 'ol/interaction/Draw';


const MeasureControl = ({ setDrawing, setClearMeasurement }) => {
    const { map } = useContext(MapContext);

    const [measurement, setMeasurement] = useState(false);
    const [measuring, setMeasuring] = useState(false);

    const [labelMeasurement, setLabelMeasurement] = useState('Start Measurement');
    const [measurementType, setMeasurementType] = useState(1);


    var draw; // global so we can remove it later
    var sketch;
    var helpTooltip;
    var helpTooltipElement;
    var measureTooltip;
    var measureTooltipElement;
    var continuePolygonMsg = 'Click to continue drawing the polygon, Double click to finish';
    var continueLineMsg = 'Click to continue drawing the line, Double click to finish';
    var listener;


    useEffect(() => {
        if (!map) return;

        const measure = document.createElement('div');
        measure.className = 'ol-control ol-unselectable measure';
        measure.innerHTML = '<button title="Measurement"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-rulers" viewBox="0 0 16 16">' +
            '<path d="M1 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h5v-1H2v-1h4v-1H4v-1h2v-1H2v-1h4V9H4V8h2V7H2V6h4V2h1v4h1V4h1v2h1V2h1v4h1V4h1v2h1V2h1v4h1V1a1 1 0 0 0-1-1H1z"/>' +
            '</svg></button>';
        measure.addEventListener('click', function () {
            var cek = document.getElementById("measurement");
            cek.classList.contains('show') ? setMeasurement(false) : setMeasurement(true);
        });

        const measureControl = new Control({
            element: measure
        });

        map.controls.push(measureControl);

        return () => map.controls.remove(measureControl);
    }, [map]);



    function handleStartMeasurement() {

        //measuring = true;
        //map.removeOverlay(helpTooltip)
        //map.removeOverlay(measureTooltip)
        //addInteraction();
        if (measuring) {
            setMeasuring(false);
            setLabelMeasurement('Start Measurement')
            map.getInteractions().forEach((interaction) => {
                if (interaction instanceof Draw) {
                    //  interaction.setActive(false);
                    map.removeInteraction(interaction)
                }
                //console.log(interaction);
            });

            map.removeOverlay(helpTooltip)
            map.removeOverlay(measureTooltip)
            var typeSelect = document.getElementById('type');
            typeSelect.disabled = false;
        } else {
            setMeasuring(true);
            setLabelMeasurement('Finish Measurement');
            map.removeOverlay(helpTooltip)
            map.removeOverlay(measureTooltip)
            var typeSelect = document.getElementById('type');
            typeSelect.disabled = true;
            addInteraction();
            //setDrawing(true)
            //addInteraction();
        }
    }

    function addInteraction() {
        var layers = map.getLayers().getArray();
        //console.log(wms)
        //console.log(layers)
        var idbb = 0;
        layers.forEach(function (l, i) {
            // /console.log(l)
            if (l.get("id") === 'measurement_layer') {
                //console.log(i)
                idbb = i;
            }
        })

        var sourceMeasurement = layers[idbb].getSource()

        var typeSelect = document.getElementById('type');

        var type = typeSelect.value == 'area' ? 'Polygon' : 'LineString';
        draw = new Draw({
            source: sourceMeasurement,
            type: type,
            style: new Style({
                fill: new FillStyle({
                    color: 'rgba(255, 255, 255, 0.2)',
                }),
                stroke: new StrokeStyle({
                    color: 'rgba(140, 228, 250, 0.5)',
                    lineDash: [5, 5],
                    width: 2,
                }),
                image: new CircleStyle({
                    radius: 5,
                    stroke: new StrokeStyle({
                        color: 'rgba(140, 228, 250, 0.7)',
                    }),
                    fill: new FillStyle({
                        color: 'rgba(255, 255, 255, 0.2)',
                    }),
                }),
            }),
        });
        map.addInteraction(draw);

        createMeasureTooltip();
        createHelpTooltip();

        var listener;
        draw.on('drawstart', function (evt) {
            // set sketch
            sketch = evt.feature;

            /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
            var tooltipCoord = evt.coordinate;

            listener = sketch.getGeometry().on('change', function (evt) {
                var geom = evt.target;
                var output;
                if (geom instanceof Polygon) {
                    output = formatArea(geom);
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else if (geom instanceof LineString) {
                    output = formatLength(geom);
                    tooltipCoord = geom.getLastCoordinate();
                }
                measureTooltipElement.innerHTML = output;
                measureTooltip.setPosition(tooltipCoord);
            });
        });

        draw.on('drawend', function () {
            measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
            measureTooltip.setOffset([0, -7]);
            // unset sketch
            sketch = null;
            // unset tooltip so that a new one can be created
            measureTooltipElement = null;
            createMeasureTooltip();
            unByKey(listener);
        });
    }



    function handleClearMeasurement(e) {
        var layers = map.getLayers().getArray();
        //console.log(wms)
        //console.log(layers)
        var idbb = 0;
        layers.forEach(function (l, i) {
            // /console.log(l)
            if (l.get("id") === 'measurement_layer') {
                //console.log(i)
                idbb = i;
            }
        })

        var sourceMeasurement = layers[idbb].getSource()
        sourceMeasurement.clear();
        var elements = document.getElementsByClassName("ol-tooltip-static")
        //console.log(staticTooltip)
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
        //setMeasurementType(e.target.value)
    }

    /**
       * Format length output.
       * @param {LineString} line The line.
       * @return {string} The formatted length.
       */
    var formatLength = function (line) {
        var length = getLength(line);
        var output;
        if (length > 100) {
            var calculation = Math.round((length / 1000) * 100) / 100
            output = calculation.toLocaleString('en-US', { maximumFractionDigits: 2 }) + ' ' + 'km';
        } else {
            var calculation = Math.round(length * 100) / 100
            output = calculation.toLocaleString('en-US', { maximumFractionDigits: 2 }) + ' ' + 'm';
        }
        return output;
    };

    /**
     * Format area output.
     * @param {Polygon} polygon The polygon.
     * @return {string} Formatted area.
     */
    var formatArea = function (polygon) {
        var area = getArea(polygon);
        var output;
        if (area > 10000) {
            var calculation = Math.round((area / 1000000) * 100) / 100
            output = calculation.toLocaleString('en-US', { maximumFractionDigits: 2 }) + ' ' + 'km<sup>2</sup>';
        } else {
            var calculation = Math.round(area * 100) / 100
            output = calculation.toLocaleString('en-US', { maximumFractionDigits: 2 }) + ' ' + 'm<sup>2</sup>';
        }
        return output;
    };


    /**
      * Creates a new help tooltip
      */
    function createHelpTooltip() {
        if (helpTooltipElement) {
            helpTooltipElement.parentNode.removeChild(helpTooltipElement);
        }
        helpTooltipElement = document.createElement('div');
        helpTooltipElement.className = 'ol-tooltip hidden';
        helpTooltip = new Overlay({
            element: helpTooltipElement,
            offset: [15, 0],
            positioning: 'center-left',
        });
        map.addOverlay(helpTooltip);
    }

    /**
     * Creates a new measure tooltip
     */
    function createMeasureTooltip() {
        if (measureTooltipElement) {
            measureTooltipElement.parentNode.removeChild(measureTooltipElement);
        }
        measureTooltipElement = document.createElement('div');
        measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
        measureTooltip = new Overlay({
            element: measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center',
        });
        map.addOverlay(measureTooltip);
    }

    /*
    var type = [{ id: 1, name: "Length (LineString)" }, { id: 2, name: "Area (Polygon)" }]

    //setMeasurementType(type[0])

    function getTypes() {
        if (typeof (type) !== 'undefined') {
            //var items=props.presensiDataLast.data;
            if (type !== null) {
                if (type.length > 0) {
                    return type.map((row, index) => {
                        //console.log(row.id, index)

                        return (<MenuItem key={index} value={row.id}>
                            {row.name}
                        </MenuItem>)
                    })
                }
            } else {
                return <option></option>
            }
        } else {
            return <option></option>
        }
    }
    */
    return (
        <Draggable handle="#draggable-measure" cancel={'[class*="MuiDialogContent-root"]'}>

            <div id="measurement" className={measurement ? 'measurementContainer show' : 'measurementContainer hide'} >

                <Wrapper id="draggable-measure">
                    <Title>Measurement</Title>
                    <IconButton size="small" onClick={() => setMeasurement(false)} >
                        <Close />
                    </IconButton>
                </Wrapper>
                <FormInput>
                    <form className="form-inline">
                        <label htmlFor="type">Measurement type &nbsp;</label>
                        <select id="type">
                            <option value="length">Length (LineString)</option>
                            <option value="area">Area (Polygon)</option>
                        </select>
                    </form>
                    {

                        /*
                            <TextField
                                size="small"
                                id="outlined-select-currency"
                                select
                                fullWidth
                                label="Measurement Type"
                                value={measurementType}
                                onChange={(e) => handleMeasurement(e)}
                            >
                                {
        
                                    getTypes()
        
                                    /*
                                    <MenuItem key={1} value={1}>
                                        Length (LineString)
                                    </MenuItem>
                                    <MenuItem key={2} value={2}>
                                        Area (Polygon)
                                    </MenuItem>
                                    /
                                }
                            </TextField>
                            */
                    }
                </FormInput>
                <ButtonWrapper>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        type="button"
                        style={{ marginBottom: '1em' }}
                        onClick={handleStartMeasurement}
                    >
                        {labelMeasurement}
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        type="button"
                        size="small"
                        onClick={handleClearMeasurement}
                    >
                        Clear Measurement
                    </Button>
                </ButtonWrapper>
            </div>
        </Draggable>
    )
}
export default MeasureControl;


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
  padding-top: 4px;
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
