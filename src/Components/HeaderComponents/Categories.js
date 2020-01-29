import React from 'react';

const Categories = React.memo(() => {
    
    console.log("w categories")

    return ( <div className="categories">
        <select>
        <option>choose category</option>
            <option>ogrodnicotwo</option>
            <option>górnictwo</option>
            <option>grzebalnictwo</option>
            <option>sranie w banie</option>
            <option>ssanie paøy</option>
        </select>
    </div> );
})
 
export default Categories;