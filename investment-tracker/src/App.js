import Header from './Components/Header';
import InvestmentForm from './Components/InvestmentForm';
import Investments from './Components/Investments';
import { useState } from 'react';

function App() {

  recharge.init({
    storeIdentifier: 'storeIdentifier', // On Shopify this should be your myshopify.com domain
    // required for Storefront API access
    storefrontAccessToken: 'strfnt_554203ce53bad182ba44191d756e3cfab233446a5a396bf366e4bc2ee8eaaf7a',
    appName: 'appName',
    appVersion: '1.0.0',
    loginRetryFn: () => {
      return recharge.auth.sendPasswordlessCodeAppProxy('mmiljus@rechargeapps.com', {
        send_email: true,
        send_sms: true,
      }).then(session => {
        // do anything you want with the session here
        console.log(session, 'session');
        return session;
      });
    }
  });

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
      <InvestmentForm getFormData={calculateHandler}/>

      {/* Todo: Show below table conditionally (only once result data is available) */}
      {/* Show fallback text if no data is available */}
      {!userInputData && noDataToShow}
      {userInputData && <Investments data={yearlyData} initialInvestment={userInputData['current-savings']}/>}
    </div>
  );
}

export default App;
