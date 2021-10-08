import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, ImageList, ImageListItem, ImageListItemBar, InputLabel, ListSubheader, MenuItem, Paper, Select, Tab, Tabs, TextField, Typography } from "@material-ui/core";
import styled from "styled-components";
import { useState } from 'react';
import Draggable from 'react-draggable';
import { CheckBox, CheckBoxOutlineBlank, CheckBoxOutlined, CheckCircle, CheckCircleOutlined, Close, Info, StarBorder } from "@material-ui/icons";

import { makeStyles } from '@material-ui/core/styles';

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: "lightgray",
    },
    titleActive: {
        color: "lightgreen",
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
   
}));
export default function Metadata({ open, handleCloseMetadata, row}) {

    const classes = useStyles();

    const [value, setValue] = useState(0);

    const [idCountry, setIdCountry] = useState('');

    const handleChangeSelect = (event) => {
        setIdCountry(event.target.value);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const handleClose = () => {
        handleCloseMetadata(false);
    };


    return (
        <Dialog
            open={open}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
            fullWidth={true}
            maxWidth="xs"
        >
            <DialogTitle style={{ cursor: 'move', padding: '5px 10px', backgroundColor: '#f3f3f3' }} id="draggable-dialog-title">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h5 style={{ margin: '0px' }}>Metadata</h5>
                    <IconButton size="small" onClick={handleClose} >
                        <Close  />
                    </IconButton>
                </div>


            </DialogTitle>
            <DialogContent style={{ minHeight: "42vh", padding: '5px' }} >
                {
                /*
                
                <Row>
                    <Col3>Identifier</Col3>
                    <Col6>{row.identifier}</Col6>
                </Row>
                <Row>
                    <Col3>Title</Col3>
                    <Col6>{row.identifier}</Col6>
                </Row>
                <Row>
                    <Col3>Abstract</Col3>
                    <Col6>{row.identifier}</Col6>
                </Row>
                <Row>
                    <Col3>Organization</Col3>
                    <Col6>{row.identifier}</Col6>
                </Row>
                <Row>
                    <Col3>Keywords</Col3>
                    <Col6>{row.identifier}</Col6>
                </Row>
                <Row>
                    <Col3>Distributions</Col3>
                    <Col6>{row.identifier}</Col6>
                </Row>
                */
                }

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

classes={{
                                    root: {background:'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'},
                                    title: color: '#ff0000',
                                }}
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