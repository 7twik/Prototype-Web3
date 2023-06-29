import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Hawker from "./Hawker";
import Customer from "./Customer";

const HomePage = () => {
  const myStorage = window.localStorage;
  const customerRef = React.useRef();
  const hawkerRef = React.useRef();
    const [state, setState] = React.useState(0);
  const handleCustomerSubmit = async () => {
    console.log("C: " + customerRef.current.value);
    myStorage.setItem("customer", customerRef.current.value);
    console.log("C2: " + myStorage.getItem("customer"));
    // await storage(myStorage.getItem("hawker"), myStorage.getItem("customer"));
    //window.location.replace("http://localhost:5173/Customer");
    setState(1);
  };
  const handleHawkerSubmit = async () => {
    console.log("H: " + hawkerRef.current.value);
    myStorage.setItem("hawker", hawkerRef.current.value);
    console.log("H2: " + myStorage.getItem("hawker"));
    //await storage(myStorage.getItem("hawker"), myStorage.getItem("customer"));
    //window.location.replace("http://localhost:5173/Hawker");
    setState(2);
  };
  return (
    <>{(state===0)?  <div>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Customer">
           
          <div>
            <input autoFocus placeholder="Enter your name" ref={customerRef} />
            <button onClick={handleCustomerSubmit}>Submit</button>
          </div>
        </Tab>
        <Tab eventKey="profile" title="Hawker">
       
          <div>
            <input type="text" placeholder="Enter your name" ref={hawkerRef} />
            <button onClick={handleHawkerSubmit}>Submit</button>
          </div>
        </Tab>
      </Tabs>
    </div>: (state===1)?<Customer Ncame={myStorage.getItem("customer")} />:<Hawker Ncame={myStorage.getItem("hawker")} />}</>
  );
};

export default HomePage;
