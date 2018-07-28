import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import newId from './utils/newid';
import Select from 'react-select';
import Creatable from 'react-select/lib/Creatable';
import Server from './utils/server';
import $ from 'jquery';

const server = new Server();
const axios = require("axios");
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

    <p><Link to="/dashboard">Continue...</Link></p>
  </div>
);

const Signup = () => (
  <p>Signup!</p>
);

const Dashboard = () => (
  <div>
    <NavBar/>
    <div className = "container">
    	<div class="row col s12">
    			<div>
          			<UserProfile/>
       			</div>
       	</div>
    	
    	<div class="row">
    		<div className = "col s5">
          		<MyTutors/>
        	</div>
        	<div className="col s2"></div>
        	<div className = "col s5">
        		<MyStudents/>
       		</div>
    	</div>
        
        
        
      </div>
  </div>
);

const Notifications = () => (
  <div>
    <NavBar/>
    <div className = "container">
      <h2 class="heavy"> Notifications </h2>
      <div id = "row">
        <div className = "col s6">
          <NotifItem/>
        </div>
      </div>
      <div id = "row">
        <div className = "col s6">
          <NotifItem/>
        </div>
      </div>
      <div id = "row">
        <div className = "col s6">
          <NotifItem/>
        </div>
      </div>
    </div>
  </div>
);

const Home = () => (
  <div className = "homepage-bg-img">
    <HomeNavBar/> {/* temp, use home page non auth navbar */}
    <div className = "homepage-float-text-container">
      <h1> Start Learning Today! </h1>
      <p> Share your knowledge and seek help from tutors all over the world! </p>
      <Link to='/signup'>
        <div className="btn waves-effect waves-light " type="submit" name="action">Sign Up
          <i className="material-icons right">send</i>
        </div>
      </Link>
    </div>
  </div>
);

const Request = () => (
  <div>
    <NavBar/>
    <div className = "container">
    <h2> Create a tuition request! </h2>
    <div className = "row">
      <RequestForm/>
    <h3>Start searching for tutors!</h3>
     <div class="col s12">
      <div class="card">
        <div class="card-content white-text">
          <div id="request-p">Select a subject</div>
          <RequestForm/>
        </div>
       </div>
    </div>
    
    </div> 
    </div>
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

class NavBar extends React.Component {
  state = {
    selectedButton:null
  }

  handleNavChange = (key) => {
    let newState = Object.assign(
        {}, this.state, {
          selectedButton:key
        }
      );

    this.setState(newState);
  };

  render = () => {
    let buttons = [
      {to:'/dashboard',
      content:'Dashboard'},
      {to:'/request',
      content:'Request'},
      {to:'/profile',
       content:'Profile'},
      {to:'/notifications',
       content:'Notifications'},
      {to:'/',
      content:'Logout'},
    ];
    let location = "/" + window.location.href.split("//")[1].split("/")[1];

    return(
      <div>
        <nav>
          <div style={{paddingLeft:'30px', paddingRight:'10px'}}className="nav-wrapper blue lighten-2 class" >
            <a href="#" className="brand-logo">Logo</a>

            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {
                buttons.map((buttonDict) => (
                  (buttonDict.to == location) ?
                  (<NavLink
                     key={newId()}
                     to={buttonDict.to}
                     onClick={this.handleChangeNav}
                     selected={true}
                    >
                    {buttonDict.content}
                  </NavLink>) :
                  (<NavLink
                     key={newId()}
                     to={buttonDict.to}
                     onClick={this.handleChangeNav}
                    >
                    {buttonDict.content}
                  </NavLink>) 


                ))
              }
            </ul>
          </div>
        </nav>
      </div>
    )
  };
};

const HomeNavBar = () => (
  <div>
    <nav>
      <div className="nav-wrapper teal lighten-2 class">
        <a href="#" className="brand-logo">Logo</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><Link to='/'>About Us</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/signup'>Signup</Link></li>
        </ul>
      </div>
    </nav>
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


class NavLink extends React.Component {
  handleClick = () => {
    this.props.onClick(this.props.to);
  }
  render = () => {

    let selectedStyle = {
      color:'blue'
    };

    return (
      this.props.selected ?
      <li className="active"><Link to={this.props.to}>{this.props.children}</Link></li>
       :
      <li><Link to={this.props.to} onClick={this.handleClick}>{this.props.children}</Link></li>
    );

  };
}


class RequestForm extends React.Component {
  state = {
    selectedTopic: null,
    description: "",
    selectedTime: null,
    topics:
    [
      { value: 'maths', label: 'Maths' },
      { value: 'english', label: 'English' },
      { value: 'learnChinese', label: 'Learn Chinese' },
    ],
  };



  loadSubjectsFromServer = () => {
    return axios.get('http://localhost:8000/main/subjects')
                .then((response) => {
                  var newState = Object.assign(
                    {}, this.state, {
                      topics: response.data.map((data) =>(
                        {
                        value:"" + data.id,
                        label:data.name
                        }


                      ))
                    }
                  );
                  this.setState(newState);
                })
                .catch(function (error) {
                  // handle error
                  console.log(error);
                })
                .then(() => {
                  // always executed
                });
  };


  componentWillMount = () => {
    this.loadSubjectsFromServer();
    this.setState(this.state);
  };

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

  handleDescriptionChange = (event) => {
    let newState = Object.assign(
      {}, this.state, {
        description:event.target.value
      }
    );
    this.setState(newState)
  };


  handleSubmit = () => {
    this.submitData();
  };

  submitData = () => {
    console.log(
      "Description: " + this.state.description +
      "Topic: " + this.state.selectedTopic +
      "Selected Time: " + this.state.selectedTime
    );
  };

  render = () => {
    return (
      <div className="entryField">
        <TopicSelector
          options={this.state.topics}
          onChange={this.handleTopicChange}
          selectedOption={this.state.selectedTopic}
        />
        <DescriptionInput
          onChange={this.handleDescriptionChange}
          value={this.state.description}
        />
        <TimeSelector
          onTimeSelect={this.handleTimeSelect}
          selectedTime={this.state.selectedTime}
        />
        <p> {this.state.selectedTime}</p>
        <a onClick={this.handleSubmit} className="waves-effect waves-light btn  light-green">Submit</a>
      </div>
    )
  }
}

// Some sort of search and select topic selector

class DescriptionInput extends React.Component {

  handleChange = (e) => {
    this.props.onChange(e);
  };



  render = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Enter a short description!
          <input
            type="text"
            value={this.props.value}
            onChange={this.handleChange}
          />
        </label>

      </form>
    );
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
          <p>How long will this take? (Roughly)</p>
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

    if(this.props.depressed) {
      return(
        <a onClick={this.handleTimeButtonClick} className="request-time-button waves-effect teal darken-4 waves-teal #004d40 teal darken-4
 btn">{this.props.children}</a>
      );

    } else {
      return(
        <a onClick={this.handleTimeButtonClick} className="request-time-button waves-effect btn">{this.props.children}</a>
      );
    };
  };
};


