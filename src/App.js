import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageFormLink from './components/ImageFormLink/ImageFormLink';
import Rank from './components/Rank/Rank';
import Particle from './components/Particles/Particle';
import FaceDetection from './components/FaceDetection/FaceDetection';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const initialState = {
  input : '',
  imageURL : '',
  box : {},
  route : 'signin',
  isSignedIn : false,
  user : {
    id : undefined,
    name : '',
    email : '',
    entries : 0,
    joined : ''
}}
//route - to see which components will render
//isSignedIn - to know which options to display in the navigation, according to the route

class App extends React.Component {
  constructor() {
    super()
    this.state = initialState
  }
  loadUser = (data) => {
    this.setState({user : {
      id : data.id,
      name : data.name,
      email : data.email,
      entries : data.entries,
      joined : data.joined
    }})
  }

  onInputChange = (event) => {
    this.setState({input : event.target.value})
  }

  onSubmit = () => {
    this.setState({imageURL : this.state.input})
    fetch('https://agile-hamlet-40668.herokuapp.com/imageUrl', {
      method : 'post',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({
        input : this.state.input
      })
    })
    .then(response => response.json())
    .then(result => {
      if(result) {
        this.displayFaceBox(this.calculateBoundingBox(result))
        fetch('https://agile-hamlet-40668.herokuapp.com/image', {
          method : 'put',
          headers : {'Content-Type' : 'application/json'},
          body : JSON.stringify({
            id : this.state.user.id
          })
        })
        .then(response => response.json())
        .then(userEntries => {
          const user = {...this.state.user , entries : userEntries.entries}
          this.setState({user : user})
        })
        .catch(err => console.log(err))
      }
    })
    .catch(error => console.log('error', error));
  }
  

  calculateBoundingBox = (data) => {
    const faceCoordinates = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('image')
    const width = Number(image.width)
    const height = Number(image.height)
    
    return {
      leftCol : faceCoordinates.left_col * width,
      topRow : faceCoordinates.top_row * height,
      rightCol : width - (faceCoordinates.right_col * width),
      bottomRow : height - (faceCoordinates.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box : box})
  }

  onRouteChange = (route) => { 
    if(route === 'signout') {
      this.setState(initialState)
    } else if(route === 'homescreen') {
      this.setState({isSignedIn : true})
    }
    this.setState({route : route})
  }

  render () {
    return (
      <div>
        <Particle />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.state.route === 'homescreen'
        ? <div>
            <Logo />
            <Rank User={this.state.user} />
            <ImageFormLink onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
            <FaceDetection imageURL={this.state.imageURL} box={this.state.box}/>
          </div>
        :
        (
          this.state.route === 'signin'
          ? <SignIn loadUser={this.loadUser} onRouteChange ={this.onRouteChange}/>
          : <Register loadUser={this.loadUser} onRouteChange ={this.onRouteChange}/>
        )
        }
      </div>
    );
  }
}

export default App;