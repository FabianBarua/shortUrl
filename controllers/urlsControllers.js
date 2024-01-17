const Urls = require('../models/Urls')

module.exports.open = async (req, res) => {
  try {
    const result = await Urls.findOne({ where: { param: req.params.param } })
    if (result) {
      res.redirect(result.url)
    } else {
      res.status(404).send('No se encontró el elemento')
    }
  } catch (error) {
    res.status(500).send('Error interno del servidor')
  }
}
module.exports.create = async (req, res) => {
  const { param, url } = req.body

  // Validar existencia y tipo de parámetros
  if (!param || !url || typeof param !== 'string' || typeof url !== 'string') {
    return res.status(400).json({ error: 'Parámetros inválidos' })
  }

  // Validar longitud de parámetros
  const maxParamLength = 50
  const maxUrlLength = 255
  if (param.length > maxParamLength || url.length > maxUrlLength) {
    return res.status(400).json({ error: 'Longitud de parámetros excedida' })
  }

  // Validar si la URL es válida
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/
  if (!url.match(urlRegex)) {
    return res.status(400).json({ error: 'Formato de URL inválido' })
  }

  // Buscar si la URL ya existe en la base de datos
  const existingUrl = await Urls.findOne({ where: { param: param } })

  // Obtener el prefix de la URL del servidor (puedes ajustar esto según tu entorno)
  const serverUrl = req.protocol + '://' + req.get('host')
  const serverUrlPrefix = serverUrl.replace(/\/$/, '') // Eliminar la barra final, si existe

  // Validar que la URL no tenga el mismo prefix que la del servidor (origin)
  if (url.startsWith(serverUrlPrefix)) {
    return res
      .status(400)
      .json({
        error: 'La URL no puede tener el mismo prefijo que la del servidor'
      })
  }

  if (existingUrl) {
    return res
      .status(400)
      .json({ error: 'Ya existe un registro con este parámetro' })
  }

  try {
    // Crear nueva URL
    const newUrl = await Urls.create({ param, url })
    res.status(201).json(newUrl) // 201 Created en lugar de 200 OK para indicar creación exitosa
  } catch (error) {
    console.error('Error al crear el elemento:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
