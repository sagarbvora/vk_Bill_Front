import React, {useState, useEffect, useCallback, useRef } from 'react';
import { jsPDF } from "jspdf";
import { toCanvas } from 'html-to-image';
import LOGO from "../../assert/images/logo.png";
import {apiClient} from "../../api/general";
import {API_URL} from "../../api/config";
import "./Billing.scss";

const BillingFront = (props) =>{
    const [getDetails, setDetails] = useState({});
    const [total, setTotal] = useState(null);
    const ref = useRef(null);
    useEffect(() =>{
        const id = props && props.match.params.id;
        if (id) {
            getCustomerDetails(id)
        }
    },[]);
    const getCustomerDetails = (id) =>{
        const token = localStorage.getItem('token');
        const headers = { Authorization: token ? `Bearer ${token}` : undefined };
        apiClient({
            method: 'GET',
            url: `${API_URL.billing.getUserBill}/`+ id,
            data: {},
            headers,
        }).then(res =>{
            if (res) {
                setDetails(res);
                let count = 0;
                res && res.productDetails.length && res.productDetails.forEach((item) =>{
                    const numRate = Number((item && item.rate.split(",")).join(""));
                    return count += (item.quantity * numRate);
                });
                let value = (count || "").toString();
                let lastThree = value.substring(value.length-3);
                var otherNumbers = value.substring(0, value.length-3);
                if(otherNumbers !== '')
                    lastThree = ',' + lastThree;
                setTotal(otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree);
            }
        }).catch(e =>{
            console.log("Error", e);
        });
    };
     const onButtonClick = useCallback(() => {
        if (ref.current === null) {
          return
        }
        var alias = Math.random().toString(35);
        toCanvas(ref.current, { cacheBust: true, })
          .then((canvas) => {
                 var img = canvas.toDataURL("image/jpeg");
                 const doc = new jsPDF({
                     unit: 'mm',
                     format: 'a4',
                     compress: true
                 });
                var width = doc.internal.pageSize.getWidth();
                var height = doc.internal.pageSize.getHeight();
                doc.addImage(img, 'JPEG', 10, 10, width-20, height-20);
                doc.save('invoice.pdf');
          })
          .catch((err) => {
            console.log(err)
          })
      }, [ref])

    return(
        <div>
            <div className="mt-3">
                <button className="btn btn-primary" onClick={onButtonClick}>Download</button>
            </div>
            <div className="final-print row mb-3 mt-3" id="print">
                <div className="col-sm-3"/>
                <div className="col-sm-6">
                    <div ref={ref}>
                    <div className="card ml-2 mr-2">
                        <div className="card-body">
                            <div className="row bill-header">
                                <div className="col-sm-2 col-md-3 logo">
                                    <img src={LOGO} alt="logo" height="71" className="mt-3"/>
                                </div>
                                <div className="content col-sm-10 col-md-9 justify-content-center">
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
                                                    <td><div>{i + 1}</div></td>
                                                    <td><div>{item.description || "----"}</div></td>
                                                    <td><div>{item.quantity || "0"}</div></td>
                                                    <td><div>{item.rate || "0"}</div></td>
                                                    <td>{otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree}</td>
                                                </tr>)})
                                        }
                                        </tbody>
                                        <img src={LOGO} alt="logo" className="back-logo" height="100" width="150"/>
                                    </table>
                                    <div className="total"><span><b>TOTAL</b></span><span>{total + '/-'}</span></div>
                                    <div className="terms-condition">
                                        <span><b>TERMS & CONDITIONS:</b></span>
                                        <ul>
                                            <li>Warranty as per respective company's Terms & Condition.</li>
                                            <li>No Warranty on Burn or Physically Damaged Goods.</li>
                                            <li>GOODs will be dispatched at buyers risk.</li>
                                        </ul>
                                        <div className="d-flex justify-content-end">
                                            <p><b>Authorised Signatory</b></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3"/>
            </div>
        </div>
    )
};
export default BillingFront;