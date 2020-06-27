import React from 'react';
import TitleBar from '../components/titlebar.js'
import axios from 'axios'
import apiUrl from '../components/api_url.js'
import FAQDisplay from '../components/faq/faqdisplay.js'

function FAQ(props) {
  const [getfaq,setfaq] = React.useReducer(function(state,action) {
    if (action.type === "DATA_LOADED") {
      return {loading:false,error:false,faqlist:action.payload}
    } else if (action.type === "DATA_ERROR") {
      return {loading:false,error:true,faqlist:[]}
    } else if (action.type === "DATA_LOADING") {
      return {loading:true,error:false,messageslist:[]}
    } else {
      return new Error()
    }
  },{loading:true,error:false,faqlist:[]})
  //Functions
  function getdata() {
    axios.get(apiUrl+"/faqs").then(function(result) {
      setfaq({
        type: "DATA_LOADED",
        payload: result.data
      })
    }).catch(function() {
      setfaq({
        type: "DATA_ERROR"
      }) 
    })
  }
  React.useEffect(function() {
    getdata()
  },[])
  return (
    <>
      <TitleBar type="backbar" title="FAQ" clickfunc={function() {
        if (getfaq.loading === false) {
          setfaq({
            type: "DATA_LOADING"
          })
          getdata()
        }
      }}/>
      <FAQDisplay faqjson={getfaq} />
    </>
  )
}
  
export default FAQ;