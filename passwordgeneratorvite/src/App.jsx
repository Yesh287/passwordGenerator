import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'
function App() {
  const [length,setLength] = useState(8);
  const [number,setNumber] = useState(false);
  const [character,setCharacter] = useState(false); 
  const [password,setPassword] = useState("");
  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"; 
    if(number) str += "0123456789";
    if(character) str += "!@#$%^&*(){}[]~`-=_+?/;:.,<>";
    for(let i = 0; i < length; i++){
      pass += str[Math.floor(Math.random()*str.length+1)];
    }
    setPassword(pass);
  },[length,number,character,setPassword,setPassword])
  const passwordRef = useRef(null);
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    console.log(passwordRef);
    window.navigator.clipboard.writeText(password);
  },[password])
  useEffect(()=>{passwordGenerator()},[length,number,character,passwordGenerator])
  return (
    <>
    <div className='w-full h-25 text-center max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center my-3 mt-2'>
        Password Generator
      </h1>
      <div className='flex shadow rounded-lg overflow-hidden bg-white mb-2'>
        <input type='text' value={password} ref={passwordRef} placeholder='Password' readOnly className='outline-none w-full py-1 px-3'></input>
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipboard}>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type='range' min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox' defaultChecked = {number} className='cursor-pointer' onClick={(e)=>{setNumber((prev)=>!prev)}}/>
          <label>Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox' defaultChecked={character} className='cursor-pointer' onChange={(e)=>{setCharacter((prev)=>!prev)}}/>
          <label>Character</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
