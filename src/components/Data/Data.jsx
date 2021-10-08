import { Button, Checkbox, Divider, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Popover, Typography } from "@material-ui/core";
import styled from "styled-components";
import { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { GetApp, ListAlt, MoreVert, ZoomIn } from "@material-ui/icons";

import Metadata from './Metadata';

export default function Data({ setBrowseData, setImportData, mapLayer, deleteDataset, handleVisible }) {

  const [checked, setChecked] = useState([0]);
  const [anchorEl, setAnchorEl] = useState(null);
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
    setRow(row)
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  function getListLayers() {
    if (mapLayer !== 'undefined') {

      if (mapLayer.length > 0) {

        return mapLayer.map((row, index) => {
          //console.log(row)
          //console.log(row.id.includes('uploader'))
          //onChange={(e) => props.setLayerVisible(row.id)}

          const labelId = `checkbox-list-label-${index}`;
          return (
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

            </ListItem>
          )
        })
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

          {
            /*
            [0, 1, 2, 3].map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="comments">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })
          */}
        </List>
        <Popover
          id={id}
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
          }
          <List component="nav" aria-label="main mailbox folders">
            <ListItem button style={{paddingTop:"0px", paddingBottom:"0px"}}>
              <ListItemIcon style={{minWidth: '40px'}}>
                <ZoomIn />
              </ListItemIcon>
              <ListItemText primary="Zoom To" />
            </ListItem>
            <ListItem button style={{paddingTop:"0px", paddingBottom:"0px"}} onClick={()=>setShowMetadata(true)}>
              <ListItemIcon style={{minWidth: '40px'}}>
                <ListAlt />
              </ListItemIcon>
              <ListItemText primary="View Metadata" />
            </ListItem>
           
            <ListItem button style={{paddingTop:"0px", paddingBottom:"0px"}} >
              <ListItemIcon style={{minWidth: '40px'}}>
                <GetApp />
              </ListItemIcon>
              <ListItemText primary="KML" />
            </ListItem>

            <ListItem button style={{paddingTop:"0px", paddingBottom:"0px"}}>
              <ListItemIcon style={{minWidth: '40px'}}>
                <GetApp />
              </ListItemIcon>
              <ListItemText primary="Original" />
            </ListItem>

            <ListItem button style={{paddingTop:"0px", paddingBottom:"0px"}}>
              <ListItemIcon style={{minWidth: '40px'}}>
                <GetApp />
              </ListItemIcon>
              <ListItemText primary="Pdf" />
            </ListItem>

            <ListItem button style={{paddingTop:"0px", paddingBottom:"0px"}}>
              <ListItemIcon style={{minWidth: '40px'}}>
                <GetApp />
              </ListItemIcon>
              <ListItemText primary="Shapefile" />
            </ListItem>
          </List>
        </Popover>

      </DataContent>
      <Metadata open={showMetadata} row={row} handleCloseMetadata={(e) =>handleCloseMetadata(e)}/>
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
const TitleDataContent = styled.h5`
  margin:0px;
  color:#888;
`;