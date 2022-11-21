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

function DashboardPage() {
  const token = sessionStorage.getItem("@ngcash:token");
  const [userBalance, setUserBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<ITransactionResponse[]>([]);
  const [display, setDisplay] = useState<ITransactionResponse[]>([...transactions]);
  const [dateTransactions, setDateTransactions] = useState<ITransactionResponse[]>([]);
  const [cashInTransactions, setCashInTransactions] = useState<ITransactionResponse[]>([]);
  const [cashOutTransactions, setCashOutTransactions] = useState<ITransactionResponse[]>([]);
  const [date, setDate] = useState<string>('');

  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup.string().required('Campo obrigatório'),
    amount: yup.number().required('Campo obrigatório')
  });

  const { register, handleSubmit, formState: { errors }} = useForm<ITransactionRequest> ({
    resolver: yupResolver(schema),
  });

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
      cashOutTransactions.length > 0 && (
        setCashOutTransactions([])
      );
      cashInTransactions.length > 0 && (
        setCashInTransactions([])
      );
      setDateTransactions(res.data)
    })
    .catch(err => console.log(err));
  };

  function filterCashIn() {
    api.get('/dashboard/transaction/filter/cashIn', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      cashOutTransactions.length > 0 && (
        setCashOutTransactions([])
      );
      setCashInTransactions(res.data);
    })
    .catch((err) => console.log(err));
  };

  function filterCashOut() {
    api.get('/dashboard/transaction/filter/cashOut', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      cashInTransactions.length > 0 && (
        setCashInTransactions([])
      );
      setCashOutTransactions(res.data);
    })
    .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    };

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
        setDisplay([...transactions]);
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

        <label htmlFor="">Dia da transação</label>
        <input type="date"
          onChange={(event) => setDate(event.target.value)}
        />

        <button type="submit">Filtrar</button>

      </form>

      {
        dateTransactions.length > 0 ? (
          <ul>
            {dateTransactions.map((transaction) => (
              <li key={transaction.id}>
                <p>{transaction.created_at}</p>
                <p>{transaction.value}</p>
              </li>
            ))}
          </ul>
        ) :

        <div>
          <p>Nada para mostrar</p>
        </div>
      }

      {
        cashInTransactions.length > 0 && (
          <ul>
            {cashInTransactions.map((transaction) => (
              <li key={transaction.id}>
                <p>{transaction.created_at}</p>
                <p>{transaction.value}</p>
              </li>
            ))}
          </ul>
        )
      }

      {
        cashOutTransactions.length > 0 && (
          <ul>
            {cashOutTransactions.map((transaction) => (
              <li key={transaction.id}>
                <p>{transaction.created_at}</p>
                <p>{transaction.value}</p>
              </li>
            ))}
          </ul>
        )
      }

      <div>
        <button onClick={filterCashIn}>Entrada</button>
        <button onClick={filterCashOut}>Saída</button>
      </div>

      <div>
        <button onClick={logOut}>Logout</button>
      </div>
    </>
  );
}

export default DashboardPage;
