import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { database } from './firebase'
import { onValue, ref } from 'firebase/database'

function App() {
  const [count, setCount] = useState(0)



   const [data, setData] = useState(null);

  useEffect(() => {
    

     onValue(ref(database, 'DB' ), (snapshot) => {
         
         console.log("data", snapshot.val())
         setData(snapshot.val());
        });

  
  }, []);

  return (
    <>

      <div>
        {data?.UID}
      </div>
    </>
  )
}

export default App
