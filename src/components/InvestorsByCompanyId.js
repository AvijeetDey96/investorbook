import React from 'react';
import { useQuery, gql } from '@apollo/client';
const GET_INVESTORS_FROM_COMPANY_ID = gql`
  query GetCompanies($company_id: Int!) {
    investment(where: { company_id:{_eq:  $company_id} }) {
      company_id
      investor_id 
      investor{ 
        id 
        name
      }
    }
  }
`;
function InvestorsByCompanyId(props) {
    const investorNames = useQuery(GET_INVESTORS_FROM_COMPANY_ID, {
        variables: { company_id: props.comId },
    });
    if (investorNames.loading) return <p>Loading...</p>;
    if (investorNames.error) return <p>Error :( {investorNames.error.message}</p>;
    if (investorNames.data.investment.length === 0) return <p>The database is empty!</p>
    return (<>
        {investorNames.data.investment.map(({ investor_id, investor }) => (
            <span key={investor_id}>{investor.name}, &nbsp;</span>
        ))}
    </>)
}

export default InvestorsByCompanyId;