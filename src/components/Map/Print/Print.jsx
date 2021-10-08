import { Box, Button, ButtonGroup, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, IconButton, ImageList, ImageListItem, InputLabel, ListSubheader, MenuItem, Paper, Select, Tab, Tabs, TextField, Typography } from "@material-ui/core";
import styled from "styled-components";
import { useState } from 'react';
import Draggable from 'react-draggable';
import { Close } from "@material-ui/icons";

import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

import Config from '../../../config.json';
import { OSM as OSMSource, Stamen as StamenSource, XYZ as XYZSource, ImageWMS as ImageWMSSource, Vector as VectorSource } from 'ol/source/';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import NewPDFPages from './NewPDFPages';


function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function Print({ open, handleClosePrint, mapLayer, resolution }) {
    const classes = useStyles();
    const [title, setTitle] = useState('map title');
    const [description, setDescription] = useState('map description');
    const [legend, setLegend] = useState(false);
    const [size, setSize] = useState('A4');
    const [orientation, setOrientation] = useState('landscape');//landscape
    const [height, setHeight] = useState('500');
    const [clegend, setCLegend] = useState("data:image/png;base64,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");
    const [capture, setCapture] = useState("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaQAAADwCAMAAAB4+uBSAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAADZQTFRF////x8fHxMTEzs7O0tLS2tra5+fn8fHxycnJ5ubm9/f3/Pz819fX4+Pj7e3t7OzszMzMvb29Tvoc/QAADfJJREFUeJztnYl2ozgUREGAwQIM/f8/O3paWGxwYlyva86M7jndccIS+1YkhBCoKDKZTCaTyWQymcx/kvK/DlswArZDddiCEbAdqsMWjIDtUB22YARsh+qwBSNgO1SHLRgB26E6bMEI2A7VYQtGwHaoDlswArZDddiCEbAdqsMWjIDtUB22YARsh+qwBSNgO1SHLRgB26E6bMEI2A7VYQtGwHaoDlswArZDddiCEbAdqsMWjIDtUB22YARsh+qwBSNgO1SHLRgB26E6bMEI2A7VYQtGwHaoDlswArZDddiCEbAdqsMWjIDtUB22YARsh+qwBSNgO1SHLRgB26E6bMEI2A7VYQtGwHaoDlswArZDddiCEbAdqsMWjIDtUB22YARsh+qwBSNgO1SHLRgB26E6bMEI2A7VYQtGwHaoDlswArZDddiCEbAdqsMWjIDtUB22YARsh+qwBSNgO1SHLRgB26E6bMEI2A7VYQtGwHaoDlswArZDddiCEbAdqsMWjIDtUB22YARsh+qwBSNgO1SHLRgB26E6bMEI2A5LY4zq/tmCEagKeo+Lx1R1c2s7zd/CFoxA0885Lp6ubu6t7eU91Jq/ii0YgaafI3zxGcZHiCfQaFZ4PLU4FPU8YULxmezLe7jnkN6jqGfFFx9Xu/XH76HNIb1HUY8gTbdZarfDX26npnVf+hzSe9TkSOXW1eNkj4pPb9uxqaSAjfLdrPYuckhnuOIzS9P6sPj07a2p5+XsaJCfaTbv/q5OHcBKXPF5brst9HYah+rp7HWWJZrNu7/sUwWsEdOc1m5D1R11LhhZfsshvQVrxB9idlhfu5WnfT9G6kTN5h3BKRywknqza6ndusPis8HcZE3FjiGWWCRgJZ3faS+1W3lefDaE5l0FfhsbuHoxoJ1I7XX7pGfblz3F5h3ZLwSwEiMnp/Zji4rNO7JfCGAl/hDTx9eT/Q3yLvr1W3RHHtkvBKwR1waXnYYeBF+qPmbKIb2ANRIPMYN/mUNCgTVSlrOczI5edA4JBdZIGZp3jzWkfvoACTiH9ArWiEvm4XZq15Cs+QDZIIf0CtZI6hjahhSu+f2M2yKHdAzWSLm99pBCah6/wp0r5ZCOwRpxVLJXf3KaqruXTtdj7jmkM7BGHJ0c/W8XQhpzSGdgjZTbaw9PId3qujkZieLJIZ2CNVJKZ1ARh5bsQ5Ia0MxvUsohnYI1UqbmnVwg2oUUruuFXqNjckinYI0IS/NuF9JofnKWQzoFa0SoUsfQUUjd069v6mVIUQ7pFKwRj2ifnkOyh9WdC8bY9XUO6RisEWHtaNg1HO7Sq1Dvf3kYJRRTyiGdgjUi+Ot+xUtIhW2a2/53xzxiky+HdArWiBCqtOrnk9k2bRDKVw7pFKwRT7ru90NI6ziuEGsO6RSsEU+67vc+pH4z1s6vkkM6BWvEY+J1v7ch9bvxkHIcyyGdgjXiSc27tyFV5nmbHNIpWCOeMCi1extS/RyF6fOlilOwRjyhHVC/C2l4TaLLJekUrJGAb9415iWkKfWBHw5YNfny+RlYIxsxt+eQbG26h381nuWQQzoGayQQr/vtQxr9ksG+u2Ush3QM1kggXPfbHZNsbCmY8v44TyGHdAzWSCDec7QJadwsfLNhDukYrJGIv+43pJDu9qXBfUIO6RiskYi/pXxMJ7XVr2+2zCEdgzUS8beUT3/ShaVfk0M6BmskYtbHbOSQAGCNRMx6dS+HBABrJLIZyvBJSPmuihOwRhLrWAZb1b8nDWFBwlOLA2tko8a2t+Pnp/1ADukVrJGFWp4klG/HBIE1siOHhAJrZEcOCQXWyJ75CuhnQbEFIwAr+ffBFoyA7VAdtmAEbIfqsAUjYDtUhy0YAduhOmzBCNgO1WELRsB2qA5bMAK2Q3XYghGwHarDFoyA7VAdtmAEbIfqsAUjYDtUhy0YAduhOmzBCNgO1WELRsB2qA5bMAK2Q3XYghGwHW7QmQqBLRiBiphL1DeVCXrYghF8/qlNs94FNp/ftffxbvHDGzxswQg+/9SmWe95nXHztZixH0C72sEWjODzTy1jiNPd48CQfjUl1gXYghF8/qklpD7eFpZCMl09DPPOcl0bMw9D3Zn07ey+kXUr91OfSDekGciqoSvnoXva1ZDmvopfzXBhMiy2YASff2oX0pjm700h3f3N/4/tkb+3pb/XvPftAWOtDOLvwq3N8lw1/0T9OB2WafvO7VYic7WeLG8rU5pHnIhpLsKO6yvllmYWyKWQhjo+YyuGZIupnqvbbuplmb7qXs/15Fc1ti/ucy0b22aeG+tnpa/jJD61a3/EkB5+Vy4pV1ar+BD4e2iemOlKW5QtGMG1kNw//3hiH5Jpo8xqe6OLlVub5aeDrGpseDJA5ZpwfvaKuxzXjG2j/bn0IZkxHO5MZ6XUxcXxBpru0ny0bMEIroUkNqXB7EOqk7xtu8+FFFsXIl5C8pVZ28fpQ/5YeURUKD2V7MC/nv2kjUIVClcdq9fa7+fKHOlswQguhiQ387k6SEJyhSIdi8xmWl+7TL84S+mxfSgM9hYJqfUuareDyu+2cv8ecfHdl57+FoqbfzJbf2nOYLZgBFdDkomSGuNDehRJnhSUJaT1oRq2LWNIddGvhNLRueRkVR/SuFlu5WjUd3Lgcn8Rs6s2L51HsQUjuByS1GB1JyFNa0h2E9L6d++KgLE2HJKa3YRJLqC7GcOj3kNI3W65rD/10oQYt38AOaTfhiTzuwwifSzS6c6uulueDSnHrBhSua4QZ9C8Fab3i3xIw3pQ8/s0bduFJ4Xaqz1QbMEIPv/US0ju77sXqXMy75sICZukuuqwKmNIrtSlR0bGnrq5eMS2oTQcut7ufolL7SbNBWlNFtf6X9mCEXz+qdeQ5FnR0gQfY5us2RQkeSS7r9rKm5wSpZLUSWeFY7ZxKm3Xfrdpt5X89/Czyw3pYcc2zOLomuQXu1/ZghF8E5L8oftJKdxp7L0Z7TYjd0xy561jc++LqSyXkCTXRzO2a/dfnSY89c1xaTr4XdlYHY5x6rn71fnR2YIRXAqpWV6PoS+g9k+o2XXauFRq6Rdqw9lpDMmdpkoXUj/Na2Nj2a0/k/Ib2eWxXlVcXH82ofoK2S+EK597k0Xqul7bawl/srr+cF34vOqS1vGuzNPXT2ELRnDxo/+M/eiBNXqwBSNQk5NDwqEmp88hwVCTU19sjaFhC0bAdqgOWzACtkN12IIRsB2qwxaMgO1QHbZgBGyH6rAFI/irwqQ/rju4Bt49PfYJ+RQotmAEOBs/IuMi4rXypwXN/qLrtREnJ7AFI4DJ+BlzK9pyc4lwXdDsu7g7P94LBFswApiMX9DVXQ7pChARsd86/Ys/e1km/60hrQvi0K2l83sJ6aVr/QJswQi+VOBVDo++t/e5kwFY7XIpvffDS7qb7ftpMFNflnU/LCHFjboujq8zQ1v0bbOMTpFVKr/tb2cjOYEtGMF3+Xjdj6Kfbm1RNDK+bqm5/Cg5Gdzf3qa+uMkQ4bpolpDauNEgk6K7jVoZkRcvyIaQZNuH2+7LVgRbMILvM5LJR6VWaoPOMN7Oj0Uu/VAFWTjKpFebkNJGnS1CSH0Y+tD4+Wd9SO71VIZtv0qJLRjB1xk1y6ig1o8WDiXF+AGsXRocLvY3Ibn/0kY2hhQup7tUJxNC6or2T1jloKnxAWzBCL74+NFyn17WfkBPF++XaEwsTmG1fhfSMojSxOoujalzSYddyLbx+cbVV0WJLRjB9U8fmPt1OLEPyZ0NyTzAEt12bOvumDRvxmfFY1JaT176kKbNm/zm+iHNLJDrnz4w94tvE9TLkOAqHPo3o8Tv25Cq9UTIhJCWCm1wDb0YUj0kvrl+yBaM4IuP7+nWex1i+TCP3t9wFAtVwFdjS0i7jULVltbzi+Vn96J7GWh0BbZgBN98fm9wSlXV0gyrfWM8vEolpts3HB7pViP3rQ9pqTNl/Io/rNXLcap6XLkvKcEWjOCLjx8VSiu7DGNTQ0gyWVyovlz5CUMj3Y92TXC5JzBt5ENKw1gnaXCEJrgNw8ZNaS+OAg+wBSP4LqEytK6d+2os+lh+wg2Yns6dxrrGddMXdn+e5DYa3Eb3IjbB2+JRGbnp+bY0EDuXXGc6t+3BdPY5pA9TqsO884+lzWb69UgfZjvvq0c6Jt3jaOKw0SSXJaRJFydIbzY3x3Zh1phfz1J7zN9Xiuebz58w9Tg2s+nGdPjftMbM3IxN7QrJ6BoJo8unHrt1I1dSRrdyNbriNoxjHe8sG+vttt+9ObZgBN8ZSITO6mOdsSN7WWEzKLzc/WwzXPxp229gC0bwrYN/PWzBCNgO1WELRsB2qA5bMAK2Q3XYghGwHarDFoyA7VAdtmAEbIfqsAUjYDtUhy0YAduhOmzBCNgO1WELRsB2qA5bMAK2Q3XYghGwHarDFoyA7VAdtmAEbIfqsAUjYDtUhy0YAduhOmzBCNgO1WELRsB2qA5bMAK2Q3XYghGwHarDFoyA7VAdtmAEbIfqsAUjYDtUhy0YAduhOmzBCNgO1WELRsB2qA5bMAK2Q3XYghGwHarDFoyA7VAdtmAEbIfqsAUjYDtUhy0YAduhOmzBCNgO1WELRsB2qA5bMAK2Q3XYghGwHarDFoyA7VAdtmAEbIfqsAUjYDtUhy0YAduhOmzBCNgO1WELRsB2qA5bMAK2Q3XYghGwHarDFoyA7VAdtmAEbIfqsAUjYDtUhy0YAduhOmzBmUwmk8lkMplMJvP/4R/C5v1kw6V38AAAAABJRU5ErkJggg==");


    const handleClose = () => {
        handleClosePrint(false);
    };

    function handlingLegend() {
        setLegend(!legend)
        /*
        var leg = document.getElementById('preview-legend');
        console.log(leg)
        //console.log(leg.clientWidth)
        //console.log(leg.clientHeight)
        const _a4PageSize = { height: 300, width: 250 }

        setTimeout(function () {
            domtoimage
                .toPng(leg, _a4PageSize)
                .then(dataUrl => {
                    //console.log(dataUrl)
                    setCLegend(dataUrl);

                }).catch(err => { console.log(err) });

        }, 800);
        */
    }

    function load_wms_legend() {
        if (typeof (mapLayer) !== 'undefined') {
            //var items=props.presensiDataLast.data;
            if (mapLayer !== null) {

                if (mapLayer.length > 0) {

                    return mapLayer.map((row, index) => {
                        //console.log(row)
                        //console.log(row.layer)

                        var wmsSource = new ImageWMSSource({
                            url: Config.proxy_domain + row.url,
                            params: { 'LAYERS': row.layer },
                            ratio: 1,
                            serverType: row.server,
                            crossOrigin: 'Anonymous'
                        });

                        //var resolution = peta.getView().getResolution();
                        //console.log(resolution)
                        var graphicUrl = wmsSource.getLegendUrl(resolution);
                        //console.log(graphicUrl)


                        if (row.layer) {
                            //<img src={main + "?" + request} alt="alt" />
                            return <Row className="mr-0" key={index}>
                                <Col xs={10} className="ml-2 mt-1 font-11"><b>{row.title}</b>
                                    <br />
                                    <img crossOrigin="Anonymous" referrerPolicy="origin" src={graphicUrl} alt={row.title} onLoad={() => { console.log(this) }} />
                                </Col>
                            </Row>
                        } else {
                            if (row.tipe === 'zip') {
                                return <Row className="mr-0" key={index}>
                                    <Col xs={10} className="ml-2 mt-1 font-11"><b>{row.title}</b> <br />
                                        <div className="border bg-light border-primary" style={{ width: "20px", height: "20px" }}>

                                        </div>
                                    </Col>
                                </Row>
                            } else {
                                return null
                            }
                        }
                    })
                } else {
                    return <p className="pl-2 font-11">no legend</p>
                }
            } else {
                return <p className="pl-2 font-11">no legend</p>
            }
        } else {
            return <p className="pl-2 font-11">no legend</p>
        }
    }


    return (
        <Dialog
            open={open}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
            fullWidth={true}
            maxWidth="md"
        >
            <DialogTitle style={{ cursor: 'move', padding: '5px 10px', backgroundColor: '#f3f3f3' }} id="draggable-dialog-title">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h5 style={{ margin: '0px' }}>Print</h5>
                    <IconButton size="small" onClick={handleClose} >
                        <Close />
                    </IconButton>
                </div>


            </DialogTitle>
            <DialogContent style={{ minHeight: "75vh", padding: '10px' }} >
                <Row className="px-3">
                    <Col className="pt-1 px-1" id="attribute-content">
                        <TextField
                            id="outlined-multiline-static"
                            label="Map Title"
                            defaultValue={title}
                            variant="outlined"
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                            size="small"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col8 className="pt-1 px-1">
                        <img id="preview" width="100%" style={{ border: "solid 1px #000", maxHeight: "250px" }} src={capture} alt="preview" />
                    </Col8>
                    <Col4 className="pt-1 px-1">
                        <p className="font-11 mb-1">Legend</p>
                        <div id="preview-legend" style={{ maxWidth: "200px", overflowX: "hidden", maxHeight: "220px", overflowY: "hidden" }} >
                            {
                                legend ? load_wms_legend() : ""
                            }
                        </div>
                    </Col4>
                </Row>
                <Row className="px-3">
                    <Col2 className="pt-1 px-1" id="attribute-content">

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={legend}
                                    onChange={() => handlingLegend()}
                                    name="legend"
                                    color="primary"
                                />
                            }
                            label="Legend"
                        />
                        <br />
                        <FormControl variant="outlined" fullWidth size="small">

                            <InputLabel id="demo-simple-select-error-label">Size</InputLabel>
                            <Select
                                labelId="demo-simple-select-readonly-label"
                                id="demo-simple-select-readonly"
                                value='A4'
                                label="Size"
                            >
                                <MenuItem value='A4'>A4</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" fullWidth style={{ marginTop: '10px' }} size="small">
                            <InputLabel id="demo-simple-select-error-label">Orientation</InputLabel>
                            <Select
                                labelId="demo-simple-select-readonly-label"
                                id="demo-simple-select-readonly"
                                value='landscape'
                                label="Orientation"
                            >
                                <MenuItem value='landscape'>Landscape</MenuItem>
                            </Select>
                        </FormControl>


                        {
                            /*
                       
                        <Form.Group controlId="formBasicCheckbox" className="pl-1">
                            <Form.Check type="checkbox" label="Legend" checked={legend} onChange={() => handlingLegend()} />
                        </Form.Group>
                        <Form.Control as="select" size="sm" className="mt-2 font-11" value={size} onChange={(e) => setSize(e.target.value)}>
                            <option value="A4">A4</option>
                        </Form.Control>
                        <Form.Control as="select" size="sm" className="mt-2 font-11" value={orientation} onChange={(e) => setOrientation(e.target.value)}>
                            <option value="landscape">Landscape</option>
                        </Form.Control>
                    </Col>
                    <Col lg={6} className="pt-1 px-1" id="attribute-content">
                        <Form.Control as="textarea" rows={5} placeholder="Description" className="font-11" value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                    </Col>
                    <Col lg={3} className="pt-2 px-1" id="attribute-content">

                        <Button size="sm" variant="secondary" block className="font-11 py-0" id="export-pdf">Recapture Map</Button>
                        <PDFDownloadLink document={<NewPDFPages mapLayer={props.mapLayer} height={height} legend={legend} size={size} orientation={orientation} data={capture} dataClegend={clegend} title={title} description={description} />} fileName="CiforMap.pdf" className="font-11 py-0 btn btn-secondary btn-block btn-sm">
                            {({ blob, url, loading, error }) =>
                                loading ? 'updating document..' : 'Download pdf'
                            }
                        </PDFDownloadLink>
                        <Button size="sm" variant="secondary" block className="font-11 py-0" onClick={() => props.setPrinting(false)}>Cancel</Button>
                            */
                        }

                    </Col2>
                    <Col8>
                        <TextField
                            id="outlined-multiline-static"
                            label="Map Description"
                            multiline
                            rows={5}
                            defaultValue={description}
                            variant="outlined"
                            fullWidth
                        />
                    </Col8>
                    <Col2>
                        <ButtonGroup
                            orientation="vertical"
                            color="primary"
                            aria-label="vertical outlined primary button group"
                        >
                            <Button>Recapture Map</Button>
                            <Button>Download PDF</Button>
                            <Button>Cancel</Button>
                        </ButtonGroup>

                    </Col2>

                </Row>
            </DialogContent>

        </Dialog>
    )
}

const Row = styled.div`
  margin:0px;
  display: flex;
`;
const Col = styled.div`
  margin:0px;
  flex-grow: 1;
`;

const Col2 = styled.div`
  margin:5px;
  flex-grow:2;
`;

const Col3 = styled.div`
  margin:5px;
  flex-grow:1;
`;

const Col4 = styled.div`
margin:5px;
flex-grow:4
`;

const Col6 = styled.div`
  margin:5px;
  flex-grow:2;
  flex-shrink:0;
`;


const Col8 = styled.div`
  margin:5px;
  flex-grow:8
`;


/*
{itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img src={item.img} alt={item.title} />
            <ImageListItemBar
              title={item.title}
              subtitle={<span>by: {item.author}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${item.title}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
 <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>

            */