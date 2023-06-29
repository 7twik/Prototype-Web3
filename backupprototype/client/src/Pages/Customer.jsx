import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
const Customer = ({ Ncame }) => {
  const [customer, setCustomer] = React.useState(Ncame);
  const orderRef = React.useRef();
  const phoneRef = React.useRef();
  const mesRef = React.useRef();
  const [NoteIns, setNoteIns] = React.useState(null);
  const [NoteIns2, setNoteIns2] = React.useState(null);
  const [iid,setiid]=React.useState(null);

  const [open, setOpen] = React.useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  React.useEffect(() => {
    if (customer === null || customer === "") {
      window.location.replace("http://localhost:5173/");
    }
  }, [customer]);
  const [per, Sper] = React.useState({ lat: 0, long: 0 });
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      Sper({
        lat: pos.coords.latitude,
        long: pos.coords.longitude,
      });
    });
  }, []);
  const handleOrderSubmit = async () => {
    ////////////////web3 connect and ask payment//////////////////////
    /////////////////if error or denied then cancel order///////////////
    const data={
      CUser: customer,
      HUser: orderRef.current.value,
      CPhone: phoneRef.current.value,
      Lat: per.lat,
      Long: per.long,
      Message: mesRef.current.value
    }
    
    if (phoneRef.current.value.length !== 10) {
      alert("Enter a valid phone no");
    } else {
      await axios.post("http://localhost:8080/api/web3/order", data);
      console.log(
        "O: " +
          orderRef.current.value +
          " P:" +
          phoneRef.current.value +
          " L:" +
          per.lat +
          " L:" +
          per.long
      );
    }
  };



  const apicustomer = async () => {
    const options = {
      method: "GET",
      url: "http://localhost:8080/api/web3/customer",
      params: { CUser: customer },
    };
    axios
      .request(options)
      .then((response) => {
        //console.log(response.data)
        response.data.reverse();
        setNoteIns(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const apicustomerdone = async () => {
    const options = {
      method: "GET",
      url: "http://localhost:8080/api/web3/customerdone",
      params: { CUser: customer },
    };
    axios
      .request(options)
      .then((response) => {
        //console.log(response.data)
        response.data.reverse();
        setNoteIns2(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    apicustomer();
    apicustomerdone();
  }, [customer]);

  const customerDeny = async (e,id) => {
    const data={
      id:id
    };
    ////////////////////////web3 receive payment/////////////////////////
    ////////////////////////////////////////////////////
    console.log(data);
    await axios.post("http://localhost:8080/api/web3/customerdeny", data);
    window.location.reload();
  }
  const customerAccept = async (e,id) => {
      setiid(id);
      onOpenModal();
  }
  const partialPayment = async () => {
    const data={
      id:iid,
      UserStage:"PCompleted"
    };
    ////////////WEB3 PARTIAL PAYMENT FUNCTION/////////////////////
    ////////////////////////////////////////////////////
    await axios.post("http://localhost:8080/api/web3/customeraccept", data);
    window.location.reload();
  }
  const fullPayment = async () => {
    const data={
      id:iid,
      UserStage:"Completed"
    };
    /////////////////////web3 full payment function//////////////////////
    ////////////////////////////////////////
    await axios.post("http://localhost:8080/api/web3/customeraccept", data);
    window.location.reload();
  }
  return (
    <div>
      <Modal
        className="mode"
        open={open}
        onClose={onCloseModal}
        closeOnOverlayClick={false}
        center={true}
      >
        <div className="moddd">
          <div className="mod-top">
            You can choose to pay partially or fully
          </div>
          <br />
          <br />
          <Button variant="secondary" onClick={partialPayment}>Partial Payment</Button>{' '}
          <Button variant="primary" onClick={fullPayment}>Full Payment</Button>{' '}
          </div>
      </Modal>
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Customer">
          WELCOME Customer {customer} !
        </Tab>
        <Tab eventKey="Place" title="Place Orders">
          Place Orders:
          <input type="text" placeholder="Enter hawker name" ref={orderRef} />
          <input type="text" placeholder="Enter your requirements or message for the hawker" ref={mesRef} />
          <input
            type="number"
            placeholder="Enter your phone no"
            ref={phoneRef}
          />
          <button onClick={handleOrderSubmit}>Submit</button>
        </Tab>

        <Tab eventKey="Orders" title="Current Orders">
          Your orders:
          <br />
          <br />
          <>
            {NoteIns === null ? (
              <div>No Orders Currently</div>
            ) : (
              NoteIns.map((note, index) => {
                return <div key={index}>
                  <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Hawker Name</th>
                          <th>Requirement/message</th>
                          <th>Time</th>
                          <th>Hawker Stage</th>
                          <th>Pay</th>
                          <th>Cancel</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{note.HUser}</td>
                          <td>{note.Message}</td>
                          <td>{note.updatedAt}</td>
                          <td>{note.HawkerStage}</td>
                          <td><Button variant="success" onClick={event =>customerAccept(event,note._id)}>Pay</Button>{' '}</td>
                          <td><Button variant="danger" onClick={event =>customerDeny(event,note._id)}>Cancel</Button>{' '}</td>
                        </tr>
                      </tbody>
                    </Table>
                </div>;
              })
            )}
          </>
        </Tab>
        <Tab eventKey="Past Orders" title="Past Orders">
          Your past orders:
          <br />
          <br />
          <><Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Hawker Name</th>
                          <th>Time</th>
                          <th>Status</th>
                          <th>Cost</th>
                        </tr>
                      </thead>
                      </Table>
            {NoteIns2 === null ? (
              <div>No Past Orders</div>
            ) : 
              (
              NoteIns2.map((note, index) => {
                return (
                <div key={index}>
                  <Table striped bordered hover>
                        <tr key={index}>
                          <td>{note.HUser}</td>
                          <td>{note.updatedAt}</td>
                          <td>{note.UserStage}</td>
                          <td>- 0 ETH</td>
                        </tr>;
                        </Table>
                        </div>);
                }
              ))}
          </>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Customer;
