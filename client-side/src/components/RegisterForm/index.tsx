import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../services/api';

interface IRegisterRequest {
  username: string;
  password: string;
};

function RegisterForm() {

  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup.string().required('Campo obrigatório'),
    password: yup.string().required('Campo obrigatório'),
  });

  const { register, handleSubmit, formState: { errors }} = useForm<IRegisterRequest> ({
    resolver: yupResolver(schema),
  });
  
  function onSubmit(data: IRegisterRequest) {
    api.post('/register', data)
      .then((res) => {
        if (res.status === 201) {
          navigate('/login');
        };
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            type="text"
            placeholder='digite sua senha'
            {...register('password')}
          />
          <p>{errors.password?.message}</p>
        </div>

        <button type='submit'>Logar</button>
      </form>
    </div>
  )
};

export default RegisterForm;