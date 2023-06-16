import {AsyncPaginate} from "react-select-async-paginate";
import React , {useState} from "react";
import {GEO_API_URL , geoApiOptions } from "../../api";

const Search = ({onSearchChange})=>{

    const [search , setSearch] = useState(null);

    const loadOptions = (inputValue) => {
        const minPopulation = 1000000;

        const url = `${GEO_API_URL}/cities?minPopulation=${minPopulation}&namePrefix=${inputValue}`;

        return (
            fetch(url , geoApiOptions)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                return {
                    options: response.data.map((city) => {
                      return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`,
                      };
                    }),
                }
            })
            .catch((err) => console.log(err))
        );
    }

    const handleOnChange = (e)=>{
        setSearch(e);
        onSearchChange(e);
    }

    return (
        <AsyncPaginate 
            placeholder="Search for the City"
            debounceTimeout={600}
            value = {search}
            onChange = {handleOnChange}
            loadOptions={loadOptions}
        />
    );
}

export default Search;