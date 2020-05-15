import React from 'react';
import TitleBar from '../components/titlebar.js'

function Statepage(props) {
  const state = props.match.params.statename
  return (
    <TitleBar type="backbar" title={state} />
  )
}
  
export default Statepage;