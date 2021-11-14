import styled from "styled-components";

export default function About() {

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

