import { serverHttp } from './server'

serverHttp.listen(process.env.PORT || 8000, () =>
  console.log('Server is running on port 8000')
)
