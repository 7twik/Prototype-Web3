import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Hawker from "./Hawker";
import Customer from "./Customer";
import Download from "./Download";
import useEth from "../contexts/EthContext/useEth"; 
import NoticeWrongNetwork from "./NoticeWrongNetwork";

const HomePage = () => {
  const myStorage = window.localStorage;
  const customerRef = React.useRef();
  const hawkerRef = React.useRef();
  const { ethereum } = window;
  const [meta, setmeta] = React.useState(0);
  const [statee, setState] = React.useState(0);
  const { state } = useEth();
  const handleCustomerSubmit = async () => {
    console.log("C: " + customerRef.current.value);
    myStorage.setItem("customer", customerRef.current.value);
    console.log("C2: " + myStorage.getItem("customer"));
    setState(1);
  };

  

  const handleHawkerSubmit = async () => {
    console.log("H: " + hawkerRef.current.value);
    myStorage.setItem("hawker", hawkerRef.current.value);
    console.log("H2: " + myStorage.getItem("hawker"));
    setState(2);
  };



  React.useEffect(() => {
      if (ethereum) {
        setmeta(1);
      }
      else
        setmeta(0);    
  })

  return (
    <>{(!state.contract)? <NoticeWrongNetwork />:<></>}
    {(meta == 0) ? <Download /> : (statee === 0) ? <div>
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
    </div> : (statee === 1) ? <Customer Ncame={myStorage.getItem("customer")} /> : <Hawker Ncame={myStorage.getItem("hawker")} />}</>
  );
};

export default HomePage;
