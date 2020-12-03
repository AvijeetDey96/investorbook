import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Investors from './Investors'
import Companies from './Companies'
import Tabs from "../components/Tabs/Tabs";
const styles = {
   
    blueFont: {
        color: '#4970F8'
    },
    homeMargin: {
        margin: '35px 0px'
    },
    tabStyle: {
        marginTop: '20px',
        marginLeft: '11px',
        fontSize: '15px',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: '14px',
        letterSpacing: '0em',
        textAlign: 'left',
        color:'#A0A0A0'
    }

};

function Home(props) {
    return (

        <Container fluid style={styles.homeMargin} >
            <Row>
                <Col className="heading"><span style={styles.blueFont}>INVESTOR</span>BOOK</Col>
            </Row>
            <Row style={styles.tabStyle}>
                <Tabs >
                    <div label="Investors">  
                        <Investors />
                    </div>
                    <div label="Companies">
                        <Companies />
                    </div>
                </Tabs>
            </Row>
        </Container>

    );
}

export default Home;