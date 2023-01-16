import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './registered.styles.css';
const Registered = () => {
   const { teamID } = useParams();
   const navigate = useNavigate();
   return (
      <div className='registered'>
         <p>
            El numero de equipo es:
            <br />
            <span>{teamID}</span>
            <br />
            compartelo con tus compañeros para que se unan a tu equipo
         </p>
         <button onClick={() => navigate('/')}>ir al inicio</button>
      </div>
   );
};

export default Registered;
