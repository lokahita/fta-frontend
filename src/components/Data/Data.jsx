import {
  Button, Checkbox, Divider, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Popover,
  Typography
} from "@material-ui/core";
import Slider from '@material-ui/core/Slider';
import styled from "styled-components";
import { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { GetApp, ListAlt, MoreVert, ZoomIn } from "@material-ui/icons";

import Metadata from './Metadata';

export default function Data({ setBrowseData, setImportData, mapLayer, deleteDataset, handleVisible, setZoomToMap, handleOpacity}) {

  const [checked, setChecked] = useState([0]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [id, setId] = useState(null);
  const [row, setRow] = useState(null);

  const [showMetadata, setShowMetadata] = useState(false);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setId(row.id)
    setRow(row)
    console.log(row)
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSetZoomMap = () => {
    setZoomToMap(id);
    setAnchorEl(null);
  }

  const handleSetMetadata = () => {
    setShowMetadata(true)
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const idpop = open ? 'simple-popover' : undefined;


  function getListLayers() {
    if (mapLayer !== 'undefined') {

      if (mapLayer.length > 0) {

        return mapLayer.map((row, index) => {
          //console.log(row)
          //console.log(row.id.includes('uploader'))
          //onChange={(e) => props.setLayerVisible(row.id)}

          const labelId = `checkbox-list-label-${index}`;
          return (
            <>
              <ListItem key={index} role={undefined} dense button style={{ padding: '0px' }}>
                <ListItemIcon style={{ minWidth: '16px' }}>
                  <Checkbox
                    edge="start"
                    checked={row.visible}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    onClick={() => handleVisible(row.id)}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${row.title}`} style={{ fontSize: '10px', maxWidth: '185px' }} />
                <ListItemSecondaryAction style={{ right: '0px' }}>
                  <IconButton edge="end" aria-label="comments" onClick={() => deleteDataset(row.id)} >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="comments" onClick={(e) => handleClick(e, row)} >
                    <MoreVert />
                  </IconButton>
                </ListItemSecondaryAction>
                <br />
              </ListItem>
              <Slider
                value={row.opacity} min={0} max={1} step={0.01}
                onChange={(e, v)=>handleOpacity(row.id, v)}
              />
            </>
          )
        })
        //value={row.opacity} onChange={(e) => props.handleOpacity(row.id, e.target.value)}
      } else {
        return <TitleDataContent>No Layer Added. Browse or Import first.</TitleDataContent>
      }
    }

  }

  function handleCloseMetadata(e) {
    setShowMetadata(e);
  }



  return (
    <Container>
      <Divider />
      <TopButton>
        <Button variant="contained" color="primary" size="small" onClick={() => setBrowseData(true)}>
          Browse
        </Button>
        <Button variant="contained" color="primary" size="small" onClick={() => setImportData(true)}>
          Import
        </Button>
      </TopButton>
      <Divider />
      <DataContent>
        <p style={{ margin: '0px' }}><b>List Layers [{mapLayer.length}] </b></p>
        <List>
          {
            getListLayers()
          }

        </List>
        <Popover
          id={idpop}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >

          {
            //<Typography>The content of the Popover. {identifier}</Typography>
            id &&
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button style={{ paddingTop: "0px", paddingBottom: "0px" }} onClick={() => handleSetZoomMap()}>
                <ListItemIcon style={{ minWidth: '40px' }}>
                  <ZoomIn />
                </ListItemIcon>
                <ListItemText primary="Zoom To" />
              </ListItem>
              {(!id.includes("uploader") && !id.includes("drawing")) &&
                <ListItem button style={{ paddingTop: "0px", paddingBottom: "0px" }} onClick={() => handleSetMetadata()}>
                  <ListItemIcon style={{ minWidth: '40px' }}>
                    <ListAlt />
                  </ListItemIcon>
                  <ListItemText primary="View Metadata" />
                </ListItem>
              }
              {(!id.includes("uploader") && !id.includes("drawing")) && row.kml &&
                <ListItem button style={{ paddingTop: "0px", paddingBottom: "0px" }} onClick={() => window.open(row.kml)}>
                  <ListItemIcon style={{ minWidth: '40px' }}>
                    <GetApp />
                  </ListItemIcon>
                  <ListItemText primary="KML" />
                </ListItem>
              }
              {(!id.includes("uploader") && !id.includes("drawing")) && row.gml &&
                <ListItem button style={{ paddingTop: "0px", paddingBottom: "0px" }} onClick={() => window.open(row.gml)}>
                  <ListItemIcon style={{ minWidth: '40px' }}>
                    <GetApp />
                  </ListItemIcon>
                  <ListItemText primary="GML" />
                </ListItem>
              }
              {(!id.includes("uploader") && !id.includes("drawing")) && row.shp &&
                <ListItem button style={{ paddingTop: "0px", paddingBottom: "0px" }} onClick={() => window.open(row.shp)}>
                  <ListItemIcon style={{ minWidth: '40px' }}>
                    <GetApp />
                  </ListItemIcon>
                  <ListItemText primary="SHP" />
                </ListItem>
              }
              {
                /* 
                (!id.includes("uploader") && !id.includes("drawing")) && row.original &&
              <ListItem button style={{paddingTop:"0px", paddingBottom:"0px"}} onClick={() => window.open(row.original)}>
                <ListItemIcon style={{minWidth: '40px'}}>
                  <GetApp />
                </ListItemIcon>
                <ListItemText primary="Original" />
              </ListItem>
              */
              }
              {(!id.includes("uploader") && !id.includes("drawing")) && row.pdf &&
                <ListItem button style={{ paddingTop: "0px", paddingBottom: "0px" }} onClick={() => window.open(row.pdf)}>
                  <ListItemIcon style={{ minWidth: '40px' }}>
                    <GetApp />
                  </ListItemIcon>
                  <ListItemText primary="Pdf" />
                </ListItem>
              }
              {(!id.includes("uploader") && !id.includes("drawing")) && row.geojson &&
                <ListItem button style={{ paddingTop: "0px", paddingBottom: "0px" }} onClick={() => window.open(row.geojson)}>
                  <ListItemIcon style={{ minWidth: '40px' }}>
                    <GetApp />
                  </ListItemIcon>
                  <ListItemText primary="Geojson" />
                </ListItem>
              }
              {(!id.includes("uploader") && !id.includes("drawing")) && row.csv &&
                <ListItem button style={{ paddingTop: "0px", paddingBottom: "0px" }} onClick={() => window.open(row.csv)}>
                  <ListItemIcon style={{ minWidth: '40px' }}>
                    <GetApp />
                  </ListItemIcon>
                  <ListItemText primary="CSV" />
                </ListItem>
              }
              {(!id.includes("uploader") && !id.includes("drawing")) && row.excel &&
                <ListItem button style={{ paddingTop: "0px", paddingBottom: "0px" }} onClick={() => window.open(row.excel)}>
                  <ListItemIcon style={{ minWidth: '40px' }}>
                    <GetApp />
                  </ListItemIcon>
                  <ListItemText primary="Excel" />
                </ListItem>
              }

            </List>
          }
        </Popover>

      </DataContent>
      <Metadata open={showMetadata} id={id} handleCloseMetadata={(e) => handleCloseMetadata(e)} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopButton = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-evenly;
`;

const DataContent = styled.div`
  padding: 15px;
  max-height:68vh;
  overflow-y: auto;
  overflow-x: hidden;
`;
const TitleDataContent = styled.p`
  margin:0px;
  color:#888;
`;