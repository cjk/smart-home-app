// @flow

import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import Typography from '@material-ui/core/Typography'

const tempRangeControl = theme => ({
  group: {
    display: 'flex',
    flexDirection: 'row',
  },
  selectors: {
    margin: `${theme.spacing.unit}px 0`,
  },
})

type Props = {
  tempLimits: string,
  changeAction: Function,
  classes: Object,
}

const FermenterTempRangeControl = ({ tempLimits, changeAction, classes }: Props) => {
  const tempLimitsAsStr = tempLimits ? tempLimits.toString() : ''

  const setTempRange = e =>
    /* Call action with new selected temp-range but convert numbers it from strings to floats first */
    changeAction(e.target.value.split(',').map(n => parseFloat(n)))

  return (
    <div className={classes.group}>
      <div className={classes.controlCol}>
        <Radio
          name="tempRange"
          aria-label="Temperaturbereich"
          className={classes.selectors}
          value={[28, 30].toString()}
          onChange={setTempRange}
          checked={tempLimitsAsStr === '28,30'}
        />
        <Typography>28-30</Typography>
      </div>
      <div className={classes.controlCol}>
        <Radio
          name="tempRange"
          aria-label="Temperaturbereich"
          className={classes.selectors}
          value={[29, 31].toString()}
          onChange={setTempRange}
          checked={tempLimitsAsStr === '29,31'}
        />
        <Typography>29-31</Typography>
      </div>
      <div className={classes.controlCol}>
        <Radio
          name="tempRange"
          aria-label="Temperaturbereich"
          className={classes.selectors}
          value={[30, 32].toString()}
          onChange={setTempRange}
          checked={tempLimitsAsStr === '30,32'}
        />
        <Typography>30-32</Typography>
      </div>
    </div>
  )
}

export default withStyles(tempRangeControl)(FermenterTempRangeControl)
