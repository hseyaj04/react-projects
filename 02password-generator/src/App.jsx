import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef
  const passRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklmnbvcxz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "~`!@#$%^&*-_=+{}[]"

    for(let l=1; l<=length; l++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPassToClip = useCallback(() => {
    passRef.current?.select()
    // passRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(password)
  }, [password])


  useEffect(() => {
    passwordGenerator()
  }, 
  [length, numberAllowed, charAllowed, passwordGenerator])
  return ( 
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 text-white bg-black">
        <h1 className='py-1 my-2 '>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 bg-white'>
          
          <input 
          type="text" 
          value={password} 
          className="outline-none w-full py-1 px-3  placeholder-zinc-400 text-black"
          placeholder='password'
          readOnly
          ref={passRef}
           />
           <button className='outline-none bg-blue-400  px-2 py-0.3 text-s shrink-0 hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 
         focus:ring-blue-400 focus:ring-opacity-75 active:bg-blue-700' onClick={copyPassToClip}>Copy</button>
        </div>
        
        <div className='flex items-center gap-x-1 text-sm'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
             />
             <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
            />
            Numbers
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
            />
            Special Characters
          </div>
      </div>
    </>
  )
}


export default App


{/* <div className='flex text-sm gap-x-2'>
        <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
             />
             <label>Length: {length}</label>
        </div> */}