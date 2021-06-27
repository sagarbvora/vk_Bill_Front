import React from "react";
import LOGO from "../assert/images/logo.png";

class BillingPage extends React.Component {
    constructor(props){
        super(props);
        this.state ={}
    }
    render() {
        const {getDetails, total} = this.props;
        return(
            <div className="final-print row d-flex justify-content-center mt-3">
                <div className="col-sm-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="row bill-header">
                                <div className="col-sm-2 col-md-2 logo">
                                    <img src={LOGO} alt="logo" height="71"/>
                                </div>
                                <div className="content col-sm-10 col-md-10 justify-content-center">
                                    <h4 className="heading-vk">VK-ENTERPRISE</h4>
                                    <p>Shop No. 1, Dan Ashish Soc., Gate No.3, Chikuwadi Road, Katargam, Surat-395004</p>
                                    <p><b>Contact Us : 87806 30940</b></p>
                                </div>
                            </div>
                            <div className="row invoice">
                                <div className="col-sm-12 col-md-12 text-center">
                                    <span>RETAIL INVOICE</span>
                                </div>
                            </div>
                            <div className="row customer-details">
                                <div className="col-sm-12 col-md-6 bill-to">
                                    <h6>BILL TO</h6>
                                    <p><b>Kunal Vora</b></p>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <span>Address:</span>
                                        </div>
                                        <div className="col-md-9">
                                            <span>Shop No. 1, Dan Ashish Soc., Gate No.3, Chikuwadi Road, Katargam, Surat-395004</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h6>SHIP TO</h6>
                                    <p><b>{getDetails && getDetails.name || "-" }</b></p>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <span>Address:</span>
                                        </div>
                                        <div className="col-md-9">
                                            <span>{getDetails && getDetails.address || "-"}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <span>Date:</span>
                                        </div>
                                        <div className="col-md-9">
                                            <span>{getDetails && getDetails.date || "-"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row product-details">
                                <div className="col-md-12">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>S.No.</th>
                                            <th>DESCRIPTION</th>
                                            <th>QUANTITY</th>
                                            <th>RATE</th>
                                            <th>AMOUNT</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            getDetails && getDetails.productDetails && getDetails.productDetails.length && getDetails.productDetails.map((item, i) => {
                                                const numRate = (item.quantity) * Number((item && item.rate.split(",")).join(""));
                                                let value = (numRate || "").toString();
                                                let lastThree = value.substring(value.length-3);
                                                var otherNumbers = value.substring(0, value.length-3);
                                                if(otherNumbers !== '')
                                                    lastThree = ',' + lastThree;
                                                return (<tr key={i} style={{"borderBottom": "none"}}>
                                                    <td>{i + 1}</td>
                                                    <td>{item.description || "----"}</td>
                                                    <td>{item.quantity || "0"}</td>
                                                    <td>{item.rate || "0"}</td>
                                                    <td>{otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree}</td>
                                                </tr>)})
                                        }
                                        </tbody>
                                        <img src={LOGO} alt="logo" className="back-logo" height="100" width="150"/>
                                    </table>
                                    <div className="total"><span><b>TOTAL</b></span><span>{total || "0"}</span></div>
                                    <div className="terms-condition">
                                        <span><b>TERMS & CONDITIONS:</b></span>
                                        <ul>
                                            <li>Warranty as per respective company's Terms & Condition.</li>
                                            <li>No Warranty on Burn or Physically Damaged Goods.</li>
                                            <li>Your payment </li>
                                            <li>GOODs will be dispatched at buyers risk.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default BillingPage;