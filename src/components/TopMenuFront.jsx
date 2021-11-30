import styled from "styled-components";
import { Typography, IconButton } from "@material-ui/core";
import logo_fta from "../fta-logo.png";
import { Apps, Help, HelpOutlined, MoreVert } from "@material-ui/icons";
import { useState } from 'react';
import {
    makeStyles,
} from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

const TopUpStyles = makeStyles((theme) => ({
    versionHeader: {
        fontWeight: 600,
        color: "#3f7e32",
        fontSize: "25px",
        fontFamily: "Hind, sans-serif",
        marginBottom: "0px"        
    },
    titleHeader: {
        fontWeight: 320,
        color: "#3f7e32",
        fontSize: "17px",
        fontFamily: "Hind, sans-serif",
    },
    title: {
        fontSize: '12px',
    }
}));

export default function TopMenu() {

    const classes = TopUpStyles();

  
   
    return (
        <Container style={{display: "flex", padding:"20px", }}>
            <LeftTopMenu>
                <Typography variant="h3" className={classes.versionHeader}>
                Forests, Trees and Agroforestry
                </Typography>
                <Typography variant="h4" className={classes.titleHeader}>
                Livelihoods, Landscapes and Governance
                </Typography>
            </LeftTopMenu>
           
            <RighTopMenu>
               
                <img src={logo_fta} alt="fta logo" title="link to website CGIAR" width="140px" />


            </RighTopMenu>
        </Container>
    )
}
/*
const Container = styled.div`
  display: flex;
  padding: 5px 15px;
  height: 7.7vh;
  background-color: white;
  border-bottom: 2px solid #3f7e32;
`;
*/
const LeftTopMenu = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left:10px;
`;

const Logo = styled.div`
  padding-left: 5px;
`;


const RighTopMenu = styled.div`
  display:flex;
  flex-grow:1;
  justify-content: flex-end;
`;

const AppContainer = styled.div`
    padding: 0px 10px 10px 10px;
    width: 300px;
`;

const ListApp = styled.ul`
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    padding: 0px;
    justify-content: space-around;
`;

const ItemApp = styled.li`
    width: 80px;
    height: 80px;
    border-radius: 5px;
    border: 1px solid #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 5px;
    cursor: pointer;
    &:hover{
        background-color: #eff;
        box-shadow: 4px 4px 8px 0 rgba(0, 0, 255, 0.2)
    }
`;

const HelpContainer = styled.div`
    width: 200px;
`;
