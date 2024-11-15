import Header from './Components/Header';
import InvestmentForm from './Components/InvestmentForm';
import Investments from './Components/Investments';
import { useState, useEffect } from 'react';

const cpSession = {
  apiToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXIiOiIxLjAuMCIsInN0b3JlX2lkIjoxODc3NDQsImFwaV90b2tlbl9pZCI6NzgzNzE1LCJzdG9yZWZyb250X2FjY2Vzc190b2tlbl9pZCI6MTMzNiwiaWF0IjoxNzMxNjkwNTc3LCJleHAiOjE3MzE2OTQxNzcsInNjb3BlcyI6WyJ3cml0ZV9ub3RpZmljYXRpb25zIiwicmVhZF9zdWJzY3JpcHRpb25zIiwid3JpdGVfcGF5bWVudF9tZXRob2RzIiwicmVhZF9naWZ0X3B1cmNoYXNlcyIsInJlYWRfb3JkZXJzIiwicmVhZF9jcmVkaXRfYWNjb3VudHMiLCJyZWFkX2dpZnRfcHJvZHVjdHMiLCJyZWFkX3BheW1lbnRfbWV0aG9kcyIsInJlYWRfc3RvcmUiLCJyZWFkX3Byb2R1Y3RzIiwiY3VzdG9tZXJfcG9ydGFsX2FjY2VzcyIsIndyaXRlX29yZGVycyIsIndyaXRlX2N1c3RvbWVycyIsInJlYWRfY3JlZGl0X3N1bW1hcnkiLCJ3cml0ZV9zdWJzY3JpcHRpb25zIiwic3RvcmVmcm9udF9tZXRhZmllbGRzX2FjY2VzcyIsInJlYWRfY3VzdG9tZXJzIiwid3JpdGVfcGF5bWVudHMiLCJyZWFkX3Byb2R1Y3Rfc2VhcmNoIl0sImN1c3RvbWVyX2lkIjoxMzUyNjUwMTEsInJlZGFjdF9waWkiOnRydWV9.Gpl-z9cZiynKpuemLwiwmg6K8yM92cHSl8Hsrl2aG6pAC23iV0DiAzQg88BcyBjSdRF0bXJZD4JORbjDMAT2L6GSE7mcbUk15M4t9szASQ1LVFoUmHdH6-HKhs_rp3lXH-S_dXGs38_5AWJB-yPB3h4eztxO1gmB2_tOHUxzopDHW8nI7h5btQXnUs8UZNvb7LbAob0JPEAb6LCBGTHhXVF3N1PcTTWKDrpG304yrJ7eDXBjdl6FcSt-NNdzyIG6qaegRGQXFlA5cnaJZXeN2LMCsZmEtQvrFKZjPvRjho1mdj5KyMis0dLzU_71m1cXxyvmPMMeyr1JacQUoS0Pgg",
  customer_id: 135265011
}

function App() {

  const [iframeUrl, setIframeUrl] = useState(null); // State to hold the URL for the iframe

  useEffect(() => {
    const initializeRecharge = async () => {
      // Check if the recharge library is loaded
      if (window.recharge) {
        try {
          // Initialize recharge
          window.recharge.init({
            storeIdentifier: 'headless-a7b770fbbb4448b2a68e4a5d165621f8', // Replace with your actual store identifier
            storefrontAccessToken: 'strfnt_f806b387a3fa1262e0ee98ce853a4b9915b27244d0ccb781a94514fcaf02257c', // Replace with your token
            appName: 'appName',
            appVersion: '1.0.0',
          });

          console.log('Recharge initialized successfully');

          // Run getCustomerPortalAccess after initialization
          const cpSessionData = cpSession; // Replace with your customer portal session token
          const response = await window.recharge.customer.getCustomerPortalAccess(cpSessionData, {
            page_destination: 'overview',
          });

          console.log('Customer Portal Access:', response);

          // Assuming the response contains the URL you need in a property, e.g., `response.url`
          if (response && response.portal_url) {
            setIframeUrl(response.portal_url); // Set the iframe URL in state
          } else {
            console.error('URL not found in response');
          }
        } catch (error) {
          console.error('Error with Recharge operations:', error);
        }
      } else {
        console.error('Recharge script not loaded');
      }
    };

    initializeRecharge();
  }, []);

  const [userInputData, setUserInputData] = useState(null);

  const noDataToShow = <p className='no-data'>There is no data to show...</p>;

  const calculateHandler = (userInput) => {
    console.log(userInput)
    setUserInputData(userInput);
  };

  const yearlyData = []; // per-year results

  if (userInputData){
  // Should be triggered when form is submitted
    // You might not directly want to bind it to the submit event on the form though...

    let currentSavings = +userInputData['current-savings'] // feel free to change the shape of this input object!
    const yearlyContribution = +userInputData['yearly-contribution']; // as mentioned: feel free to change the shape...
    const expectedReturn = +userInputData['expected-return'] / 100;
    const duration = +userInputData['duration'];

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <div>
      <Header />
      <div>
        <h1>Recharge Integration Example</h1>
        {iframeUrl ? (
          <iframe
            src={iframeUrl}
            width="100%"
            height="600"
            style={{ border: 'none' }}
            title="Customer Portal"
          ></iframe>
        ) : (
          <p>Loading customer portal...</p>
        )}
      </div>
      <InvestmentForm getFormData={calculateHandler}/>

      {/* Todo: Show below table conditionally (only once result data is available) */}
      {/* Show fallback text if no data is available */}
      {!userInputData && noDataToShow}
      {userInputData && <Investments data={yearlyData} initialInvestment={userInputData['current-savings']}/>}
    </div>
  );
}

export default App;
