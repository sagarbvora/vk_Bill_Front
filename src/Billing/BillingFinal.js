import React, {useState, useEffect} from 'react';
import axios from "axios";
import LOGO from "../assert/images/logo.png";
import "./Billing.scss";
const BillingFront = (props) =>{
    const [getDetails, setDetails] = useState({});
    useEffect(() =>{
        const id = props && props.location && props.location.state && props.location.state.id;
        if (id) {
            getCustomerDetails(id)
        }
    },[]);
    const getCustomerDetails = async (id) =>{
       await axios.get(`http://localhost:8000/billing/getDetails/${id}`,  {headers: {Accept: 'application/json', 'Content-Type': 'application/json'}}).then(res =>{
            if (res.status === 200) {
                setDetails(res.data);
            }
        }).catch(err =>{
            console.log("Error", err);
        })
    };
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
                            {/*<div className="col-sm-12 col-md-1">*/}
                            {/*    <label>S.No.</label>*/}
                            {/*    <p>1</p>*/}
                            {/*</div>*/}
                            {/*<div className="col-sm-12 col-md-5">*/}
                            {/*    <label>ITEMS</label>*/}
                            {/*    <p>A.C</p>*/}
                            {/*</div>*/}
                            {/*<div className="col-sm-12 col-md-2">*/}
                            {/*    <label>QUANTITY</label>*/}
                            {/*    <p>1</p>*/}
                            {/*</div>*/}
                            {/*<div className="col-sm-12 col-md-2">*/}
                            {/*    <label>RATE</label>*/}
                            {/*    <p>45000</p>*/}
                            {/*</div>*/}
                            {/*<div className="col-sm-12 col-md-2">*/}
                            {/*    <label>AMOUNT</label>*/}
                            {/*    <p>45000</p>*/}
                            {/*</div>*/}


                            <div className="col-md-12">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>S.No.</th>
                                            <th>ITEMS</th>
                                            <th>QUANTITY</th>
                                            <th>RATE</th>
                                            <th>AMOUNT</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>A.C</td>
                                            <td>1</td>
                                            <td>40000</td>
                                            <td>40000</td>
                                        </tr>
                                    </tbody>
                                    <img src={LOGO} alt="logo" className="back-logo" height="100" width="150"/>
                                </table>
                                <div className="total"><span><b>TOTAL</b></span><span>40000</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default BillingFront;