import './App.css'
import Quiz from './assets/Component/Quiz/Quiz'

function App() {

  return (
    <>
      
      <div className='flex flex-col content-center justify-center p-6 mt-6 border-2 border-black rounded-md bg-slate-100' >
      <span className='m-5 text-xl font-bold border-b-2 border-black pb-7 '>
        Quiz App
      </span>
 
      <Quiz />
      </div>
    </>
  )
}

export default App

