import logo from './logo.svg';
import './App.css';

import { create } from 'ipfs-http-client';
import { useState } from 'react';

const ipfsUrl = 'https://ipfs.infura.io:5001/api/v0'
const client = create(ipfsUrl)

// __________________________________________________________

// For using your own ipfs infura instead of the public
// const projectID = {_projectID_from_IPFS}
// const projectSecret = {_Project_secret}
// const auth = 'Basic ' + Buffer.from(projectID + ":" + projectSecret).toString('base64')
// const client = create({
//   host: "ipfs.infura.io",
//   port: 5001,
//   protocol: "https",
//   header:{
//     authorization: auth
//   }
// })
// __________________________________________________________

function App() {

  const [fileUrl, setFileUrl] = useState()

  const onChange = async (e) => {
    try {
      const file = e.target.files[0]
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      console.log("url : ",url)
    } catch (error) {

    }
  }

  return (
    <div className="App">
      <header className="App-header">
        HOME
      </header>
      Upload File : <input type="file" onChange={onChange} />
    </div>
  );
}

export default App;
