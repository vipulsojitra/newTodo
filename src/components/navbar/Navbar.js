import React from 'react'
import { Link,withRouter} from 'react-router-dom'
const Navbar=(props)=> {
    
        return ( 
<nav>
<div className="nav-wrapper">
  <ul id="nav-mobile" className="right ">
    <li><Link to="/">Home</Link></li>
    <li><Link to="/history">History</Link></li>
  </ul>
</div>
</nav>

         );
    
}
 
export default withRouter( Navbar);