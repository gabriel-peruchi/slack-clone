import { serverHttp } from './server'

const port = process.env.PORT || 3333

serverHttp.listen(port, () => console.log(`Server is running on port ${port}`))
