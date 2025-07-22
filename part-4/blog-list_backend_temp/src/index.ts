import app from './app'

import config from './utils/config'
import logger from './utils/logger'

// Start the server
app.listen(config.PORT, () => {
  logger.info(`Server is running on p0rt ${config.PORT}`)
})