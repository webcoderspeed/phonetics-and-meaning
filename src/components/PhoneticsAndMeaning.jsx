import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';


const PhoneticsAndMeaning = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
          fetch('https://api.dictionaryapi.dev/api/v2/entries/en_US/hello'),
          fetch('https://api.dictionaryapi.dev/api/v2/entries/en_US/code'),
          fetch('https://api.dictionaryapi.dev/api/v2/entries/en_US/try'),
          fetch('https://api.dictionaryapi.dev/api/v2/entries/en_US/luck'),
          fetch('https://api.dictionaryapi.dev/api/v2/entries/en_US/motivate'),
        ]).then((responses) => {
          return Promise.all(responses.map((response) => {
            return response.json();
          }));
        }).then((data) => {
          setData(data)
          setLoading(false)
        }).catch(function (error) {
          console.log(error);
        });
    }
    fetchData()
  }, [])
  
  return (
    <>
      {
        loading ? (
          <Spinner />
        ) : (
          <table border='2' cellPadding='4'>
        <caption>Phonetics And Meanings</caption>
         <tbody>
            <tr>
            <th>Word</th>
            <th>Phonetics</th>
            <th>Meanings</th>
          </tr>
          {
            data && data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Link to={`/${item[0].word}`}>{item[0].word}</Link>
                  </td>
                  <td>{item[0].phonetics.length}</td>
                  <td>{item[0].meanings.length}</td>
                </tr>
              )
            })
          }
         </tbody>
      </table>
        )
      }
    </>
  )
}

export default PhoneticsAndMeaning
