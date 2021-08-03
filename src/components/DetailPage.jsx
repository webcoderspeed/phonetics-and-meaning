import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';

const DetailPage = () => {
  
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const { word } = useParams();

  useEffect(() => {
    const fetchData = () => {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`)
        .then(res => res.json())
        .then(data => setData(data))
       setLoading(false)
      }

    fetchData()
  }, [word])

  function handlePlay() {
    const audioFile = document.getElementById('myAudio');
    audioFile.play()
  }

  return (
    <>
     {
       loading ? (<Spinner />) : (
          <div>
          <h1>{word.toUpperCase()}:</h1>
          {
            data && data.map((item, index) => {
              return (
                <div key={index}>
                  <h3>Phonetics:</h3>
                  {
                    item.phonetics.map((phone, index) => {
                      return (
                        <ul key={index}>
                          <li>{phone.text}</li>
                          <li>
                            <audio id="myAudio">
                                <source src={`${phone.audio}`} type="audio/mpeg" />
                            </audio>
                            <button onClick={handlePlay}>Play</button>
                          </li>
                        </ul>
                      )
                  })
                }
                <h3>Meanings:</h3>
                {
                  item.meanings.map((meaning, index) => {
                    return (
                      <ul key={index}>
                        <li><h5>Part of Speech: </h5>{meaning.partOfSpeech}</li>
                        <h5>Definiton: </h5>
                        {
                          meaning.definitions.map((definition, index) => {
                                  return (
                                    <p key={index}>
                                        <strong>- </strong>
                                        {definition.definition}
                                    </p>
                                  )
                                })
                        }
                        {
                          meaning.definitions.map((definition, index) => {
                            return (
                             <div key={index}>
                               {definition?.synonyms && <h5>Synonyms: </h5>}
                               <ol>
                                 {
                               definition?.synonyms && definition.synonyms.map((synonym, index) => {
                                 return (
                                     <li key={index}>{synonym}</li>
                                 )
                               })
                               }
                               </ol>
                             </div>
                            )
                          })
                        }
                      </ul>
                    )
                  })
                }
                </div>
              )
              })
              }
          </div>
       )
     }
    </>
  )
}

export default DetailPage
