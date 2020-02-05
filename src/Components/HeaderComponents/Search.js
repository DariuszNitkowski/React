import React from 'react';

const Search = React.memo(() => {
    
    console.log("w search")
    return ( 
        <div id="search">
            <input type="text" placeholder="search for products"/>
            </div>
     );
})
 
export default Search;