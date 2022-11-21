import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../services/api';
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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(handleSubmitedData)}>
        <div>
          <label htmlFor="">username</label>
          <input 
            type="text"
            placeholder='digite seu username'
            {...register('username')}
          />
          <p>{errors.username?.message}</p>
        </div>

        <div>
          <label htmlFor="">Senha</label>
          <input 
            type="password"
            placeholder='digite sua senha'
            {...register('password')}
          />
          <p>{errors.password?.message}</p>
        </div>

        <button type='submit'>Logar</button>
      </form>

      <div>
        <p>Não possui uma conta? </p>
        <button onClick={redirectToRegisterPage}>Cadastre-se</button>
      </div>
    </div>
  );

};

export default LoginForm;