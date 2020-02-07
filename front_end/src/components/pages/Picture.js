import React, {Component} from 'react';
// import axios from 'axios';

class Picture extends Component{
    constructor(props){
      super(props);
      this.state = {value:this.props.value}
    };
    changeImage=(src)=>{
      this.setState({value:src});
    }
    render(){
      return(
      <div>
        <img src={this.props.value} width="600px" height="400px" alt=""/>
      </div>);
    }
  }
  class ImageUpload extends Component{
    constructor(props){
      super(props);
      this.state = {rank:0,imageFile:null,image:"",visibility:false, username:""};
    }
    onChangeHandler=event=>{
        var file = event.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.setState({
            image: reader.result,
            imageFile:file,
            visibility:true
          })
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        }
    }
    submit=()=>{
        // image upload endpoint
        var url = `http://localhost:4000/api/users/updateImage/${this.state.username}`;
        var headers = {
            'Content-Type': 'application/json'
        }
        fetch(url, {
            method: 'post',
            headers:headers,
            body:{images:[{rank:this.state.rank,src:this.state.image}]}
        })
        .then(res => res.json())
        .then(json => {
            // var usersArr = [];
            // if(json._id)
            // usersArr.push(json);
            // else
            // usersArr = json
            // this.setState({users:usersArr, isLoading:false});
            console.log(json);
        })
        .catch(err=>{
            console.log(err)
        });
        console.log(this.state);
    }
    render(){
      return (
        <div className="imageUpload">
          <input className="upload" id="file" type="file" name="file" onChange={this.onChangeHandler}/>
          <label htmlFor="file">Choose a file</label>
          {this.state.visibility?<Picture value={this.state.image} />:<br />}
          <input type="text" placeholder="Username" id="username" onChange={event=>{this.setState({username:event.target.value})}}/>
          <input type="text" placeholder="Rank" id="rank" onChange={event=>{this.setState({rank:event.target.value})}}/>
          <button onClick={this.submit}>upload</button>
        </div>
      );
    }
  }
  
  export default ImageUpload;