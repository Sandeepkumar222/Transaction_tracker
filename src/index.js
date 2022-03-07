import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css'

ReactDOM.render( <>
<div className = "bg">
<App />
</div>
</>,
 document.getElementById('root'));
 