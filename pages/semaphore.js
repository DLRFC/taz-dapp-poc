import {useState} from "react";
import { Identity } from "@semaphore-protocol/identity"
import dynamic from "next/dynamic";
const QrReader = dynamic(() => import('react-qr-reader'), {
  ssr: false
  });
import { Group } from "@semaphore-protocol/group"
import  Semaphore  from "./utils/Semaphore.json"
const { generateProof } =require("@semaphore-protocol/proof")
const { verifyProof } = require("@semaphore-protocol/proof")
const { packToSolidityProof } = require("@semaphore-protocol/proof");

import { ethers } from "ethers";



export default function Home() {
  const [identity,setIdentity] =useState("");
  const [trapdoor,setTrapdoor] =useState("");
  const [nullifier,setNullifier] =useState("");
  const [identityCommitment,setIdentityCommitment] =useState("");



  function generateNewId(){
    const newIdentity = new Identity(data)
    const newTrapdoor = newIdentity.getTrapdoor();
    const newNullifier = newIdentity.getNullifier();
    const newIdentityCommitment = newIdentity.generateCommitment();


    console.log(newIdentity);
    console.log(newTrapdoor);
    console.log(newNullifier);
    console.log(newIdentityCommitment);


    setIdentity(newIdentity);
    setTrapdoor(newTrapdoor);
    setNullifier(newNullifier);
    setIdentityCommitment(newIdentityCommitment);

  }

  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");
  // const [testIdentity,setTestIdentity] = useState();


  const handleScan = async (scanData) => {
    setLoadingScan(true);
    console.log(`loaded data data`, scanData);
    if (scanData && scanData !== "") {
      console.log(`loaded >>>`, scanData);
      setData(scanData);
      setStartScan(false);
      setLoadingScan(false);
      // setPrecScan(scanData);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };


  return (
    <div>
      <div className="App">
    <h1>Hello World</h1>
      <h2>
        Last Scan:
        {selected}
      </h2>

      <button
        onClick={() => {
          setStartScan(!startScan);
        }}
      >
        {startScan ? "Stop Scan" : "Start Scan"}
      </button>
      {startScan && (
        <>
          <select onChange={(e) => setSelected(e.target.value)}>
            <option value={"environment"}>Back Camera</option>
            <option value={"user"}>Front Camera</option>
          </select>
          <QrReader
            facingMode={selected}
            delay={1000}
            onError={handleError}
            onScan={handleScan}
            // chooseDeviceId={()=>selected}
            style={{ width: "300px" }}
          />
        </>
      )}
      {loadingScan && <p>Loading</p>}
      {data !== "" && <p>{data}</p>}
    </div>
      <h1>Hello Zk World!</h1>
      <button onClick={generateNewId}>1. Generate New Id</button>
      <h5>Trapdoor</h5> 
      <p>{trapdoor.toString()}</p>
      <h5>Nullifier</h5>
      <p>{nullifier.toString()}</p>
      <h5>Identity Commitment</h5>
      <p>{identityCommitment.toString()}</p>
    </div>
  )
}
