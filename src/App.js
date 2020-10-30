import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rover: "curiosity",
      camera: "",
      firstphoto: null,
      error: "",
      loading: "",
      request: false
    };
  }

  handleroverselector = (event) => {
    this.setState({
      rover: event.target.value,
      camera: ""
    });
  }


  handlecameraselection = (event) => {
    this.setState({ camera: event.target.value });
  }


  handleSubmit = (event) => {

    this.setState({
      loading: "Loading...",
    });


    let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${this.state.rover}/photos?sol=100&camera=${this.state.camera}&api_key=Tv6gAKvEQVPyIf0KwDIHRQXRuJ17XQYIEETD2e35`;

    axios.get(url)
      .then((res) => {
        if (res.data.Error) {
          this.setState({
            error: res.errors
          });
        } else {
          let photo = "";
          for (let i = 0; i < res.data.photos.length; i++) {
            console.log(i)
            if (!!res.data.photos[i]) {
              photo = res.data.photos[i].img_src;
              console.log(photo)
            } else {
              photo = null;
            }
          }

          this.setState({
            firstphoto: photo,
            loading: "",
            request: true
          });
        }
      });
  }

  renderPhoto() {

    return <img className='images' alt="No images found" src={this.state.firstphoto} />;

  }


  render() {

    let roverCameras = {
      "spirit": [
        {
          Abbreviation: "FHAZ",
          Camera: "Front Hazard Avoidance Camera"
        },
        {
          Abbreviation: "RHAZ",
          Camera: "Rear Hazard Avoidance Camera"
        },
        {
          Abbreviation: "NAVCAM",
          Camera: "Navigation Camera"
        },
        {
          Abbreviation: "PANCAM",
          Camera: "Panoramic Camera"
        }
      ],
      "curiosity": [
        {
          Abbreviation: "FHAZ",
          Camera: "Front Hazard Avoidance Camera"
        },
        {
          Abbreviation: "RHAZ",
          Camera: "Rear Hazard Avoidance Camera"
        },
        {
          Abbreviation: "MAST",
          Camera: "Mast Camera"
        },
        {
          Abbreviation: "CHEMCAM",
          Camera: "Chemistry and Camera Complex"
        },
        {
          Abbreviation: "NAVCAM",
          Camera: "Navigation Camera"
        },
      ],
      "opportunity": [
        {
          Abbreviation: "NAVCAM",
          Camera: "Navigation Camera"
        },
        {
          Abbreviation: "PANCAM",
          Camera: "Panoramic Camera"
        }
      ]


    }

    let photos = {
      name: 'name',
      img_src: 'img_src'
    }


    return (
      <div className="App">
        <div class="jumbotron">
          <h1 class="display-4">Infovalue Challenge</h1>
        </div>
        <div>
          <label className="texts">Rovers:
          <br />
            <select class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" value={this.state.rover} onChange={this.handleroverselector}>
              <option class="dropdown-item" value="curiosity">Curiosity</option>
              <option class="dropdown-item" value="spirit">Spirit</option>
              <option class="dropdown-item" value="opportunity">Opportunity</option>
            </select>
          </label>
        </div>

        <br /><br />

        <label className="texts">Cameras:
          <br />
          <select class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" value={this.state.camera} onChange={this.handlecameraselection}>
            <option class="dropdown-item" value={''}>Select one</option>
            {roverCameras[this.state.rover].map((selectedcamera) =>
              <option key={selectedcamera.Abbreviation} value={selectedcamera.Abbreviation}>{selectedcamera.Camera}</option>
            )}
          </select>
        </label>

        <br /><br />

        <button class="btn btn-secondary" onClick={this.handleSubmit}>Search</button>

        <br /><br />

        <p>{this.state.loading}</p>

        {this.renderPhoto()}


      </div>
    );
  }
}