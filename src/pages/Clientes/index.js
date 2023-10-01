import React from 'react';
import './Clientes.css';
import {useNavigate} from 'react-router-dom';
import TablaClientes from '../../components/TablaClientes';


const Clientes = () => {
    const navigate = useNavigate();
    return (
        <div className='grid-layout'>
            <div className='header'></div>
            <div className='nav'>
                <div className='ContenedorBotones'>
                    <button className='BotonPrincipal' onClick={()=>navigate(`/Clientes/`)}><h2>Clientes</h2></button>
                    <button className='BotonPrincipal' onClick={()=>navigate(`/`)}><h2>Pedidos</h2></button>
                    <button className='BotonPrincipal' onClick={()=>navigate(`/Productos/`)}><h2>Productos</h2></button>
                </div>
            </div>
            <div className='main'>
                <TablaClientes/>
                <div className='contenedor'></div>
            </div>
            <div className='footer'></div>
        </div>
    )
}

export default Clientes;