import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import jwt from "jsonwebtoken"

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageFormLink from './components/ImageFormLink/ImageFormLink';
import Entries from './components/Entries/Entries';
import Particle from './components/Particles/Particle';
import FaceDetection from './components/FaceDetection/FaceDetection';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import RankList from './components/RankList/RankList';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';

const initialState = {
  input : '',
  imageURL : '',
  box : {},
  user : {
    id : undefined,
    name : '',
    email : '',
    entries : 0,
    joined : ''
  },
  ranking : []
}

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

  setToken = (data) => {
    localStorage.setItem('token', data)
  }

  checkToken = (userToken) => {
      const decoded = jwt.verify(userToken, 'WILL2009', (err, decode) => {
        if(err) {
            return err 
        }
        return decode
      })
      return decoded
  }

  getToken = () => {
    const userToken = localStorage.getItem('token')
    const isValidToken = this.checkToken(userToken)
    if(isValidToken.userId) {
      return {
        userToken : userToken,
        isValidToken : isValidToken
      }
    }
    if(!isValidToken.userId) {
      localStorage.clear()
      return isValidToken
    }
  }

  componentDidMount () {
    const token = this.getToken()
    if(token.isValidToken) {
      fetch(`https://agile-hamlet-40668.herokuapp.com/profile/${token.isValidToken.userId}`)
      .then(response => response.json())
      .then(data => this.loadUser(data))
    }
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

  displayRank = async () => {
    const response = await fetch('https://agile-hamlet-40668.herokuapp.com/ranking')
    const ranking = await response.json()
    ranking.sort((a, b) => b.entries - a.entries)
    this.setState({ranking : ranking})
  }

  render () {
    return (
      <BrowserRouter>
        <Particle />
        <Navigation displayRank={this.displayRank}/>;
        <Toaster />
        <Routes>
          <Route element={<ProtectedRoutes getToken={this.getToken} loadUser={this.loadUser} />}>
            <Route 
              path='/smartbrain' 
              element={
                <>
                  <Logo />
                  <Entries User={this.state.user} />
                  <ImageFormLink onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
                  <FaceDetection imageURL={this.state.imageURL} box={this.state.box}/>
                </>
            }/>
            <Route 
              path='/ranking'
              element={<RankList ranking={this.state.ranking}/>}
            />
          </Route>
          <Route 
            path='/signin' 
            element={<SignIn loadUser={this.loadUser} setToken={this.setToken}/>}
          />
          <Route 
            path='/register' 
            element={<Register loadUser={this.loadUser} setToken={this.setToken}/>}
          />
          <Route 
            path='*'
            element={<Navigate to="/smartbrain" />}
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;