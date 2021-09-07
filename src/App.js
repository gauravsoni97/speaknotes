import React, { useState, useEffect } from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"




const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

function App() {
  const [miclistening, setmiclistening] = useState(false)
  const [notes, setnotes] = useState("")
  const [outputnotes, setoutputnotes] = useState([])

  useEffect(() => {
    handleListen()
  }, [miclistening])

  const handleListen = () => {
    if (miclistening) {
      mic.start()
      mic.onend = () => {
        console.log(' Created loop for mic to not to stop after some time...')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics is on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      // console.log(transcript)
      setnotes(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSavenotes = () => {
    setoutputnotes([...outputnotes, notes])
    setnotes('')
  }



  // format btns 


  
  return (
    <>

      <div className="main">
        <h1 className="text-center my-5">🎙Speak Text</h1>
        <div className="container">
          <div className="row">
            
            {/* Input box here  */}

            <div className="col-md-6 col-12 inputbox">
              <div className="boxarea" style={{
                backgroundImage: `url("./bg.jpg")`
              }}>
                <p>{notes}</p>

                <div className="btns">
                  {miclistening ? <span>🔊</span> : <span>🔇</span>}

                  <button className=" btn btn-light mx-1 py-2 startbtn" onClick={() => setmiclistening(prevState => !prevState)}>
                    Start/Stop
                  </button>
                  <button className=" btn btn-light mx-1 py-2" onClick={handleSavenotes} disabled={!notes}>
                    Save notes
                  </button>

                </div>
              </div>
            </div>



            {/* output box here  */}

            <div className="col-md-6 col-12 outputbox">
              <div className="boxarea" style={{ backgroundImage: `url("./bg.jpg")` }}>
                {outputnotes.map(n => (
                  <textarea key={n} style={{ backgroundImage: `url("./bg.jpg")` }}>{n}</textarea>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
