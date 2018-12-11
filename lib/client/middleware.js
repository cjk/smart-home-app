// @flow

import logger from 'debug'
import DsClient from './'

const debug = logger('smtApp:createClientDeps')

// Intialize and login to deepstream-network
// Note: for now we ignore the login-data returned from the deepstream-client
const dsClient = new DsClient()
dsClient.login().subscribe(loginData => debug(`Deepstream login-data: ${loginData}`))

const dependencies = { clientConnection: dsClient, client: dsClient.client }

export default dependencies
