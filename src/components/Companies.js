import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client';
import { Container, Row, Col, Button } from 'react-bootstrap';
import search from '../assets/icons/search-icon.png';
import InvestorsByCompanyId from './InvestorsByCompanyId';
import loader from '../assets/loader/loader.gif';

const Companies = () => {
    const [limit, setLimit] = useState(6);
    const GET_COMPANIES = gql`
    query GetCompanies {
        company(limit:${limit}) {
            id
            name
        }
    }
  `;

    const { loading, error, data } = useQuery(GET_COMPANIES);
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
            color: '#000000',
            float: 'left'
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
            float: 'left',

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
        buttonSpacing: {
            paddingLeft: '56px'
        },
        centerAligned: {
            textAlign: 'center',
            display: 'block',
            margin: '0 auto'
        }
    }
    if (loading) return <span className="centerAligned"> <img src={loader} classname="load" /> <p>loading....</p> </span>;
    if (error) return <p>Error :( {error.message}</p>;
    if (data.company.length === 0) return <p>The database is empty!</p>
    console.log(data)

    return (<div>
        <Container fluid>
            <Row>
                <Col xs={4} lg={1}>
                    <div className="name">Companies</div>
                </Col>
                <Col xs={6} lg={3} style={styles.buttonSpacing}>
                    <Button variant="outline-primary" style={styles.buttonOutline} className="responsiveAdd" onMouseEnter={() => setColour("#ffffff")}
                        onMouseLeave={() => setColour("#434FBC")}>Add Company</Button>
                </Col>

                <Col lg={8} xs={2}><img style={{ float: 'right', cursor: 'pointer' }} src={search} /></Col>
            </Row>

            <Row style={{ margin: '27px 0' }}>
                <Col style={styles.noPadding} xs={4} lg={3}>
                    NAME
        </Col>
                <Col xs={8} lg={9} style={styles.noPadding}>INVESTORS</Col>
            </Row>
            <hr />
            <Container fluid style={styles.investorName}>
                {data.company.map(({ id, name }) => (
                    <>
                        <Row style={{ cursor: 'pointer' }}>
                            <Col xs={4} lg={3} >
                                <Row key={id}>
                                    {/* <Col lg={3} md={3} xs={3}> <img style={styles.thumbnail} src={photo_thumbnail} /></Col> */}
                                    <Col style={styles.headingName}> {name}</Col>
                                </Row>
                            </Col>
                            <Col xs={8} lg={9} style={styles.investmentsCard}>
                                <InvestorsByCompanyId comId={id} />
                            </Col>
                        </Row>
                        <br />
                        <hr />
                    </>
                ))}
            </Container>
            <Row style={{ color: 'black' }}>
                <Col lg={8} md={8} xs={0}></Col>
                <Col lg={2} md={2} xs={9}>Rows Per Page :  <select style={{ border: '0' }} onChange={(evt) => (
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
                </select>  </Col>
                <Col lg={2} md={2} xs={3}  >1-6 of 1,000  </Col>
            </Row>
        </Container>


    </div>

    )

}

export default Companies;