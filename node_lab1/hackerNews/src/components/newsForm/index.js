import React, { Component } from 'react';

    export default class Form extends Component {
        state = {title : '',link : ''};

        addNews = (event) => {
            event.preventDefault();
            //e.preventDefault();
            let link = this.state.link.trim();
            let title = this.state.title.trim();
            console.log("link :: " + link)
            console.log("totle :: " + title);
            this.props.handleAdd(title,link);
            this.setState({title :'',link:''});
        };
        linkChange = (e) =>  this.setState({link : e.target.value});
        titleChange = (e) =>  this.setState({title : e.target.value});
        render() {
            return (
            <form style={{marginTop: '30px'}}>
               <h3>Add a news item</h3>
               <div className="form-group">
                  <input type="text" onChange={this.titleChange}
                    className="form-control" value={this.state.title}
                    placeholder="Title"></input>
               </div>
               <div className="form-group">
                   <input type="text" onChange={this.linkChange}
                     className="form-control" value={this.state.link}
                    placeholder="Link"></input>
               </div>
               <button type="submit" className="btn btn-primary" onClick={this.addNews}>Add</button>
            </form>
            );
        }
    }