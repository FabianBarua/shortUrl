import axios from 'axios'
import Swal from 'sweetalert2'
import uniqid from 'uniqid'

// Seleccionar el formulario y los inputs
const form = document.getElementById('form')
const paramInput = document.querySelector('input[name="param"]')
const urlInput = document.querySelector('input[name="url"]')

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: toast => {
    toast.onmouseenter = Swal.stopTimer
    toast.onmouseleave = Swal.resumeTimer
  }
})

// Agregar evento de envío al formulario
form.addEventListener('submit', function (event) {
  event.preventDefault()

  // Obtener valores de los inputs
  const paramValue = paramInput.value
  const urlValue = urlInput.value

  // Realizar la petición con axios
  axios
    .post('/add', { param: paramValue, url: urlValue })
    .then(response => {
      Swal.fire({
        title: 'Link acortado!',
        text: `Tu link fue acortado: ${window.location.origin}/${paramValue}`,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Copiar!'
      }).then(result => {
        if (result.isConfirmed) {
          navigator.clipboard.writeText(
            `${window.location.origin}/${paramValue}`
          )
          Toast.fire({
            icon: 'success',
            title: 'Url Copiada'
          })
        }
      })
    })
    .catch(error => {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.error
      })
    })
})

// BOTON GENERAR

const btnGenerate = document.getElementById('gen')
btnGenerate?.addEventListener('click', () => {
  paramInput.value = uniqid()
})
