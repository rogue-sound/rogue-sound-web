import React from 'react';
import { useIntl } from 'react-intl';
/** Services */
import { login } from '@services/auth';
/** Utils */
import { saveRedirectPath } from '@utils';
/** Common components */
import Button from '@common/Button';

const LoginButton = () => {
  const intl = useIntl();

  const loginHandler = () => {
    saveRedirectPath();
    login();
  };

  return (
    <Button theme="login" onClick={loginHandler}>
      {intl.formatMessage({
        id: 'app.layout.Header.LoginButton',
      })}
    </Button>
  );
};

LoginButton.propTypes = {};

export default LoginButton;
