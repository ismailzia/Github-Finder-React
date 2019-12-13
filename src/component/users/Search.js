import React, { Component } from 'react'
import PropTypes from 'prop-types';


class Search extends Component {
    static propTypes={
        searchUser: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
    }

    state={
        text:''
    }

    onSubmit = e =>{
        e.preventDefault();
        if(this.state.text === ''){
          this.props.setAlert('please enter something', 'light')
        }else{
            this.props.searchUser(this.state.text);
            this.setState({text:''});
        }
    }

    onChange = e => this.setState({[e.target.name]:e.target.value});

    render() {
        return (
            <div>
                <form className="form" onSubmit={this.onSubmit}>
                    <input 
                        type='text' 
                        name='text' 
                        placeholder="Search Users..."
                        value={this.state.text}
                        onChange={this.onChange}
                        />
                    <input 
                        type='submit' 
                        value="Search" 
                        className="btn btn-dark btn-block"
                        />
                </form>
                {this.props.showClear && <button className='btn btn-ligth btn-block' onClick={this.props.clearUsers}>Clear</button>}
            </div>
        )
    }
}

export default Search
