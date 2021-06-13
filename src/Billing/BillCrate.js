import React, {useState} from "react";
import { Form, Input, InputNumber, Button, Row, Col, Divider,DatePicker } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "./Billing.scss";

const initArray  = [{
    description: "",
    quantity: null,
    rate: null,
    amount: null
}];
const BillCreate = () =>{
    const [customer, setCustomer] = useState({
        name: "",
        address: "",
        createDate: ""
    });
    const [productData, setProduct] = useState(initArray);
    const history = useHistory();
    const [form] = Form.useForm();
    const add = ()=>{
        form.setFieldsValue({"productData":[...productData,{description:'',quantity:'', rate: null, amount: null}]});
        return setProduct([...productData,{description:'',quantity:'', rate: null, amount: null}])
    };
    const del = (index)=>{
        form.setFieldsValue({"productData":[...productData.slice(0,index),...productData.slice(index+1)]});
        return setProduct([...productData.slice(0,index),...productData.slice(index+1)])
    };

    const onChange = (index,name,event)=>{
        let tempArray = [...productData];
        tempArray[index] = {...tempArray[index], [name]:event.target.value};
        return setProduct(tempArray)
    };
    const handleChange = (e, date, dateString) =>{
        const { name, value } = e.target;
        setCustomer({
            ...customer,
            [name]: name === "createDate" ? dateString : value
        })
    };
    const productDataItems = productData.map((item,index)=>{
        return <Row key={index}>
            <Col span={24}><h6>NO. Of Row {index + 1}</h6></Col>
            <Col span={24}>
                <label><b>Description</b></label>
                <Form.Item name={['productData',index,'description']}>
                    <Input.TextArea onChange={(event)=>onChange(index,'description',event)}/></Form.Item>
            </Col>
            <Col span={24}>
                <label><b>Quantity</b></label>
                <Form.Item name={['productData',index,'quantity']} >
                    <InputNumber name="quantity"
                                 onChange={(value)=>onChange(index,'quantity',{target:{name: "quantity", value}})}/>
                </Form.Item>
            </Col>
            <Col span={24}>
                <label><b>Rate</b></label>
                <Form.Item name={['productData',index,'rate']}>
                    <InputNumber name="rate"
                                 onChange={(value)=>onChange(index,'rate',{target:{name: "rate", value}})}/></Form.Item>
            </Col>
            <Col span={24}>
                <label><b>Amount</b></label>
                <Form.Item name={['productData',index,'amount']}>
                    <InputNumber name="amount"
                                 onChange={(value)=>onChange(index,'amount',{target:{name: "amount", value}})}/></Form.Item>
            </Col>
            {(index > 0) && <Col span={24} className="remove-btn">
                <Button type="primary" onClick={()=>del(index)}><MinusOutlined /></Button>
            </Col>}
        </Row>
    });

    const submitForm = () =>{
        customer.productDetails = productData || [];
        axios.post("http://localhost:8000/billing/create", customer,  {headers: {Accept: 'application/json', 'Content-Type': 'application/json'}}).then(res =>{
            if (res.status === 200) {
                console.log("Success");
                // history.push("/");
            }
        }).catch(err =>{
            console.log("Error", err);
        })
    };

    return (
        <div className="row billing d-flex justify-content-center mt-5">
            <div className="col-sm-12 col-md-6">
                <Form name="user_form" form={form} layout={'horizontal'} onFinish={submitForm} initialValues={{productData:productData}}>
                    <div>
                        <label><b>Customer Name:</b></label>
                        <Form.Item rules={[{ required: true, message: 'Name is required!'}]}>
                            <Input name="name" onChange={handleChange}/>
                        </Form.Item>
                    </div>
                    <div>
                        <label><b>Customer Address:</b></label>
                        <Form.Item rules={[{ required: true }]}>
                            <Input.TextArea name="address" onChange={handleChange   }/>
                        </Form.Item>
                    </div>
                    <div>
                        <label>Start Date</label>
                        <Form.Item>
                            <DatePicker className="w-100"
                                        name="createDate"
                                        value={customer && customer.createDate && moment(customer.createDate, "DD-MM-YYYY")}
                                        format="DD-MM-YYYY"
                                        onChange={(date, dateString) =>handleChange({target: {name: "createDate"}}, date, dateString)}
                            />
                        </Form.Item>
                    </div>
                    <Divider orientation="left"><b>Product Details</b></Divider>
                    <div>
                        {/*<label><b>Product Details :</b></label>*/}
                        <Form.Item>
                            {productDataItems}
                             <Button type="primary" onClick={add}><PlusOutlined /></Button>
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <Button type="primary" htmlType='submit'>Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
};
export default BillCreate;