import express, { Request, Response } from 'express'
const OpenTok = require('opentok')

const openTok = new OpenTok(process.env.VIDEO_API_KEY, process.env.VIDEO_API_SECRET)

export const vonageRouter: express.Router = express.Router()

vonageRouter.get('/join/:userLogin', (request: Request, response: Response) => {
  const userLogin: string = request.params.userLogin
  openTok.createSession({ mediaMode: "routed", archiveMode: 'always' }, (err, session) => {
    if (err) {
      response.status(500).send(err)
    }
    getToken(response, session.sessionId, userLogin)
  })
})

function getToken(response: Response, sessionId: string, userLogin: string) {
  const token = openTok.generateToken(sessionId, {
    role: 'publisher',
    expireTime: (new Date().getTime() / 1000) + (30 * 60),
    data: `name=${userLogin}`
  })

  response.status(200).json({
    apiKey: process.env.VIDEO_API_KEY,
    sessionId,
    token
  })
}