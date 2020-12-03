import React from 'react';
import { Container, Row, Col,Button } from 'react-bootstrap';
import back from '../assets/icons/back.png';
import remove from '../assets/icons/delete-icon.png';
import edit from '../assets/icons/edit-icon.png';
 import AddModal from './Common/AddInvestorModal'
 import { Link  } from "react-router-dom";
  import { useQuery, gql } from '@apollo/client';
  import loader from '../assets/loader/loader.gif';
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
        color: '#333FAD',
        fontSize: '15px',
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
    // columnBorder:{
    //     borderBottom: '1px solid #EEEEEE',
    //   marginTop: '25px',
    //   textAlign: 'center',
    // }
};

function InvestorDetails(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const investorId =props.match.params.id 
    const details = useQuery(GET_INVESTOR_DETAILS, {
        variables: { investor_id: investorId },
    });
    if (details.loading) return <span className="centerAligned"> <img src={loader} /> <p>loading....</p> </span>;
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
            <Container fluid style={styles.homeMargin}>
                <Row>
                    <Col className="heading"><span style={styles.blueFont}>INVESTOR</span>BOOK</Col>
                </Row>
            </Container>
            
            <Container fluid>
                <Row >
                    <Col lg={1} md={1} xs={5}><Link to='/Home'><img src={back} alt="back"  style={styles.pointer}/></Link> &nbsp;<img style={styles.thumbnail} src={avatar} alt="avatar" /></Col>
                    <Col lg={3} md={3} xs={7} > <span style={styles.nameTag} className="MobileName" >{name}</span> <br /> <div style={styles.subDetails} className="mobileSubDetails noDisplay">Total Amount Invested: ${ totalInvestment()}</div></Col>
                    <Col lg={4} md={4} xs={12}> <div style={styles.subDetails} className="mobileSubDetails showDisplay">Total Amount Invested: ${ totalInvestment()}</div></Col>
                    <Col lg={2} md={2} xs={12} style={styles.subDetails} className="mobileSubDetails"><img src={edit} alt="edit" />&nbsp;EDIT NAME</Col>
                    <Col lg={2} md={2} xs={12} style={styles.subDetails} className="mobileSubDetails"><img src={remove} alt="remove" />&nbsp;REMOVE INVESTOR</Col>
                </Row>
                <br /><br />
                <Row >
                    <Col lg={1} md={1} xs={0}  ></Col>
                    <Col lg={1} md={1} xs={6} ><span style={styles.subDetails}>Investments</span></Col>
                    <Col lg={2} md={2} xs={6} style={styles.pointer} ><span onClick={() => setModalShow(true)}  style={ styles.blueColor}>+ Add Investments
                    
                    </span></Col>
                    <Col></Col>
                </Row>
                <br />
                <Container className="leftMargin">  
                <Row style={styles.columnBorder}>
               
                    <Col lg={4} md={4} xs={4} style={styles.tableRow}>NAME</Col>
                    <Col lg={4} md={4} xs={4} style={styles.tableRow} className="centerText">AMOUNT</Col>
                    <Col lg={4} md={4} xs={4} style={styles.tableRow} className="rightAligned"> ACTIONS</Col>
                    <br/><br/>
                </Row>
                 <hr/>
                  
                 {
                    details.data.investment.map(({amount,company})=>(
                    <>
                        <Row >
                        <Col lg={4} md={4} xs={4} style={styles.tableColumn} >{company.name}</Col>
                        <Col lg={4} md={4} xs={4} style={styles.tableColumn} className="centerText">${amount}</Col>
                        <Col lg={4} md={4} xs={4} style={styles.tableColumn} className="rightAligned"> <img src={edit} alt="edit" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src={remove} alt="remove" /></Col>
                        <br/>
                        <br/>
                    </Row>
                    <hr />
                    </>
                    ))
                    }
                   </Container> 
                 

            </Container>
        </>
    );
}

export default InvestorDetails;