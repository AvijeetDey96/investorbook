import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client';
import { Container, Row, Col, Button, Box } from 'react-bootstrap';
import search from '../assets/icons/search-icon.png';
import { Link } from "react-router-dom";
import CompanyByInvestorId from './CompanyByInvestorId';
import loader from '../assets/loader/loader.gif';


function Investor() {
  const [limit, setLimit] = useState(6);
  const GET_INVESTORS = gql`
  query GetInvestors {
      investor(limit: ${limit}) {
          id
          name
          photo_thumbnail
      } 
  }
`;
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
      lineHeight: '17px',
      letterSpacing: '0em',
      textAlign: 'left',
      color: '#6C6C6C',
      padding: '0px',
    },
    removeDecoration: {
      textDecoration: 'none',
    },
    searchIcon: {
      float: 'right',
      cursor: 'pointer'
    },
    buttonSpacing: {
      paddingLeft: '38px'
    },

  }

  if (loading) return <span className="centerAligned"> <img src={loader} classname="load" /> <p>loading....</p> </span>;
  if (error) return <p>Error :( {error.message}</p>;
  if (data.investor.length === 0) return <p>The database is empty!</p>
  // console.log(data)

  return (<div>

    <Container fluid>
      <Row>
        <Col xs={4} lg={1} >
          <div className="name">Investors</div>
        </Col>
        <Col xs={6} lg={3} style={styles.buttonSpacing}>
          <Button variant="outline-primary" className="responsiveAdd" style={styles.buttonOutline} onMouseEnter={() => setColour("#ffffff")}
            onMouseLeave={() => setColour("#434FBC")}>Add Investor</Button>
        </Col>

        <Col lg={8} xs={2}><img style={styles.searchIcon} src={search} /></Col>
      </Row>

      <Row style={{ margin: '27px 0' }}>
        <Col style={styles.noPadding} xs={3} >
          NAME
      </Col>
        <Col xs={9} style={styles.noPadding}>INVESTMENTS</Col>
      </Row>
      <hr />
      <div style={styles.investorName}>
        {data.investor.map(({ id, name, photo_thumbnail }) => (
          <>
            <Link to={`/InvDetails/${id}`} style={styles.removeDecoration}>
              <Row style={{ cursor: 'pointer' }}>
                <Col xs={3}>
                  <Row key={id}>
                    <Col lg={3} md={3} xs={12} className="noSpace"> <img style={styles.thumbnail} src={photo_thumbnail} /></Col>
                    <Col lg={9} md={9} xs={6} className="noSpace" style={styles.headingName}> {name}</Col>
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
        <Col lg={2} md={2} xs={8} >Rows Per Page : <select style={{ border:'0'}} onChange={(evt)=>(
               setLimit(evt.target.value)
          )}> 
          <option value={limit} hidden>{limit}</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
          <option value='7'>7</option>
          <option value='8'>8</option>
          <option value='9'>9</option>
          <option value='10'>10</option>
          </select> </Col>
        <Col lg={2} md={2} xs={4}  >1-6 of 1,000  </Col>
      </Row>
    </Container>


  </div>

  )

}

export default Investor;