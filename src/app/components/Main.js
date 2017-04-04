import React from 'react';
import ScribeList from './ScribeList';

const Main = (props) => {
  if (props.auth) {
    return (
      <div>
        <ScribeList userName={props.auth.displayName} userId={props.auth.uid} userEmail={props.auth.email} userPhoto={props.auth.photoURL}/>
      </div>
    )
  } 
}

export default Main;
