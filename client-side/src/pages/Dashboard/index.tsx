import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../../services/api";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// interface IUserResponse {
//   account_id: {
//     balance: number;
//     id: string;
//   };
//   id: string;
//   password: string;
//   username: string;
// };

interface ITransactionResponse {
  created_at: string;
  id: string;
  value: number;
};

interface ITransactionRequest {
  username: string;
  amount: number;
};

interface IDateFilterRequest {
  date: string;
};

function DashboardPage() {
  const token = sessionStorage.getItem("@ngcash:token");
  // const [userDashboard, setUserDashboard] = useState<IUserResponse>();
  const [userBalance, setUserBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<ITransactionResponse[]>([]);
  const [date, setDate] = useState<string>('');

  const schema = yup.object().shape({
    username: yup.string().required('Campo obrigatório'),
    amount: yup.number().required('Campo obrigatório')
  });

  const { register, handleSubmit, formState: { errors }} = useForm<ITransactionRequest> ({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  function logOut() {
    sessionStorage.clear();
    navigate('/login');
  };

  function makeTransaction(data: ITransactionRequest) {
    api.patch('/dashboard/transaction', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      setUserBalance(userBalance - res.data.value)
    })
    .catch(err => console.log(err));
  };

  function filterByDate(event: FormEvent) {
    event.preventDefault();
    
    api.post('/dashboard/transaction/filter/date', {
      date: date
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res)
    })
    .catch(err => console.log(err));
  };

  useEffect(() => {
    api
      .get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserBalance(res.data.account_id.balance);
      })
      .catch((err) => console.log(err));

    api
      .get("/dashboard/transaction", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div>
        <h2>Balance</h2>
        <p>{userBalance}</p>
      </div>

      {transactions.length > 0 && (
        <div>
          <h2>Transactions</h2>
          <ul>
            {transactions.map((transaction) => (
              <li key={transaction.id}>
                <p>{transaction.created_at}</p>
                <p>{transaction.value}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit(makeTransaction)}>
        <label htmlFor="">Conta destino</label>
        <input 
          type="text" 
          placeholder="Username destino"
          {...register('username')}
        />
        
        <label htmlFor=""></label>
        <input 
          type="text" 
          placeholder="Quantidade a enviar"
          {...register('amount')}
        />

        <button type="submit">Enviar</button>
      </form>
      
      <form onSubmit={filterByDate}>
        <h2>Filtrar</h2>
        <input type="radio"
          value='cashIn'
        />
        <label htmlFor="">Entrada</label>

        <input type="radio"
          value='cashOut'
        />
        <label htmlFor="">Saída</label>

        <label htmlFor="">Dia da transação</label>
        <input type="date"
          onChange={(event) => setDate(event.target.value)}
        />

        <button type="submit">Filtrar</button>

      </form>

      <div>
        <button onClick={logOut}>Logout</button>
      </div>
    </>
  );
}

export default DashboardPage;
