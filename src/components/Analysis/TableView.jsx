import { Dialog, DialogContent, DialogTitle, IconButton} from "@material-ui/core";
import styled from "styled-components";
import Draggable from 'react-draggable';
import { Close} from "@material-ui/icons";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}



export default function TableView({ open, handleCloseTable, title, id}) {

    const handleClose = () => {
        handleCloseTable(false);
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
                        <span>Data Table [{title}] </span>
                        <IconButton size="small" onClick={handleClose} >
                            <Close />
                        </IconButton>
                    </div>


                </DialogTitle>
                <DialogContent style={{ maxHeight: "75vh", padding: '10px' }} >
                
                            <TableContainer component={Paper}>
                                { id == 1 &&
                                <Table aria-label="simple table">
                                    <TableHead style={{ backgroundColor: "#ddd" }}>
                                        <TableRow>
                                            <TableCell>Year</TableCell>
                                            <TableCell>Water</TableCell>
                                            <TableCell>Cultivated Area</TableCell>
                                            <TableCell>Grasses and Shrubs</TableCell>
                                            <TableCell>Disturbed Forest</TableCell>
                                            <TableCell>Intact Forest</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      
                                        <TableRow key="4">
                                            <TableCell scope="row">
                                                2000
                                            </TableCell>
                                            <TableCell>
                                                3.64%
                                            </TableCell>
                                            <TableCell>
                                                6.48%
                                            </TableCell>
                                            <TableCell>
                                                6.85%
                                            </TableCell>
                                            <TableCell>
                                                8.43%	
                                            </TableCell>
                                            <TableCell>
                                                74.60%
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key="4">
                                            <TableCell scope="row">
                                                2019
                                            </TableCell>
                                            <TableCell>
                                                3.64%
                                            </TableCell>
                                            <TableCell>
                                                8.83%
                                            </TableCell>
                                            <TableCell>
                                                8.00%
                                            </TableCell>
                                            <TableCell>
                                                7.71%	
                                            </TableCell>
                                            <TableCell>
                                                71.82%
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key="4">
                                            <TableCell scope="row">
                                                2038
                                            </TableCell>
                                            <TableCell>
                                                3.64%
                                            </TableCell>
                                            <TableCell>
                                                9.83%
                                            </TableCell>
                                            <TableCell>
                                                7.20%
                                            </TableCell>
                                            <TableCell>
                                                7.53%	
                                            </TableCell>
                                            <TableCell>
                                                71.80%
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key="4">
                                            <TableCell scope="row">
                                                2057
                                            </TableCell>
                                            <TableCell>
                                                3.64%
                                            </TableCell>
                                            <TableCell>
                                                9.54%
                                            </TableCell>
                                            <TableCell>
                                                7.84%
                                            </TableCell>
                                            <TableCell>
                                                7.79%	
                                            </TableCell>
                                            <TableCell>
                                                71.19%
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                }

                                { id === 2 &&
                                <Table aria-label="simple table">
                                    <TableHead style={{ backgroundColor: "#ddd" }}>
                                        <TableRow>
                                            <TableCell>Description</TableCell>
                                            <TableCell>Ha</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      
                                        <TableRow key="4">
                                            <TableCell scope="row">
                                            Burned and ex - mining
                                            </TableCell>
                                            <TableCell>
                                            85500
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key="4">
                                            <TableCell scope="row">
                                            Peat and ex - mining	
                                            </TableCell>
                                            <TableCell>
                                            6600
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key="4">
                                            <TableCell scope="row">
                                            Burned and degraded area
                                            </TableCell>
                                            <TableCell>
                                            1122800
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key="4">
                                            <TableCell scope="row">
                                            Peat and degraded area
                                            </TableCell>
                                            <TableCell>
                                            353900
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key="4">
                                            <TableCell scope="row">
                                            Peat and burned area
                                            </TableCell>
                                            <TableCell>
                                            1700500
                                            </TableCell>
                                        </TableRow>
                                        </TableBody>
                                </Table>
                                }
                                { id === 3 &&
                                <Table aria-label="simple table">
                                    <TableHead style={{ backgroundColor: "#ddd" }}>
                                        <TableRow>
                                            <TableCell>Description</TableCell>
                                            <TableCell>Ha</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      
                                        <TableRow key="4">
                                            <TableCell scope="row">
                                            Very low priority	
                                            </TableCell>
                                            <TableCell>
                                            11900
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key="4">
                                            <TableCell scope="row">
                                            Low priority		
                                            </TableCell>
                                            <TableCell>
                                            145800
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key="4">
                                            <TableCell scope="row">
                                            Medium priority	
                                            </TableCell>
                                            <TableCell>
                                            1038200
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key="4">
                                            <TableCell scope="row">
                                           High priority	
                                            </TableCell>
                                            <TableCell>
                                            1686400
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key="4">
                                            <TableCell scope="row">
                                            Very high priority
                                            </TableCell>
                                            <TableCell>
                                            391100
                                            </TableCell>
                                        </TableRow>
                                        </TableBody>
                                </Table>
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