import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../services/api';
import { Main } from './styles';
interface ILoginRequest {
  username: string;
  password: string;
};

function LoginForm() {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup.string().required('Campo obrigatório'),
    password: yup.string().required('Campo obrigatório'),
  });

  const { register, handleSubmit, formState: { errors }} = useForm<ILoginRequest> ({
    resolver: yupResolver(schema),
  });

  function handleSubmitedData(data: ILoginRequest) {
    api.post('/login', data)
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.clear();
          sessionStorage.setItem('@ngcash:token', res.data.token);
          navigate('/dashboard', {replace: true});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function redirectToRegisterPage() {
    navigate('/register');
  };

  return (
    <Main>
      <h1>Login</h1>
      <div className='container'>
        <form onSubmit={handleSubmit(handleSubmitedData)}>
          <div className='input-holder'>
            <label htmlFor="">Username</label>
            <input 
              type="text"
              placeholder='digite seu username'
              {...register('username')}
            />
            <p className='error-message'>{errors.username?.message}</p>
          </div>

          <div className='input-holder'>
            <label htmlFor="">Senha</label>
            <input 
              type="password"
              placeholder='digite sua senha'
              {...register('password')}
            />
            <p className='error-message'>{errors.password?.message}</p>
          </div>

          <button className='login-button' type='submit'>Logar</button>
        </form>

        <div className='register-holder'>
          <p>Não possui uma conta? </p>
          <button className='register-button' onClick={redirectToRegisterPage}>Cadastre-se</button>
        </div>
      </div>
    </Main>
  );

};

export default LoginForm;