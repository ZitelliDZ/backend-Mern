import https from 'https'
import path from 'path'
import * as fs from 'fs'

const sv = (app) => {
  const options = {
    key: fs.readFileSync(path.join(process.cwd(), 'src', 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(process.cwd(), 'src', 'cert', 'cert.pem'))
  }
  return https.createServer(options, app)
}
export default sv
