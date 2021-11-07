import { Button, Checkbox, Divider, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import styled from "styled-components";
import { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import logo_cifor from "./logo/CIFOR_green_vlr.png";
import logo_alliance from "./logo/Alliance_logos-ENGLISH.png";
import logo_catie from "./logo/catie.png";
import logo_cirad from "./logo/logo-cirad.png";
import logo_inbar from "./logo/logo-inbar.png";
import logo_tropenbos from "./logo/logo-tropenbos-small.png";
import logo_agroforestry from "./logo/agroforestry.png";


export default function About() {

    const [checked, setChecked] = useState([0]);

    return (
        <Container>
            <DataContent>
                <p style={{ textAlign: 'justify', marginBottom: '5px' }}>
                    The CGIAR Research Program on Forests, Trees and Agroforestry (FTA) is the world's largest research for development program to enhance the role of forests, trees and agroforestry in sustainable development and food security and to address climate change.
                </p>
                <p style={{ textAlign: 'justify' }}>
                    CIFOR leads FTA in partnership with ICRAF, the Alliance of Bioversity International and CIAT, CATIE, CIRAD, INBAR and TBI
                </p>
            </DataContent>
            <BottomContent>
                <BottomOne>
                    <span>Led by:</span>
                    <img alt="logo" style={{ maxHeight: "50px" }} src={logo_cifor} width="50px" />
                </BottomOne>
                <BottomTwo>
                    <span>In partnership with:</span>
                    <ImageList>
                        <img alt="logo" style={{ maxHeight: "40px" }} src={logo_alliance} width="100px" />
                        <img alt="logo" style={{ maxHeight: "30px" }} src={logo_catie} />
                        <img alt="logo" style={{ maxHeight: "30px" }} src={logo_cirad} width="60px" />
                        <img alt="logo" style={{ maxHeight: "30px" }} src={logo_inbar} />
                        <img alt="logo" style={{ maxHeight: "30px" }} src={logo_tropenbos}  />
                        <img alt="logo" style={{ maxHeight: "30px" }} src={logo_agroforestry} />
                    </ImageList>
                </BottomTwo>
                <BottomThree>
                    <span>© 2021 @ CGIAR Research Program - Forests, Trees and Agroforestry</span>
                </BottomThree>
                <BottomFour>
                    <a href="https://www.cifor.org/terms-of-use/" style={{ marginRight: "10px" }}>Term Of Use</a>
                    <a href="https://www.cifor.org/privacy-policy/">Privacy Policy</a>
                </BottomFour>
            </BottomContent>

        </Container>
    )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 85vh;
`;


const DataContent = styled.div`
  padding: 15px;
  overflow-x: hidden;
  font-size: 12px;
`;

const BottomContent = styled.div`
  padding: 15px;
  overflow-x: hidden;
  font-size: 12px;
`;

const BottomOne = styled.div`
  overflow-x: hidden;
  font-size: 12px;
  display: flex;
  flex-direction: column;
`;

const BottomTwo = styled.div`
  overflow-x: hidden;
  font-size: 12px;
  display: flex;
  flex-direction: column;
`;

const ImageList = styled.div`
  overflow-x: hidden;
  font-size: 12px;
  display: flex;
  flex-wrap: wrap;
`;

const BottomThree = styled.div`
  font-size: 12px;
`;
const BottomFour = styled.div`
  font-size: 12px;
`;
