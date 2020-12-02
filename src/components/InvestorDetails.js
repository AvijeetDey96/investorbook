import React from 'react';
import { Container, Row, Col,Button } from 'react-bootstrap';
import back from '../assets/icons/back.png';
import remove from '../assets/icons/delete-icon.png';
import edit from '../assets/icons/edit-icon.png';
 import AddModal from './Common/AddInvestorModal'
 import { Link  } from "react-router-dom";
  import { useQuery, gql } from '@apollo/client';
const GET_INVESTOR_DETAILS = gql`
  query GetInvestorDetails($investor_id: Int!) {
    investment(where: { investor_id:{_eq:  $investor_id} }) {
      company_id
      investor_id 
      amount
      company{ 
        id 
        name
      }
      investor{
          name
          photo_large
      }
    }
  }
`;
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
        color: '#A0A0A0'
    },
    nameTag: {
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '24px',
        lineHeight: '22.08px',
        letterSpacing: '0.18em',
    },
    subDetails: {
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '15px',
        lineHeight: '13.8px',
    },
    thumbnail: {
        borderRadius: '50%',
        width: '60px'
    },
    blueColor: {
        color: '#333FAD'
    },
    pointer: {
        cursor: 'pointer'
         },
    tableRow: {

        fontSize: '12px',
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: '11px',
        letterSpacing: '0.07em',
        textAlign: 'left',
        color: '#797979'
    },
    tableColumn: {
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: '13px',
        letterSpacing: '0em',
        textAlign: 'left'

    },
    columnBorder:{
        borderBottom: '1px solid #EEEEEE',
      marginTop: '25px',
    //   width: '80%',
      textAlign: 'center',
    }
};

function InvestorDetails(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const investorId =props.match.params.id 
    const details = useQuery(GET_INVESTOR_DETAILS, {
        variables: { investor_id: investorId },
    });
    if (details.loading) return <p>Loading...</p>;
    if (details.error) return <p>Error :( {details.error.message}</p>;
    if (details.data.investment.length === 0) return <p>The database is empty!</p>
    const name = details.data.investment[0].investor.name;
    const avatar = details.data.investment[0].investor.photo_large;
    let totalAmount = 0;
    const totalInvestment =()=>{  
        details.data.investment.map(({amount})=>{
            totalAmount = totalAmount + amount;
        })
        return totalAmount;
    }
   
     return (
        <>
            <AddModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                data ={details.data}
            />
            <Container style={styles.homeMargin}>
                <Row>
                    <Col style={styles.heading}><span style={styles.blueFont}>INVESTOR</span>BOOK</Col>
                </Row>
            </Container>
            <br /><br />
            <Container fluid>
                <Row >
                    <Col lg={1} md={1} xs={1}><Link to='/Home'><img src={back} alt="back"  style={styles.pointer}/></Link> &nbsp;<img style={styles.thumbnail} src={avatar} alt="avatar" /></Col>
                    <Col lg={3} md={3} xs={3} > <span style={styles.nameTag} >{name}</span> <br /> <span style={styles.subDetails}>Total Amount Invested: ${ totalInvestment()}</span></Col>
                    <Col lg={4} md={4} xs={4}></Col>
                    <Col lg={2} md={2} xs={2} style={styles.subDetails}><img src={edit} alt="edit" />&nbsp;EDIT NAME</Col>
                    <Col lg={2} md={2} xs={2} style={styles.subDetails}><img src={remove} alt="remove" />&nbsp;REMOVE INVESTOR</Col>
                </Row>
                <br /><br />
                <Row >
                    <Col lg={1} md={1} xs={1}  ></Col>
                    <Col lg={1} md={1} xs={1} ><span style={styles.subDetails}>Investments</span></Col>
                    <Col lg={2} md={2} xs={2} style={styles.pointer} ><span onClick={() => setModalShow(true)} style={styles.subDetails, styles.blueColor}>+ Add Investments
                    
                    </span></Col>
                    <Col></Col>
                </Row>
                <br />
                <Row style={styles.columnBorder}>
                    <Col lg={1} md={1} xs={1} ></Col>
                    <Col lg={4} md={4} xs={4} style={styles.tableRow}>NAME</Col>
                    <Col lg={4} md={4} xs={4} style={styles.tableRow}>AMOUNT</Col>
                    <Col lg={3} md={3} xs={3} style={styles.tableRow}> ACTIONS</Col>
                    <br/><br/>
                </Row>
                 
                 
                 {
                    details.data.investment.map(({amount,company})=>(
                        <Row style={styles.columnBorder}>
                            <br/>
                            <br/>
                        <Col lg={1} md={1} xs={1} ></Col>
                        <Col lg={4} md={4} xs={4} style={styles.tableColumn}>{company.name}</Col>
                        <Col lg={4} md={4} xs={4} style={styles.tableColumn}>${amount}</Col>
                        <Col lg={3} md={3} xs={3} style={styles.tableColumn}> <img src={edit} alt="edit" />&nbsp;&nbsp;<img src={remove} alt="remove" /></Col>
                        <br/>
                        <br/>
                    </Row>
                    ))
                    }
                   
                 

            </Container>
        </>
    );
}

export default InvestorDetails;