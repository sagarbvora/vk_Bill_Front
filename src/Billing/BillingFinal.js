import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";
import ReactToPrint from 'react-to-print';
import LOGO from "../assert/images/logo.png";
import {useReactToPrint} from "react-to-print";
import { PrinterOutlined } from '@ant-design/icons';
import "./Billing.scss";
import BillingPage from "./BillingPage";
const BillingFront = (props) =>{
    const [getDetails, setDetails] = useState({});
    const [total, setTotal] = useState(null);
    const componentRef = useRef();
    useEffect(() =>{
        const id = props && props.match.params.id;
        if (id) {
            getCustomerDetails(id)
        }
    },[]);
    const getCustomerDetails = async (id) =>{
       await axios.get(`http://localhost:8000/billing/getDetails/${id}`,
           {headers: {Accept: 'application/json', 'Content-Type': 'application/json'}}).then(res =>{
               console.log(res);
            if (res.status === 200) {
                setDetails(res.data);
                let count = 0;
                res && res.data && res.data.productDetails.length && res.data.productDetails.forEach((item) =>{
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
        }).catch(err =>{
            console.log("Error", err);
        })
    };
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return(
        <div>
            <div className="print mb-2" align="end">
                <button className="btn btn-primary" onClick={handlePrint}><PrinterOutlined style={{fontSize: '18px', paddingRight: "10px"}} />Print</button>
            </div>
            <BillingPage ref={componentRef} getDetails={getDetails} total={total}/>
        </div>
    )
};
export default BillingFront;