import getExpeditiousCache from 'express-expeditious'
import expeditiousEngineMemory from 'expeditious-engine-memory'

const defaultOptions = {
  namespace: 'expresscache',
  defaultTtl: '1 minute',
  engine: expeditiousEngineMemory(),
  statusCodeExpire: {
    401: '5 minutes',
    403: '5 minutes',
    404: '5 minutes',
    409: '5 minutes',
    500: 0
  }
}

const cacheInit = getExpeditiousCache(defaultOptions)

export default cacheInit

export { expeditiousEngineMemory, cacheInit }
