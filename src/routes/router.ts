import userRoute from './user-route'
import express from 'express'

const router = express()

router.use('/api/users', userRoute)

router.get('/', (req: express.Request, res: express.Response) => {
  res.send('api working')
})

export default router
