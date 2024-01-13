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
  try {
    const { param, url } = req.body

    if (
      !param ||
      !url ||
      typeof param !== 'string' ||
      typeof url !== 'string'
    ) {
      return res.status(400).json({ error: 'Parámetros inválidos' })
    }

    const maxParamLength = 50
    const maxUrlLength = 255

    if (param.length > maxParamLength || url.length > maxUrlLength) {
      return res.status(400).json({ error: 'Longitud de parámetros excedida' })
    }

    const newUrl = await Urls.create({ param, url })

    res.status(200).json(newUrl)
  } catch (error) {
    console.error('Error al crear el elemento:', error)

    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
