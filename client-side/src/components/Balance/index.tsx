import api from "../../services/api";

function Balance() {
  const token = localStorage.getItem('@kenziehub:token');
  console.log(token);
  const balance = api.get('/dashboard');

  return (
    <div>
      <span></span>
    </div>
  );
};

export default Balance;