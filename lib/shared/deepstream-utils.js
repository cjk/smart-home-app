// @flow

import type { Action, Client } from '../../types'

import { Observable } from 'rxjs'

function getEntriesFromRecordList(client: Client, listname: string) {
  const lst = client.record.getList(`smartHome/${listname}`)

  return Observable.bindCallback(cb => lst.whenReady(cb))().mergeMap(lst =>
    Observable.from(
      lst
        .getEntries()
        .map(e => client.record.getRecord(e))
        .map(r => Observable.bindCallback(cb => r.whenReady(cb))())
    )
      .concatAll()
      .toArray()
  )
}

export { getEntriesFromRecordList }
