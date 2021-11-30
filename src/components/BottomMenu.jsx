import styled from "styled-components";
import { Typography, IconButton, Button } from "@material-ui/core";
import logo_fta from "../fta-logo.png";
import { Apps, Help, HelpOutlined, MoreVert } from "@material-ui/icons";
import { useState } from 'react';
import {
    makeStyles,
} from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import logo_cifor from "../logo/CIFOR_green_vlr.png";
import logo_alliance from "../logo/Alliance_logos-ENGLISH.png";
import logo_catie from "../logo/catie.png";
import logo_cirad from "../logo/logo-cirad.png";
import logo_inbar from "../logo/logo-inbar.png";
import logo_tropenbos from "../logo/logo-tropenbos-small.png";
import logo_agroforestry from "../logo/agroforestry.png";

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

export default function NavMenu() {

    const classes = TopUpStyles();

    return (
        <Container style={{ marginTop: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <img src={logo_fta} width="130px" alt="fta logo" title="link to website CGIAR" />
                </Grid>
                <Grid item xs={8}>
                    <p style={{ color: "#a1a1a1", fontSize: "13px" }}>The CGIAR Research Program on Forests, Trees and Agroforestry (FTA) is the world's largest research for development program to enhance the role of forests, trees and agroforestry in sustainable development and food security and to address climate change. CIFOR leads FTA in partnership with ICRAF, the Alliance of Bioversity International and CIAT, CATIE, CIRAD, INBAR and TBI</p>
                    <p style={{ color: "#a1a1a1", fontSize: "13px" }}>FTA's work is supported by the <Link href="http://www.cgiar.org/about-us/our-funders/" target="_blank" underline="none">CGIAR Trust Fund.</Link></p>
                </Grid>
                <Grid item xs={2} >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Button component="a" onClick={() => window.open("https://www.foreststreesagroforestry.org/what-is-fta/")}>About Us</Button>
                        <Button component="a" onClick={() => window.open("https://www.foreststreesagroforestry.org/contact-us/")}>Contact</Button>
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={3} style={{marginTop:"20px"}}>
                <Grid item xs={2} >
                    <span>Led by:</span>
                    <img alt="logo" style={{ maxHeight: "45px" }} src={logo_cifor} width="45px" />
                </Grid>
                <Grid item xs={10} style={{ display: "flex", justifyContent: "space-between", paddingTop:"20px", borderTop:"solid 1px #eee" }}>

                    <span style={{ color: "#a1a1a1", fontSize: "13px" }}>In partnership with:</span>
                    <ImageList>
                        
                        <img alt="logo" style={{ maxHeight: "40px" }} src={logo_agroforestry} />
                        <img alt="logo" style={{ maxHeight: "40px" }} src={logo_alliance} width="110px" />
                        <img alt="logo" style={{ maxHeight: "35px" }} src={logo_catie} />
                        <img alt="logo" style={{ maxHeight: "30px" }} src={logo_cirad} />
                        <img alt="logo" style={{ maxHeight: "50px" }} src={logo_inbar} />
                        <img alt="logo" style={{ maxHeight: "40px" }} src={logo_tropenbos} />
                    </ImageList>
                </Grid>
            </Grid>
            <p style={{ color: "#949494", fontSize: "13px" }}> © 2021 @ CGIAR Research Program - Forests, Trees and Agroforestry <Link href="https://www.cifor-icraf.org/about/privacy-notice/" target="_blank" underline="none" style={{ marginLeft: "15px" }} >Terms of use and privacy notice</Link></p>
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
const ImageList = styled.div`
  margin-left: 10px;
  font-size: 12px;
  display: flex;
  width: 60%;
  justify-content: space-around;
`;
const LeftTopMenu = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
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
