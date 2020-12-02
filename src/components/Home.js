import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Investors from './Investors'
import Companies from './Companies'
import Tabs from "../components/Tabs/Tabs";
const styles = {
    heading: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '20px',
        lineHeight: '18px',
        letterSpacing: '0.18em',
    },
    blueFont: {
        color: '#4970F8'
    },
    homeMargin: {
        margin: '35px'
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

        <Container style={styles.homeMargin}>
            <Row>
                <Col style={styles.heading}><span style={styles.blueFont}>INVESTOR</span>BOOK</Col>
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