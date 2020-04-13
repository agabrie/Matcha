import React, {Component} from 'react';
import axios from 'axios';
// import FormData from 'form-data';

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
    submit=async ()=>{
        // image upload endpoint
        var url = `http://localhost:4000/api/users/uploadImage/${this.state.username}`;
        var form = new FormData();
        var file = this.state.imageFile;
        form.append('file', file,this.state.rank);
        form.append('rank',this.state.rank)
        await axios.post(url, form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((data)=>{
          if (data.status){
            console.log(data);
            // res.redirect('/search');
          }
        }).catch((err)=>{
          console.log(err)
        });
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