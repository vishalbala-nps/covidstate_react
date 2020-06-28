import React from 'react';
import {ExpansionPanel,ExpansionPanelSummary,ExpansionPanelDetails,Typography} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LoadingScreen from '../loading_screen.js'
import ErrorScreen from '../onerror.js'
function FAQDisplay(gprops) {
  let getfaq = gprops.faqjson
  //Functions
  function Addfaq(props) {
    return (
      <ExpansionPanel className="faqs">
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
  if (getfaq.loading === true) {
    return (
      <>
        <LoadingScreen />
      </>
    )
  } else {
    if (getfaq.error === true) {
      return (
        <>
          <ErrorScreen />
        </>
      )
    } else {
      return (
        <div data-testid="faqs">
          {getfaq.faqlist.map(function(item,index) {
            return (<Addfaq faq={item} faqindex={index} key={index}/>)
          })}
        </div>
      )
    }
  }
}

export default FAQDisplay