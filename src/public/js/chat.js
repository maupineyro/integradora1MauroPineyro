//este es el chat.js de cliente

const socket = io()
let user; 
Swal.fire({
  title: "Identificate",
  input:"text",
  text: "Por favor ingresa tu nombre..",
inputValidator: (value)=>{
  return !value && "¡Necesitas escribir un nombre de usuario para continuar"
},
allowOutsideClick:false //impide que el usuario salga de la alerta 

})
.then(result=>{
  user = result.value;
  console.log(user);
  //Una vez que el usuario se identifica, lo asignamos a la variable user.
})