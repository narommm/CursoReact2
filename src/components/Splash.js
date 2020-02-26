import React, { Component } from 'react';
//withROuter funcion de alto orden
import {withRouter} from "react-router-dom";

 class Splash extends  Component{
    constructor(props){
        super(props);
        this.state ={
            loading: true,
        }
    }

    async componentDidMount(){
        //SI no existe el item devuelve undefined
        const token = localStorage.getItem("token");
        setTimeout(()=>{
            if(token){
                //Espera a que termine y pasa a la siguiente linea
                this.verifyToken(token);
            }else{
                //history se puede agregar una routa y redireccionar a otra ruta
                this.props.history.push("/login")
            }
        },2000)
    }
    verifyToken = async (token)=>{
        let config={
            method: 'GET',
            headers:{
                authorization: `Bearer ${token}`
            }
        }
        fetch('https://reactcourseapi.herokuapp.com/verifytoken', config)
        .then(res => {
            if(res.ok){
                this.setState({loading:false})
            }else{
             localStorage.removeItem("token");
             this.props.history.push("/login")
            }
        })
    }
    render(){
        const splash = (
        <div className="full-centered">
          <h1>Cargando.....</h1>
        </div>);

        return this.state.loading ? splash : this.props.children
    }
}
export default withRouter (Splash);