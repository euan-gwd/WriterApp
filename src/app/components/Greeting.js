import React from 'react';
import ScribeList from './ScribeList';
import GuestGreeting from './GuestGreeting';

const Greeting = (props) => {
  if (props.auth) {
    return (
      <div>
        <ScribeList userName={props.auth.displayName} userId={props.auth.uid} userEmail={props.auth.email} userPhoto={props.auth.photoURL}/>
      </div>
    )
  }
  return <GuestGreeting/>;
}

export default Greeting;
