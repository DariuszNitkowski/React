import React from 'react';

const User = (match) => {
    
    const logged=match.userState.logged

    return ( 
        <div id="body">
            {logged?<div>
            tutaj będą ustawianie użytkownika. jakiś adres, moze ustawienia kolorów strony it</div>:
            <div id="pageMsg">Please log in first</div>}
            </div>
     );
}
 
export default User;