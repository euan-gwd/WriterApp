import React from 'react';
import ScribeList from './ScribeList';
import SignedOut from './SignedOut';

const Main = (props) => {
  if (props.auth) {
    return (
      <div>
        <ScribeList userName={props.auth.displayName} userId={props.auth.uid} userEmail={props.auth.email} userPhoto={props.auth.photoURL}/>
      </div>
    )
  } else {
    return (
      <div className="">
        <SignedOut />;
      </div>
    )
  }

}

export default Main;
