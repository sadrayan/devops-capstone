import React, { Component } from 'react';
import Photo from './Photo';
import NotFound from './NotFound';
import axios from 'axios';

export default class PhotoContainer extends Component {

  _isMounted = false;

  constructor() {
    super();
    this.state = {
      images: [],
      isLoading: true
    } 
  } 

  fetchData = (query = 'travel') => {
    const apiKey = process.env.REACT_APP_API_KEY
    axios
      .get(`https://api.unsplash.com/search/collections?per_page=24&page=1&query=${query}&client_id=${apiKey}`)
      .then(response => {
        this.setState({
          images: response.data.results,
          isLoading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  resetState = () => {
    this.setState({
      images: [],
      isLoading: true
    })
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchData(this.props.match.params.query)
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.key !== prevProps.location.key) {
      this.resetState();
      this.fetchData(this.props.match.params.query);
    }}
  } 

  render () {
    const data = this.state.images;
    let images;
    if(data.length > 0) {
      images = data.map( image => <Photo url={image.cover_photo.urls.small} key={image.id}/>)
    } else if (!this.state.isLoading) {
      images = <NotFound />
    }

    return (
      <div className="photo-container">
        <h2>{this.props.match.params.query ? 'Results of ' : ''}<span>{this.props.match.params.query}</span></h2>
        {this.state.isLoading ? <h1>Loading...</h1> : null}
        <ul className="photo-list">
          {images}
        </ul>
      </div>
    )
  }
}