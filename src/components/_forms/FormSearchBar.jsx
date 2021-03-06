import React from 'react';

const FormSearchBar = ({ name, onChange, onSubmit, isLoading }) => {
    return (  
        <form onSubmit = {(e) => onSubmit(e)}>
            
            <div className = "input-group">
                <input
                    disabled = { isLoading }
                    type = "text"
                    name = {name}
                    className = "form-control my-3"
                    placeholder = "Search for cards. . ."
                    onChange = {(e) => onChange(e)}
                />

                <div className = "input-group-append  my-3">
                    <button 
                        disabled = { isLoading }
                        className = "btn btn-outline-secondary" 
                        type = "button"
                        onClick = { (e) => onSubmit(e) }>Search
                    </button>
                </div>
            </div>
        </form>
    );
}
 
export default FormSearchBar;
