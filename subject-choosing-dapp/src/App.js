// App.js
import './App.css';
import SubjectChoosingComponent from './SubjectChoosingComponent';

function App() {
  return (
    <div className="App">
      <SubjectChoosingComponent 
        contractAddress="0x6a38A1c8D8535F5E187232519c201cE608870e66" 
        contractABI={[
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "address",
                "name": "student",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "string",
                "name": "usn",
                "type": "string"
              }
            ],
            "name": "SubjectChosen",
            "type": "event"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "name": "studentSubjects",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
          },
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "_subject",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "_usn",
                "type": "string"
              }
            ],
            "name": "chooseSubject",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ]}
      />
    </div>
  );
}

export default App;
