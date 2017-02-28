import React from 'react';
import FourOFourPic from '../assets/FourOFourPic.jpg';

class FourOFour extends React.Component {

	render() {
		return (
			<div className="d-flex justify-content-center">
				<img src={FourOFourPic} alt="pagenotfound" className="mx-auto align-self-center"/>
			</div>
		);
	}

}

export default FourOFour;
