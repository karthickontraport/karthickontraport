import PropTypes from 'prop-types';

export const LoginProps = {
    onSubmit:PropTypes.func,
    EmailPlaceHolder:PropTypes.string,
    EmailHtmlId:PropTypes.string,
    PasswordHtmlId:PropTypes.string,
    KeyPlaceHolder: PropTypes.string,
    HeadingText: PropTypes.string,
    emailValue:PropTypes.string,
    emailOnChange:PropTypes.func,
    passwordValue:PropTypes.string,
    passwordOnChange:PropTypes.func,
    buttonDisabled:PropTypes.bool,
    buttonText: PropTypes.string,
    errorText:PropTypes.string
}