import React from 'react';
import TitleBar from '../components/titlebar.js'
import axios from 'axios'
import apiUrl from '../components/api_url.js'
import ContactsDisplay from '../components/contacts/contactsdisplay.js'

function Contacts() {
  const [getcontacts,setcontacts] = React.useReducer(function(state,action) {
    if (action.type === "DATA_LOADED") {
      return {loading:false,error:false,messageslist:action.payload}
    } else if (action.type === "DATA_ERROR") {
      return {loading:false,error:true,messageslist:[]}
    } else if (action.type === "DATA_LOADING") {
      return {loading:true,error:false,messageslist:[]}
    } else {
      return new Error()
    }
  },{loading:true,error:false,messageslist:[]})
  //Functions
  function getdata() {
    axios.get(apiUrl+"/contacts").then(function(result) {
      setcontacts({
        type: "DATA_LOADED",
        payload: result.data
      })
    }).catch(function() {
      setcontacts({
        type: "DATA_ERROR"
      }) 
    })
  }
  React.useEffect(function() {
    getdata()
  },[])

  return (
    <>
      <TitleBar type="backbar" title="Contacts" clickfunc={function() {
        if (getcontacts.loading === false) {
          setcontacts({
            type: "DATA_LOADING"
          })
          getdata()
        }
      }} />
      <ContactsDisplay contactjson={getcontacts} />
    </>
  )
}
  
export default Contacts;