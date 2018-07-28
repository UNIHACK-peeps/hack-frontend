import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import newId from './utils/newid';
import Select from 'react-select';
import Creatable from 'react-select/lib/Creatable';
/* const App = () => (
 *   <Router>
 *     <div>
 *       <NavBar>
 *         <li>
 *           <Link to="/">Dashboard</Link>
 *         </li>
 *         <li>
 *           <Link to="/request">Request</Link>
 *         </li>
 *       </NavBar>
 *
 *       <hr />
 *
 *       <Route exact path="/" component={Home} />
 *       <Route path="/request" component={Request} />
 *       <Route path="/topics" component={Topics} />
 *     </div>
 *   </Router>
 *
 * );
 *  */



/* ################# PAGES AND ROUTING #################### */


const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/topics" component={Topics} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/request" component={Request} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/profile" component={Profile} />

    </div>

  </Router>

);

const Login = () => (
  <div>
    <p>Login!</p>

    <p><Link to="/Dashboard">Continue...</Link></p>
  </div>
);

const Signup = () => (
  <p>Signup!</p>
);

const Dashboard = () => (
  <div>
    <NavBar/>
    <p>Dashboard!</p>
  </div>
);

const Notifications = () => (
  <div>
    <NavBar/>
    <p>Notifications!</p>
  </div>
);

const Home = () => (
  <div>
    <p>This is home page!</p>
    <p><Link to="/signup">Sign Up</Link></p>
    <p><Link to="/login">Login</Link></p>
  </div>
);

const Request = () => (
  <div>
    <NavBar/>
    <RequestForm/>
  </div>
);

const Profile = () => (
  <div>
    <NavBar/>
    <p>Profile</p>
 </div>
);


/* Nav bar
 *
 *
*/
const NavBar = () => (
  <div>
    <div>Learn!</div>
    <ul>
      <li>
        <Link to='/dashboard'>Dashboard</Link>
      </li>
      <li>
        <Link to='/request'>Request</Link>
      </li>
      <li>
        <Link to='/profile'>Profile</Link>
      </li>
      <li>
        <Link to='/'>Logout</Link>
      </li>
      <li>
        <Link to='/notifications'>Notifications</Link>
      </li>
    </ul>
  </div>
);

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Home} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);




class RequestForm extends React.Component {
  state = {
    selectedTopic: null,
    description: null,
    selectedTime: null,
  };


  topics = [
    { value: 'maths', label: 'Maths' },
    { value: 'english', label: 'English' },
    { value: 'learnChinese', label: 'Learn Chinese' }
  ];

  handleTimeSelect = (time) => {
    let newState = Object.assign(
      {}, this.state, {selectedTime:time}
    );
    this.setState(newState);

  };

  handleTopicChange = (topic) => {
    let newState = Object.assign(
      {}, this.state, {selectedTopic:topic}
    );
    this.setState(newState)
  };


  render = () => {
    return (
      <div className="entryField">
        <TopicSelector
          options={this.topics}
          onChange={this.handleTopicChange}
          selectedOption={this.state.selectedTopic}
        />
        <DescriptionInput/>
        <TimeSelector
          onTimeSelect={this.handleTimeSelect}
          selectedTime={this.state.selectedTime}
        />
        <p> {this.state.selectedTime}</p>
      </div>
    )
  }
}

// Some sort of search and select topic selector

class DescriptionInput extends React.Component {
  render = () => {
    return (<p>Description Input</p>);
  };
}


class TimeSelector extends React.Component {
  render = () => {
    const labels = ["Frequent", "Infrequent", "Single Time"];
    const timesButtons = labels.map((time) => {
      return (
        <TimeButton
          depressed={this.props.selectedTime == time}
          key={newId()}
          duration={time}
          onTimeSelect={this.props.onTimeSelect}
        >
        {time}
        </TimeButton>
      );
  });

    return (
      <div>
        <div>
          <p>How long will this take? (roughly)</p>
        </div>
        <div className="durationSelectBar">
          {timesButtons}
        </div>
      </div>
    )
  };
}


class TimeButton extends React.Component {
  handleTimeButtonClick = () => {
    this.props.onTimeSelect(this.props.duration);
  };

  render = () => {
    let depressedStyle = {borderStyle:"inset"}

    return (
      <button
      style={this.props.depressed ?
             depressedStyle :
             null
      }
        onClick={this.handleTimeButtonClick}
      >{this.props.children}</button>
    );

  };
}


class TopicSelector extends React.Component {

  state = ({
    selectedOption: null,

  });

  handleChange = (selectedOption) => {

    this.props.onChange(selectedOption);
  };

  render = () => {
    return (

      <Creatable
        value={this.props.selectedOption}
        onChange={this.handleChange}
        options={this.props.options}
      />

    );
  };
};








export default App;
