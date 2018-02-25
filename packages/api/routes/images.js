import sharp from 'sharp'
import multer from 'multer'
import { middleware as cache } from 'apicache'
import { rawQuery } from '../data/local'
import { Image } from '../data/connectors'

export default app => {
  app.use('/upload', multer().single('attachment'), ({ file, body }, res) => {
    if (file) {
      const { name, buffer, mimetype, size } = Object.assign(file, body)

      Image.create({
        name,
        size,
        mimetype,
        buffer
      }).then(({ dataValues: { id, name } }) => {
        res.status(200).json({ id, name })
      })
    } else {
      res.status(403).json({ error: 'No input' })
    }
  })

  app.get('/img/:id', cache('1 year'), (req, res) => {
    const { id } = req.params

    rawQuery([`
      image(id: ${id}) {
        mimetype
        size
        buffer
      }
    `]).then(({ data }) => {
      const { buffer, mimetype, size } = data.image

      res.set('Content-Type', mimetype)
      res.set('Content-Disposition', 'inline')

      if (req.query.size) {
        const h = parseInt(req.query.size)
        const w = h

        sharp(Buffer.from(buffer)).resize(w, h).max().toBuffer((err, newBuffer, info) => {
          if (err) {
            throw err
          }

          res.set('Content-Length', info.size)
          res.end(Buffer.from(newBuffer, 'binary'))
        })
      } else {
        res.set('Content-Length', size)
        res.end(Buffer.from(buffer, 'binary'))
      }
    }).catch(e => {
      res.status(404).end(e.message)
    })
  })
}
