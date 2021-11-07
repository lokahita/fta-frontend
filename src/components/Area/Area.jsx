import { Button, Divider, IconButton } from "@material-ui/core";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Visibility, VisibilityOff, ZoomIn } from "@material-ui/icons";


export default function Area({ labelArea, setSelectArea, drawing, setDrawing, bbox, areaName,
  visibleBoundary, setVisibleBoundary, visibleBbox, setVisibleBbox, setZoomBbox }) {
  //console.log(drawing);

  const [label, setLabel] = useState('Draw BBox');
  const [color, setColor] = useState('primary');
  

  useEffect(() => {

    if (drawing) {
      setLabel('Draw Active');
      setColor('secondary');
      //console.log(drawing)
    } else {
      setLabel('Draw BBox');
      setColor('primary');

    }
  }, [drawing]);

  const visibilityBoundaryIcon = visibleBoundary ? <Visibility /> : <VisibilityOff />;
  const visibilityBboxIcon = visibleBbox ? <Visibility /> : <VisibilityOff />;

  return (
    <Container>
      <Divider />
      <TopButton>
        <Button variant="contained" color="primary" size="small" onClick={() => setSelectArea(true)} >
          Select Area
        </Button>
        <Button variant="contained" color={color} size="small" onClick={() => setDrawing(!drawing)}>
          {label}
        </Button>
      </TopButton>
      <Divider />
      <AreaContent>
        <WrapTop>
          <TitleAreaContent>Selected Area:</TitleAreaContent>
          <div>
            <IconButton size="small" onClick={() => setVisibleBoundary(!visibleBoundary)} >
              {visibilityBoundaryIcon}
            </IconButton>
            {
              /*
              <IconButton size="small">
                <ZoomIn />
              </IconButton>
              */
            }
          </div>
        </WrapTop>
        <InfoAreaContent>{labelArea}</InfoAreaContent>
      </AreaContent>
      <Divider />
      <BboxContent>
        <WrapTop>
          <TitleBboxContent>Selected Bounding Box</TitleBboxContent>
          <div>
            <IconButton size="small" onClick={() => setZoomBbox(true)}>
              <ZoomIn />
            </IconButton>
            <IconButton size="small" onClick={() => setVisibleBbox(!visibleBbox)} >
              {visibilityBboxIcon}
            </IconButton>
          </div>
        </WrapTop>
        <InfoBboxContent>
          <Wrapper>
            <Label>Xmin:</Label><Value>{bbox[0].toFixed(2) }</Value>
          </Wrapper>
          <Wrapper>
            <Label>Ymin:</Label><Value>{bbox[1].toFixed(2) }</Value>
          </Wrapper>
          <Wrapper>
            <Label>Xmax:</Label><Value>{bbox[2].toFixed(2) }</Value>
          </Wrapper>
          <Wrapper>
            <Label>Ymax:</Label><Value>{bbox[3].toFixed(2) }</Value>
          </Wrapper>
        </InfoBboxContent>
      </BboxContent>
      <Divider />
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
const AreaContent = styled.div`
  padding: 15px;
`;
const WrapTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TitleAreaContent = styled.h5`
  margin:0px;
  color:#888;
`;
const InfoAreaContent = styled.p`
  margin:0px;
  padding-right: 10px;
  word-break: break-word;
`;
const BboxContent = styled.div`
  padding: 15px;
`;
const TitleBboxContent = styled.h5`
  margin:0px;
  color:#888;
`;
const InfoBboxContent = styled.div`
  margin:0px;
  display: flex;
  flex-direction: column;
`;
const Wrapper = styled.div`
  margin:0px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
`;
const Label = styled.p`
  margin:0px;
  padding: 3px 5px;
  text-align: right;
  width: 60px;
`;
const Value = styled.p`
  margin:0px;
`;