import './InvestmentForm.css';
import { useState } from 'react';

const InvestmentForm = (props) => {

    const initialDataValue = {
        'current-savings': 10000,
        'yearly-contribution': 3000,
        'expected-return': 5,
        'duration': 5
    }

    const [userInput, setUserInput] = useState(initialDataValue)

    // const [investmentValue, setInvestmentValue] = useState('');
    // const [yearlyContribution, setYearlyContribution] = useState('');
    // const [expectedReturn, setExpectedReturn] = useState('');
    // const [investmentDuration, setInvestmentDuration] = useState('');

    const submitFormHandler = (event) => {
        event.preventDefault();

        props.getFormData(userInput);
        
    }

    const inputChangeHandler = (input, value) => {
        setUserInput((previousInput) => {
            return {
                ...previousInput,
                [input]: value
            }
        })
    }

    // const getSavingsValue = (event) => {
    //     setInvestmentValue(event.target.value);
    // }

    // const getYearlyContribution = (event) => {
    //     setYearlyContribution(event.target.value);
    // }

    // const getExpectedReturn = (event) => {
    //     setExpectedReturn(event.target.value);
    // }

    // const getInvestmentDuration = (event) => {
    //     setInvestmentDuration(event.target.value);
    // }

    const resetFormHandler = () => {
        setUserInput(initialDataValue)
        props.getFormData(null);
    }

    return (
        <form className="form" onSubmit={submitFormHandler}>
            <div className="input-group">
                <p>
                    <label htmlFor="current-savings">Current Savings ($)</label>
                    <input type="number" id="current-savings" value={userInput['current-savings']} onChange={(event) => inputChangeHandler('current-savings', event.target.value)}/>
                </p>
                <p>
                    <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
                    <input type="number" id="yearly-contribution" value={userInput['yearly-contribution']} onChange={(event) => inputChangeHandler('yearly-contribution', event.target.value)}/>
                </p>
            </div>
            <div className="input-group">
                <p>
                    <label htmlFor="expected-return">
                    Expected Interest (%, per year)
                    </label>
                    <input type="number" id="expected-return" value={userInput['expected-return']} onChange={(event) => inputChangeHandler('expected-return', event.target.value)}/>
                </p>
                <p>
                    <label htmlFor="duration">Investment Duration (years)</label>
                    <input type="number" id="duration" value={userInput['duration']} onChange={(event) => inputChangeHandler('duration', event.target.value)}/>
                </p>
            </div>
            <p className="actions">
                <button type="reset" className="buttonAlt" onClick={resetFormHandler}>
                    Reset
                </button>
                <button type="submit" className="button">
                    Calculate
                </button>
            </p>
      </form>
    )
}

export default InvestmentForm;