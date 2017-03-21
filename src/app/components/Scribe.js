import React from 'react';
import './scribes.css';

class Scribe extends React.Component {
  render() {
    return (
      <div className="panel-block selected-scribe">
        <article className="media">
          <div className="media-left">
            {this.props.thread.hasOwnProperty("userPhoto")
              ? <figure className="image is-48x48">
                  <img src={this.props.thread.userPhoto} alt="profilePic" className="scribe-image-rounded"/>
                </figure>
              : <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>}
          </div>
          <div className="media-content">
            <div className="content">
              <a onClick={this.props.removeScribe.bind(null)} className="is-pulled-right">
                <span className="icon is-small">
                  <i className="fa fa-times" aria-hidden="true"></i>
                </span>
              </a>
              <div>
                <span className="title is-5 pr">{this.props.thread.userName}</span>
                <span className="subtitle is-6">{this.props.thread.userEmail}</span>
              </div>
              <div>
                {this.props.thread.scribe}
                {this.props.thread.hasOwnProperty("scribeImage")
                  ? <div className="media-content px-1">
                      <img src={this.props.thread.scribeImage} alt="scribeImage" className="image scribe-image-rounded"/>
                    </div>
                  : <div className="px-1"></div>}
              </div>
              <div className="">
                <a className="pr-1">
                  <i className="fa fa-reply fa-fw" aria-hidden="true"></i>
                </a>
                <a className="pr-1">
                  <i className="fa fa-pencil fa-fw" aria-hidden="true"></i>
                </a>
                <small className="has-text-right">{this.props.thread.datetime}</small>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default Scribe;
