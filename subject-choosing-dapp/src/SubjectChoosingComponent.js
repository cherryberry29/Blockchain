import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './SC.css';

const SubjectChoosingComponent = ({ contractAddress, contractABI }) => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [subjectChoosingContract, setSubjectChoosingContract] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [usn, setUsn] = useState('');
  const [blockCreated, setBlockCreated] = useState(false);
  const [usnList, setUsnList] = useState([]); // Track of all entered USNs
  const [usnError, setUsnError] = useState('');

  useEffect(() => {
    // Initialize Web3
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        try {
          await window.ethereum.enable();
          const accs = await web3Instance.eth.getAccounts();
          setAccounts(accs);
          const contract = new web3Instance.eth.Contract(contractABI, contractAddress);
          setSubjectChoosingContract(contract);
        } catch (error) {
          console.error('User denied account access or MetaMask not connected:', error);
        }
      } else {
        console.error('No Ethereum interface injected into browser');
      }
    };
    initWeb3();
  }, [contractAddress, contractABI]);

  const validateUSN = (usn) => {
    const pattern = /^1MS21CS[A-Za-z0-9]{3}$/;
    return pattern.test(usn);
  };

  // Function to handle USN input change
  const handleUsnChange = (event) => {
    const usnValue = event.target.value;
    setUsn(usnValue);
    setUsnError('');

    // Check if the USN already exists in the list
    if (usnList.includes(usnValue)) {
      setUsnError('USN already chosen');
    }

    // Validate the USN format
    if (!validateUSN(usnValue)) {
      setUsnError('USN must start with "1MS21CS" followed by any three alphanumeric characters.');
    }
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const chooseSubject = async () => {
    if (!validateUSN(usn) || usnList.includes(usn)) {
      setUsnError('Invalid USN or USN already chosen.');
      return;
    }
    if (!subjectChoosingContract) {
      console.error('Contract not initialized yet. Please wait.');
      return;
    }
    try {
      await subjectChoosingContract.methods.chooseSubject(selectedSubject, usn).send({ from: accounts[0] });
      console.log('Subject chosen successfully');
      setBlockCreated(true);
      // Add the chosen USN to the list to prevent duplicates
      setUsnList([...usnList, usn]);
      // Clear the input fields after successful selection
      setSelectedSubject('');
      setUsn('');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleClose = () => {
    setBlockCreated(false);
  };

  return (
    <div className="container">
      <h2>Choose your subject</h2>
      <input type="text" value={usn} onChange={handleUsnChange} placeholder="Enter USN" />
      {usnError && <p className="error">{usnError}</p>}
      <select value={selectedSubject} onChange={handleSubjectChange}>
        <option value="">Select Subject</option>
        <option value="Blockchain">Blockchain</option>
        <option value="Devops">Devops</option>
        <option value="Unix Shell Programming">Unix Shell Programming</option>
        <option value="Adv Dbms">Adv Dbms</option>
      </select>
      <button onClick={chooseSubject}>Choose Subject</button>

      {blockCreated && (
        <div className="block-info">
          <h3>Block Created!</h3>
          <p>Subject: {selectedSubject}</p>
          <p>USN: {usn}</p>
          <button onClick={handleClose}>Close</button>
        </div>
      )}
    </div>
  );
};

export default SubjectChoosingComponent;
