import 'dotenv/config'
import './infra/mongoose/connection'

import { serverHttp } from './infra/http/app'
import './infra/websocket/app'

const port = process.env.PORT || 3333

serverHttp.listen(port, () => console.log(`Server is running on port ${port}`))
