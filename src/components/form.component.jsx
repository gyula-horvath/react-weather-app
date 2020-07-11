import React from 'react';
import './form.style.css';

const Form = props => {
    return (
        <div className="container">
            <div>{props.error ? error() : null}</div>
            <form onSubmit={props.loadWeather}>
                <div className="row">
                    <div className="col-md-3 offset-md-2">
                        <input type="text" name="city" autoComplete="off" className="form-control shadow-none bg-transparent text-white" placeholder="City" />
                    </div>
                    <div className="col-md-3">
                        <input type="text" name="country" autoComplete="off" className="form-control shadow-none bg-transparent text-white" placeholder="Country" />
                    </div>
                    <div className="col-md-3 mt-md-0 py-2 text-md-left">
                        <button className="btn btn-warning">Get Weather</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

function error() {
    return (
        <div className="aler alert-danger mx-5" role="alert">
            Please enter city and country
        </div>
    )
}

export default Form;