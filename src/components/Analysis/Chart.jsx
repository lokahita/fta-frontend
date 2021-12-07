import { Dialog, DialogContent, DialogTitle, IconButton } from "@material-ui/core";
import styled from "styled-components";
import Draggable from 'react-draggable';
import { Close } from "@material-ui/icons";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}



export default function TableView({ open, handleCloseChart, title, id }) {

    const handleClose = () => {
        handleCloseChart(false);
    };



    const options = {
        chart: {
            type: 'column',
            height: 500
        },
        title: {
            text: 'Vegetation Cover'
        },
        xAxis: {
            categories: ['Water', 'Cultivated area', 'Grasses and Shrubs', 'Disturbed Forest', 'Intact Forest'],
            title: {
                text: null
            }
        },
        series: [{
            name: '2000',
            data: [3.64, 6.48, 6.85, 8.43, 74.60]
        }, {
            name: '2019',
            data: [3.64, 8.83, 8.00, 7.71, 71.82]
        }, {
            name: '2038',
            data: [3.64, 9.83, 7.20, 7.53, 71.80]
        }, {
            name: '2057',
            data: [3.64, 9.54, 7.84, 7.79, 71.19]
        }],
    };

    const options2 = {
        chart: {
            type: 'column',
            height: 500
        },
        title: {
            text: 'Borneo Potential Restoration Sites'
        },
        xAxis: {
            categories: ['Description'],
        },
        yAxis: {
            min: 0,
            title: {
                text: 'ha'
            }
        },

        series: [{
            name: 'Burned and ex - mining',
            data: [85500]
        }, {
            name: 'Peat and ex - mining',
            data: [6600]
        }, {
            name: 'Burned and degraded area',
            data: [1122800]
        }, {
            name: 'Peat and degraded area',
            data: [353900]
        }, {
            name: 'Peat and burned area',
            data: [1700500]
        }],
    };


    const options3 = {
        chart: {
            type: 'column',
            height: 500
        },
        title: {
            text: 'Borneo Priority Sites for Restoration'
        },
        xAxis: {
            categories: ['Description']
        },

        yAxis: {
            min: 0,
            title: {
                text: 'ha'
            }
        },

        series: [{
            name: 'Very low priority',
            data: [11900]
        }, {
            name: 'Low priority',
            data: [145800]
        }, {
            name: 'Medium priority',
            data: [1038200]
        }, {
            name: 'High priority',
            data: [1686400]
        }, {
            name: 'Very high priority',
            data: [391100]
        }],
    };

    return (
        <Dialog
            open={open}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
            fullWidth={true}
            maxWidth="sm"

        >
            <DialogTitle style={{ cursor: 'move', padding: '5px 10px', backgroundColor: '#f3f3f3' }} id="draggable-dialog-title">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Chart [{title}] </span>
                    <IconButton size="small" onClick={handleClose} >
                        <Close />
                    </IconButton>
                </div>


            </DialogTitle>
            <DialogContent style={{ maxHeight: "75vh", padding: '10px' }} >

                <TableContainer component={Paper}>
                    {id == 1 &&
                        <HighchartsReact highcharts={Highcharts} options={options} />
                    }
                    {id === 2 &&
                        <HighchartsReact highcharts={Highcharts} options={options2} />
                    }
                    {id === 3 &&
                        <HighchartsReact highcharts={Highcharts} options={options3} />
                    }
                </TableContainer>
            </DialogContent>
        </Dialog>
    )
}

const Wrapper = styled.div`
  margin:0px;
  display: flex;
`;

const LeftContent = styled.div`
  margin:0px;
  flex-grow:1;
  width: 48%;
  max-height: 450px;
  overflow-y: scroll;
  margin-right: 10px;
`;

const RightContent = styled.div`
  margin:0px;
  width: 58%;
  max-height: 450px;
  overflow-y: hidden;
`;

const FormInput = styled.div`
  margin:0px;
  display: flex;
`;

const Label = styled.div`
    width: 150px;
`;
const Entry = styled.div`
    flex-grow: 1;
    display: flex;
`;

const EntryMiddle = styled.div`
    flex-grow: 1;
    padding-right: 10px;
`;