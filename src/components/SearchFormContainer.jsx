import React from 'react';
import FormContainer from './common/FormContainer';
import FormSearchBar from './common/FormSearchBar';
import FormSelect from './common/FormSelect';
import FormColors from './common/FormColors';
import ButtonDropDown from './common/ButtonDropDown';
import { search } from '../services/mtgSearch';

/**
 * Extends Form Container, renders forms for initiating an advanced search
 */
 class SearchFormContainer extends FormContainer {
     constructor(props){
        super(props);
        this.state = {
            data: {
                format: "",
                type: "",
                cmc: "",
                query: "",
                colors: []
            },
            isLoadingData: false
        }
     }

    /**
     * Assembles a string to explain what filters are active
     */
    getSearchDescription = () => {
        const { format, type, cmc, colors} = this.state.data;
        let description = "";

        if(format) description = `${description}${format},`;
        if(type) description = `${description}${type},`;
        if(cmc) description = `${description} Cost: ${cmc},`;
        if(colors) description = `${description}${colors}`;

        if(description === "") description += "None selected"
        return description;

    }

    /**
     * @Override Used to switch control from the element to React
     * Joi is not needed for this form, only valid options are presented
     */
    handleChange = ({ currentTarget: form }) => {
        const data = { ...this.state.data }
        data[form.name] = form.value;
        this.setState({ data });
    }

    /**
     * Similar to handleChange, exclusive for color selection
     */
    handleColors = (colors) => {
        const data = { ...this.state.data }
        data.colors = colors;
        this.setState({ data });
    }

    /**
     * @Override Submits the query with filter options from props
     */
    doSubmit = (e) => {
        e.preventDefault();
        
        try{
            let res;
            this.setState({ isLoadingData: true }, async () => {

                res = await search(this.state.data, 16, 1)
                console.log(res)
                console.log(JSON.stringify(res))
                const { data } = await res;
                this.props.updateQueriedCards(data.cards);
                this.setState({ isLoadingData: false })
                //console.log(res);
               // console.log("promise:-- " , data);
               // console.log("cards:--" , data.cards);
            })
        }
        catch(ex){
            this.setState({ isLoadingData: false })
            console.log(ex);
            console.log("error occurred")
        }
      //  console.log(Object.keys(promise.data));
        //console.log(JSON.stringify(promise.data));
       
    }

    render() { 
        const { data, isLoadingData } = this.state;

        return (  
            <React.Fragment>
                <div className = "form-row justify-content-center">
                    <div className = "col-2 pt-3">
                        <FormSelect 
                            name = {"format"} //used to identify form data
                            label = {"Select a Format"}
                            handler = {this.handleChange}
                            value = {data.format} 
                            options = {
                                ["Casual", "Standard", "Modern", "Vintage", "Commander", "Legacy", "Oathbreaker", "Frontier"]
                            }
                        />
                    </div>

                <div className = "col-2 pt-3">
                    <FormSelect
                        name = {"type"} //used to identify form data
                        label = {"Select Card Type"}
                        handler = {this.handleChange}
                        value = {data.type} 
                        options = {
                            ["Artifact", "Creature", "Enchantment", "Instant", "Land", "Legendary", "Sorcery"]
                        }
                    />
                </div>
                
                <div className = "col-1 pt-3">
                    <FormSelect 
                        name = {"cmc"} //used to identify form data
                        label = {"Mana"}
                        handler = {this.handleChange}
                        value = {data.cmc} //prev set value
                        options = {
                            ['0', '1', '2', '3', '4', '5','6','7','8','9','10+']
                        }>
                    </FormSelect>
                </div>
                
                <div className = "col-4">
                    <FormSearchBar 
                        name = {"query"}
                        onChange = {this.handleChange}
                        onSubmit = {this.doSubmit}
                        isLoading = { isLoadingData }
                    />
                </div>
            </div>
            
            <div className = "form-row justify-content-center">
                <div className = "col-4 text-right">
                    <ButtonDropDown 
                        buttonlabel = "Basic Lands"
                        labels = {["Mountain", "Forest", "Island", "Plains", "Swamp"]}
                        onClickHandler = {this.props.addBasicLand}
                    />
                </div>
                <div className = "col-4  text-center">
                    <FormColors 
                        handleColors = {this.handleColors}
                    />
                </div>
                <div className = "col-4 text-left">
                    {this.getSearchDescription()}
                </div>
            </div>
                            
        </React.Fragment>
        );
     }
 }
  
 export default SearchFormContainer;
