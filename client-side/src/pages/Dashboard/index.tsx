import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Header from "../../components/Header";
import { FormContainer, ListContainer, ListHeader, Main } from "./styles";
import EmptyCard from "../../components/EmptyCard";
import { toast } from "react-toastify";

interface ITransactionResponse {
  created_at: string;
  id: string;
  value: number;
}

interface ITransactionRequest {
  username: string;
  amount: number;
}

function DashboardPage() {
  const token = sessionStorage.getItem("@ngcash:token");
  const [userBalance, setUserBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<ITransactionResponse[]>([]);
  const [display, setDisplay] = useState<ITransactionResponse[]>([
    ...transactions,
  ]);
  const [dateTransactions] = useState<ITransactionResponse[]>([]);
  const [date, setDate] = useState<string>("");

  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup.string().required("Campo obrigatório"),
    amount: yup.number().required("Campo obrigatório"),
  });

  const { register, handleSubmit } = useForm<ITransactionRequest>({
    resolver: yupResolver(schema),
  });

  function makeTransaction(data: ITransactionRequest) {
    api
      .patch("/transaction", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Transação realizada");
        setUserBalance(userBalance - res.data.value);
        setDisplay([...transactions, res.data]);
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`);
        console.log(err);
      });
  }

  function showAllTransactions() {
    setDisplay(transactions);
    console.log(display);
  }

  function filterByDate(event: FormEvent) {
    event.preventDefault();

    api
      .post(
        "/transaction/filter/date",
        {
          date: date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        res.data.length > 0 && setDisplay(res.data);
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`);
        console.log(err);
      });
  }

  function filterCashIn() {
    api
      .get("/transaction/filter/cashIn", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDisplay(res.data);
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`);
        console.log(err);
      });
  }

  function filterCashOut() {
    api
      .get("/transaction/filter/cashOut", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDisplay(res.data);
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`);
        console.log(err);
      });
  }

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    api
      .get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserBalance(res.data.account_id.balance);
      })
      .catch((err) => console.log(err));

    api
      .get("/transaction", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTransactions(res.data);
        setDisplay(res.data);
      })
      .catch((err) => console.log(err));
  }, [token, navigate]);

  return (
    <>
      <Header />

      <Main>
        <FormContainer>
          <form onSubmit={handleSubmit(makeTransaction)}>
            <div className="input-holder">
              <label htmlFor="">Conta destino</label>
              <input
                type="text"
                placeholder="Username destino"
                {...register("username")}
              />
            </div>

            <div className="input-holder">
              <label htmlFor="">Valor</label>
              <input
                type="text"
                placeholder="Quantidade a enviar"
                {...register("amount")}
              />
            </div>

            <button type="submit">Enviar</button>
          </form>

          <div className="balance-holder">
            <p id="balance-text">Balance:</p>
            <p id="value-amount">R${userBalance}</p>
          </div>
        </FormContainer>

        <div className="list-holder">
          <ListHeader>
            <h3>Transações</h3>
            <div className="button-holder">
              <button onClick={showAllTransactions}>Todos</button>
              <button onClick={filterCashIn}>Entrada</button>
              <button onClick={filterCashOut}>Saída</button>
            </div>

            <form onSubmit={filterByDate}>
              <input
                type="date"
                onChange={(event) => setDate(event.target.value)}
                id="date-input"
              />

              <button type="submit">Filtrar</button>
            </form>
          </ListHeader>

          {display.length > 0 ? (
            <ListContainer>
              <ul>
                {display.map((transaction) => (
                  <li key={transaction.id}>
                    <p id="date">Data: {transaction.created_at}</p>
                    <p>R${transaction.value}</p>
                  </li>
                ))}
              </ul>
            </ListContainer>
          ) : (
            <>
              <EmptyCard />
              <EmptyCard />
              <EmptyCard />
            </>
          )}
        </div>
      </Main>

      {dateTransactions.length > 0 && (
        <ul>
          {dateTransactions.map((transaction) => (
            <li key={transaction.id}>
              <p>{transaction.created_at}</p>
              <p>{transaction.value}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default DashboardPage;
