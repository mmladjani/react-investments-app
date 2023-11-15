import './Investments.css';

const Investments = (props) => {
    const data = props.data;
    const initialInvestmentValue = props.initialInvestment;

    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    });

    return (
        <table className="result">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Total Savings</th>
                    <th>Interest (Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>
            <tbody>
                {data.map((dataItem) => {
                    return (
                        <tr key={dataItem.year}>
                            <td>{dataItem.year}</td>
                            <td>{currencyFormatter.format(dataItem.savingsEndOfYear)}</td>
                            <td>{currencyFormatter.format(dataItem.yearlyInterest)}</td>
                            <td>{currencyFormatter.format(dataItem.savingsEndOfYear - initialInvestmentValue - dataItem.yearlyContribution * dataItem.year)}</td>
                            <td>{currencyFormatter.format(initialInvestmentValue + dataItem.yearlyContribution * dataItem.year)}</td>
                        </tr>
                    )
                })}
            </tbody>
      </table>
    )
}

export default Investments;