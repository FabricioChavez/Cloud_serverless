import { useState } from 'react';
import '../css/Login.css';
import placeholderImage from '../visitantes/Placeholder.jpg'; // Importar la imagen de placeholder

function Employee_registration(){

    const [image, setImage] = useState('');
    const [mensajeDeCarga, setMensajeDeCarga] = useState('Por favor complete todos los campos e ingrese una imagen.');
    const [autentificado, Setautentificado] = useState(false);
    const [firstName, setFirstName] = useState(''); // Estado para el nombre
    const [lastName, setLastName] = useState(''); // Estado para el apellido
    const [tenantId, setTenantId] = useState(''); // Estado para tenantId
    const [visitorImageName, setVisitorImageName] = useState('placeholder');

    function sendImage(e){
      e.preventDefault();
      if (!firstName || !lastName || !tenantId) {
          setMensajeDeCarga('Por favor ingrese todos los campos.');
          return; // Detiene la ejecución si falta algún campo
      }
      const imageName = `${firstName}_${lastName}_${tenantId}.jpeg`; // Construir el nombre del archivo

      fetch(`https://ed32u8vxs7.execute-api.us-east-1.amazonaws.com/dev/empleados-registrados/${imageName}`,
      {
        method:'PUT', 
        headers: {
          'Content-Type':'image/jpeg'
        },
        body: image
      }
      ).then(async () => {
        setVisitorImageName(imageName); // Actualizar el nombre después de subir la imagen
        // Aquí podrías agregar tu lógica de autenticación o cualquier otra acción posterior.
        Setautentificado(true);
        setMensajeDeCarga(`Imagen de ${firstName} ${lastName} subida correctamente.`);
      }).catch(error => { 
        Setautentificado(false);
        setMensajeDeCarga('Error al subir la imagen, por favor intente nuevamente.');
        console.log(error);
      });
    }
 
    const imageUrl = visitorImageName === 'placeholder' 
                     ? placeholderImage
                     : `https://empleados-registrados.s3.amazonaws.com/${visitorImageName}`;

    return (
      <>
        <h2>Registro de Empleados</h2>
        <div className="App">
          <div className={autentificado ? 'success' : 'failure'}>
            {mensajeDeCarga}
          </div>
          <form onSubmit={sendImage}>
            <label htmlFor='firstName'>Nombre: </label>
            <input type='text' name='firstName' placeholder='Ingrese el Nombre' onChange={e => setFirstName(e.target.value)} required/>
            <label htmlFor='lastName'>Apellido: </label>
            <input type='text' name='lastName' placeholder='Ingrese el Apellido' onChange={e => setLastName(e.target.value)} required/>
            <label htmlFor='tenantId'>Tenant ID: </label>
            <input type='text' name='tenantId' placeholder='Ingrese Tenant ID' onChange={e => setTenantId(e.target.value)} required/>
            <label htmlFor='image'>Imagen: </label>
            <input type='file' name='image' onChange={e => setImage(e.target.files[0])} required/>
            <div className="button-container">
              <button type='submit'> Registrar Empleado </button>
            </div>
          </form>
          <img src={imageUrl} alt="Empleado" height={250} width={250}/>
        </div>

        <div className='float-buttons'>
          <button className='float-button' onClick={() => window.location.href='/login'}>Login</button>
          <button className='float-button' onClick={() => window.location.href='/register'}>Register</button>
        </div>
      </>
    );
}

export default Employee_registration;
