import classes from './DripStoreHead.module.css'
import { DripStoreLoginLogo } from './DripStoreHeadLogo'
import { Link, useNavigate } from 'react-router-dom'
import { PrimaryButton } from '../Buttons/PrimaryButton'

export const DripStoreHead = function () {
  const navigate = useNavigate()
  return (
    <div className={classes.DripStoreHead}>
      <div className={classes.DripStoreHeadContainer}>
        <Link
          className={classes.DripStoreHeadWrapper}
          to={'/'}
        >
          <div className={classes.DripStoreHeadBrand}>
            <div className={classes.DripStoreHeadLogo}>
              <DripStoreLoginLogo className={classes.DripStoreHeadIcon} />
            </div>
            <div className={classes.DripStoreHeadCompany}>Digital Store</div>
          </div>
        </Link>

        <div className={classes.DripStoreHeadSeparator} />

        <div className={classes.DripStoreHeadRight}>
          <PrimaryButton
            label={'Entrar'}
            onClick={() => navigate('/login')}
          />
        </div>
      </div>
    </div>
  )
}
