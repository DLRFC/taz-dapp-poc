import { useState } from "react";
import dynamic from "next/dynamic";
const QrReader = dynamic(() => import('react-qr-reader'), {
  ssr: false
  });
import { Identity } from "@semaphore-protocol/identity"
import { Group } from "@semaphore-protocol/group"
const { generateProof } =require("@semaphore-protocol/proof")
const { verifyProof } = require("@semaphore-protocol/proof")
const { packToSolidityProof } = require("@semaphore-protocol/proof");

import { ethers } from "ethers";




export default function Home() {

  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");
  const [testIdentity,setTestIdentity] = useState("");
  const [trapdoor,setTrapdoor] =useState("");
  const [nullifier,setNullifier] =useState("");
  const [identityCommitment,setIdentityCommitment] =useState("");


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

  const handleGenerateId = () => {

      if(data){
        const newIdentity = new Identity(data);
    
        const newIdentityCommitment = newIdentity.generateCommitment();
  
        setTestIdentity(newIdentityCommitment);
       }


  }



  return (
    <div className="flex flex-col gap-y-5 items-center justify-center">
    <h1>Hello World</h1>
      <h2>
        Last Scan:
        {selected}
      </h2>

      <button className="bg-blue-700 p-3 rounded-lg text-gray-200"
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
      {loadingScan && <p className="text-xl font-bold ">Please fit the Qr Code</p>}
      {data ? (<div>
        <p className="font-bold">QrCode Key is:</p>
        <p >{data}</p>
        </div>) : null}
      {data? (<div className="flex items-center justify-center flex-col gap-y-2"><button className="bg-green-700 p-3 rounded-lg text-gray-200" onClick={handleGenerateId}>Generate Id</button>
      <p className="text-xl font-bold">Identity</p>
      <p className="text-xl break-all px-20">{testIdentity.toString()}</p>
      </div>) : null }
    </div>
  )
}
