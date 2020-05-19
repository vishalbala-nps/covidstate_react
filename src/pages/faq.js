import React from 'react';
import TitleBar from '../components/titlebar.js'
import axios from 'axios'
import {CircularProgress,ExpansionPanel,ExpansionPanelSummary,ExpansionPanelDetails,Typography} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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
    axios.get("http://covidstate.in/api/v1/faqs").then(function(result) {
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
        <CircularProgress />
      </>
    )
  } else {
    if (getfaq.error == true) {
      return (
        <>
          <TitleBar type="backbar" title="FAQ" />
          <h1>Error</h1>
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