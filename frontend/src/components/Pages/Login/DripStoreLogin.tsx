import classes from './DripStoreLogin.module.css'
import { Facebook } from '../../General/Icons/Facebook/Facebook'
import { Gmail } from '../../General/Icons/Gmail/Gmail'
import { PrimaryButton } from '../../General/Buttons/PrimaryButton'
import { useState } from 'react'
import { login, Status } from '../../../services/Auth'

export const DripStoreLogin = function () {
  const [username, setUsername] = useState(import.meta.env.FRONTEND_DEFAULT_USERNAME)
  const [password, setPassword] = useState(import.meta.env.FRONTEND_DEFAULT_PASSWORD)
  const [message, setMessage] = useState('')

  const requestSignIn = async () => {
    const content = await login(username, password)
    let message = ''
    if (content.status === Status.error) {
      message = 'Usuário e/ou senha inválidos'
    }
    setMessage(message)
  }

  return (
    <div className={classes.DripStoreLogin}>

      <div className={classes.DripStoreLoginContainer}>

        <div className={classes.DripStoreLoginForm}>
          <div className={classes.DripStoreLoginFormWrapper}>
            <div className={classes.DripStoreLoginFormTitle}>
              <div className={classes.DripStoreLoginFormTitleCaption}>Acesse sua conta</div>
              <div className={classes.DripStoreLoginFormTitleSignUp}>
                <p>
                  Novo cliente? Então registre-se <a href="">aqui</a>.
                </p>
              </div>
            </div>

            <div className={classes.DripStoreLoginFormBody}>
              <label>Login *</label>
              <div>
                <input
                  type="text"
                  placeholder="Insira seu login ou email"
                  onChange={(event) => setUsername(event.target.value)}
                  value={username}
                />
              </div>
              <label>Senha *</label>
              <div>
                <input
                  type="text"
                  placeholder="Insira sua senha"
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                />
              </div>
            </div>

            <div className={classes.DripStoreLoginFormRemember}>Esqueci minha senha</div>

            <div className={classes.DripStoreLoginFormSignIn}>
              <PrimaryButton
                label="Acessar Conta"
                fullWidth
                onClick={requestSignIn}
              />
            </div>

            {message && (
              <div className={classes.DripStoreLoginFormError}>{message}</div>
            )}

            <div className={classes.DripStoreLoginFormBottom}>
              <span>Ou faça login com</span>
              <div className={classes.DripStoreLoginFormBottomIcons}>
                <Facebook />
                <Gmail />
              </div>
            </div>
          </div>
        </div>

        <div className={classes.DripStoreLoginShoes}>
          <img
            src="/assets/shoes.png"
            alt="shoes"
          />
        </div>

      </div>

    </div>
  )
}
