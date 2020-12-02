import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client';
import { Container, Row, Col, Button, Box } from 'react-bootstrap';
import search from '../assets/icons/search-icon.png';
import { Link } from "react-router-dom";
import CompanyByInvestorId from './CompanyByInvestorId';
const GET_INVESTORS = gql`
  query GetInvestors {
      investor(limit: 6) {
          id
          name
          photo_thumbnail
      } 
  }
`;
function Investor() {
  const { loading, error, data } = useQuery(GET_INVESTORS);
  const [colour, setColour] = useState("#434FBC");
  const styles = {
    name: {
      fontSize: '28px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '26px',
      letterSpacing: '0em',
      textAlign: 'left',
      color: '#000000',
    },
    buttonOutline: {
      color: `${colour}`,
      borderColor: `${colour}`,
      padding: '2px 11px'
    },
    noPadding: {
      padding: '0'
    },
    investorName: {
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: '13px',
      letterSpacing: '0em',
      textAlign: 'left',
      color: '#000000'
    },
    thumbnail: {
      borderRadius: '50%'
    },
    headingName: {
      marginTop: '15px',
      padding: '0px',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '14px',
      lineHeight: '13px',
      color: '#000000',

    },
    investmentsCard: {
      fontSize: '12px',
      fontStyle: 'normal',
      lineHeight: '14px',
      letterSpacing: '0em',
      textAlign: 'left',
      color: '#6C6C6C',
      padding: '0px',

    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.message}</p>;
  if (data.investor.length === 0) return <p>The database is empty!</p>
  // console.log(data)

  return (<div>

    <Container fluid>
      <Row>
        <Col xs={1}>
          <div style={styles.name}>Investors</div>
        </Col>
        <Col xs={3} style={{ marginLeft: '20px' }}>
          <Button variant="outline-primary" style={styles.buttonOutline} onMouseEnter={() => setColour("#ffffff")}
            onMouseLeave={() => setColour("#434FBC")}>Add Investor</Button>
        </Col>

        <Col xs={7}><img style={{ float: 'right', cursor: 'pointer' }} src={search} /></Col>
      </Row>

      <Row style={{ margin: '27px 0' }}>
        <Col style={styles.noPadding} xs={3}>
          NAME
      </Col>
        <Col xs={9} style={styles.noPadding}>INVESTMENTS</Col>
      </Row>
      <hr />
      <div style={styles.investorName}>
        {data.investor.map(({ id, name, photo_thumbnail }) => (
          <>
            <Link to={`/InvDetails/${id}`}>
              <Row style={{ cursor: 'pointer' }}>
                <Col xs={3}>
                  <Row key={id}>
                    <Col lg={3} md={3} xs={3}> <img style={styles.thumbnail} src={photo_thumbnail} /></Col>
                    <Col lg={9} md={9} xs={9} style={styles.headingName}> {name}</Col>
                  </Row>
                </Col>
                <Col xs={9} style={styles.investmentsCard} key={id}>
                  <CompanyByInvestorId invId={id} />
                </Col>
              </Row>
            </Link>
            <br />
            <hr />
          </>
        ))}
      </div>
      <Row style={styles.investorName}>
        <Col lg={8} md={8} xs={0}></Col>
        <Col lg={2} md={2} xs={6}>Rows Per Page : 6 </Col>
        <Col lg={2} md={2} xs={6}  >1-6 of 1,000  </Col>
      </Row>
    </Container>


  </div>

  )

}

export default Investor;