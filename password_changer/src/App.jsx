import { useCallback, useEffect, useState, useRef} from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  
    const passwordRef = useRef(null)

// useCallback---->> function ko memorise krta h. isko jab use krte h toh last m array wagera nhi dete h
  const passwordGenerator = useCallback (()=> {
  
    let pass =""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

     if (numberAllowed) 
      str += "0123456789"
    if (charAllowed)
      str = str + "!@#$%^&*+_=-{}[]`"

    for (let i=1; i<=length; i++){
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  },[length, numberAllowed,charAllowed,setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
  //  passwordRef.current?.setSelectionRange(0,3) -------------->>>>  this is inbuilt function 
  //  to select the random length of the input 
    window.navigator.clipboard.writeText(password)
  },
[password])

     useEffect(() => {
      passwordGenerator()
      },[length,numberAllowed,charAllowed,passwordGenerator])

  
  return (
    
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3  text-center my-8 text-orange-500  bg-gray-700'> 
      <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 my-3">

          <input type="text"
          value={password}
          className='outline-none w-full py-1 px-3 '
          placeholder='password'
          readOnly
          ref={passwordRef}

          />
 
          <button 
          onClick={copyPasswordToClipboard}
          className=' bg-blue-800 text-stone-300 px-3 py-0.5 shrink-0 '>Copy </button>

        </div>

         <div className="flex text-sm gap-x-1">
          <div className="flex items-center gap-1">

            <input 
            type="range"
            min={6} 
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label> Length:{length}</label>
          </div>

        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked = {numberAllowed}
          id='numberInput'
          onChange={() => {
            setNumberAllowed ((prev) => !prev);
          }}
          />
          <label>Numbers</label>
        </div>
         
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked = {charAllowed}
            id='charInput'
            onChange={() => {
              setcharAllowed((prev) => !prev)
            }}
            />

            <label>Characters</label>
          </div>


         </div>
          </div>
    
  )
}

export default App
