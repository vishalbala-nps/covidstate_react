import React from 'react';
import TitleBar from '../components/titlebar.js'
import axios from 'axios'
import {ExpansionPanel,ExpansionPanelSummary,ExpansionPanelDetails,Typography} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import apiUrl from '../components/api_url.js'
import LoadingScreen from '../components/loading_screen.js'
import ErrorScreen from '../components/onerror.js'

function FAQ(props) {
  const [getfaq,setfaq] = React.useReducer(function(state,action) {
    if (action.type == "DATA_LOADED") {
      return {loading:false,error:false,faqlist:action.payload}
    } else if (action.type == "DATA_ERROR") {
      return {loading:false,error:true,faqlist:[]}
    } else {
      return new Error()
    }
  },{loading:true,error:false,faqlist:[]})
  React.useEffect(function() {
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
  },[])
  //Functions
  function Addfaq(props) {
    return (
      <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={props.faqindex+"-content"}
        id={props.faqindex}
      >
        <Typography><b>{props.faq["question"]}</b></Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography dangerouslySetInnerHTML={{__html:props.faq["answer"]}} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
    )
  }
  if (getfaq.loading == true) {
    return (
      <>
        <TitleBar type="backbar" title="FAQ" />
        <LoadingScreen />
      </>
    )
  } else {
    if (getfaq.error == true) {
      return (
        <>
          <TitleBar type="backbar" title="FAQ" />
          <ErrorScreen />
        </>
      )
    } else {
      return (
        <>
          <TitleBar type="backbar" title="FAQ" />
          {getfaq.faqlist.map(function(item,index) {
            return (<Addfaq faq={item} faqindex={index} key={index}/>)
          })}
        </>
      )
    }
  }
}
  
export default FAQ;