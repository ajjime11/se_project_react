import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

const LoginModal = ({ isOpen, onClose, onLogin, onSignUpClick }) => {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  };

  return (
    <ModalWithForm
      title="Log in"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText="Log in"
      altButtonText="or Sign Up"
      onAltClick={onSignUpClick}
    >
      <div className="modal__form-field">
        <label className="modal__label" htmlFor="login-email">
          Email*
          <input
            id="login-email"
            className="modal__input"
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="modal__form-field">
        <label className="modal__label" htmlFor="login-password">
          Password*
          <input
            id="login-password"
            className="modal__input"
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            required
          />
        </label>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