class TopicSelector extends React.Component {

  state = ({
    selectedOption: null,

  });

  handleChange = (selectedOption) => {

    console.log("Changed to ")
    console.log(selectedOption)

    this.props.onChange(selectedOption.value);
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



//For dashboard page

const UserProfile = () => (
        <div className="">
    			<div class="card horizontal">
      				<div class="card-image">
        				<img src="https://materializecss.com/images/sample-1.jpg"/>
      				</div>
     				 <div class="card-stacked">
        				<div class="card-content">
        				<h4>Welcome, Donut Theif!</h4>
          					<h4 class="flow-text"> Your Skills: </h4>
              				<ul class="flow-text">
                				<li>- English </li>
                				<li>- Maths </li>
                				<li>- Literature </li>
              				</ul>
        				</div>
        				<div class="card-action">
          					<a href="#">Edit your profile</a>
        				</div>
      				</div>
    			</div>
        </div>
)

const MyTutors = () => (
  <div>
  
  <div id="dashboard-subheading">My Tutors</div>
  
    <div className="card horizontal">
      <div className="card-stacked">
        <div className="card-content">
          <h4> Name </h4>
          <p>Subject: blah</p>
          <p>email: test@meme.com</p>
          <p>phone: 12346137183</p>
        </div>
        <div className="card-action">
          <a href="#">Remove</a>
        </div>
      </div>
    </div>
    
    <div className="card horizontal">
      <div className="card-stacked">
        <div className="card-content">
          <h4> Name </h4>
          <p>Subject: blah</p>
          <p>email: test@meme.com</p>
          <p>phone: 12346137183</p>
        </div>
        <div className="card-action">
          <a href="#">Remove</a>
        </div>
      </div>
    </div>
  </div>
)

const NotifItem = () => (
  <div>
    <div className="card horizontal">
      <div className="card-stacked">
        <div className="card-content white-tex">
          <h4><b>Name</b> matched with you as a tutor!</h4>
          <b><p>Description</p></b>
          <h6 className=""><em>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </em></h6>
        </div>
        <div class="card-action ">
          <a href="#" class="green-text">Accept</a>
          <a href="#" class="red-text">Dismiss</a>
          <a href="#" class="">See Profile</a>
        </div>
      </div>
    </div>
  </div>
)
const MyStudents = () => (
  <div> 
  
  <div id="dashboard-subheading">My Students</div>
  
    <div className="card horizontal">
      <div className="card-stacked">
        <div className="card-content">
          <h4> Name </h4>
          <p>Subject: blah</p>
          <p>email: test@meme.com</p>
          <p>phone: 12346137183</p>
        </div>
        <div className="card-action">
          <a href="#">Remove</a>
        </div>
      </div>
    </div>
    
    <div className="card horizontal">
      <div className="card-stacked">
        <div className="card-content">
          <h4> Name </h4>
          <p>Subject: blah</p>
          <p>email: test@meme.com</p>
          <p>phone: 12346137183</p>
        </div>
        <div className="card-action">
          <a href="#">Remove</a>
        </div>
      </div>
    </div>
  </div>
)

export default App;
