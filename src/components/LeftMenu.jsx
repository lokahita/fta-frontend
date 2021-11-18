import styled, { css } from "styled-components";
import { AspectRatio, BrandingWatermark, BrandingWatermarkOutlined, Description, DescriptionOutlined, HelpOutlined, Home, HomeOutlined, Info, InfoOutlined, Poll, PollOutlined, Settings, SettingsOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";

import Config from '../config.json';

export default function LeftMenu({ menu, setMenu, total }) {
  const handleHelp= (event) => {
    window.open(Config.base_domain + 'help.html')
};



  return (
    <Container>
      <ListMenu>
        <MenuTop>
          {
            /*
            <Menu active={menu === 'home' ? true : false} onClick={() => setMenu('home')} >
              {menu === 'home' ? <Home fontSize="large" /> : <HomeOutlined fontSize="large" />}
              <MenuTitle>Home</MenuTitle>
            </Menu>
            */
          }
          <Menu active={menu === 'area' ? true : false} onClick={() => setMenu('area')} >
            {menu === 'area' ? <AspectRatio fontSize="large" /> : <><AspectRatio fontSize="medium" /><MenuTitle>Study Area</MenuTitle></>}

          </Menu>

          <Menu active={menu === 'data' ? true : false} onClick={() => setMenu('data')}>
            <Badge badgeContent={total} max={10000} color="error" anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }} style={{ marginLeft: '15px', marginBottom: '5px' }}>
            </Badge>
            {menu === 'data' ? <DescriptionIcon fontSize="large" /> : <><DescriptionOutlinedIcon fontSize="medium" /><MenuTitle>Data</MenuTitle></>}

          </Menu>
          
          <Menu active={menu === 'analysis' ? true : false} onClick={() => setMenu('analysis')}>
            {menu === 'analysis' ? <AnalysisIcon fontSize="large" /> : <><AnalysisOutlinedIcon fontSize="medium" /><MenuTitle>Thematic<br/>Analysis</MenuTitle></>}

          </Menu>
        </MenuTop>
        <MenuBottom>
          <Menu active={menu === 'about' ? true : false} onClick={() => setMenu('about')}>
            {menu === 'about' ? <Info fontSize="large" /> : <><InfoOutlined fontSize="medium" /><MenuTitle>About</MenuTitle></>}
          </Menu>
          <Menu onClick={handleHelp}>
            <HelpOutlined fontSize="medium" /><MenuTitle>Help</MenuTitle>
          </Menu>
        </MenuBottom>


      </ListMenu>

    </Container>
  )
}
/*
<Footer>
        <span>powered by 
        <br />SiKaMBInG</span>
      </Footer>
      */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  flex-grow: 1;
  background-color: #eeeeee;
`;


const ListMenu = styled.div`
  display:flex;
  flex-direction: column;
  overflow-y: auto;
  width:70px;
  justify-content: space-between;
  flex-grow: 1;
`;

const MenuTop = styled.div`
  display:flex;
  flex-direction: column;
`;
const MenuBottom = styled.div`
  display:flex;
  flex-direction: column;
`;

const MenuTitle = styled.span`
  font-size: 10px;
  font-weight: 600;
`;

const Menu = styled.div`
  height: 74px;
  margin-bottom: 5px;
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color:#555;

  &:hover{
    color:#000;
    background-color: #ddd;
    font-size: 50px;
  }

  &:active{
      background-color: white;
      color: #2F4E6F;
  }

  ${props => props.active && css`
    background-color: white;
    color: #2F4E6F;
    &:hover{
      background-color: white;
      color: #2F4E6F;
    }
  `}
`;

const WrapperIcon = styled.div`
  border-left: 4px solid #2F4E6F;
  flex:1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DescriptionIcon = styled(Description)``;
const DescriptionOutlinedIcon = styled(DescriptionOutlined)``;

const AnalysisIcon = styled(Settings)``;
const AnalysisOutlinedIcon = styled(SettingsOutlined)``;

const BrandingWatermarkIcon = styled(BrandingWatermark)``;
const BrandingWatermarkOutlinedIcon = styled(BrandingWatermarkOutlined)``;

/*
const StyledA = styled(Description)``

const DescriptionIcon = styled.div`
  ${StyledA} {
    border:solid 1px black;
    color:43
  }
`
*/
