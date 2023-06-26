import { Container } from "react-bootstrap";
import { Routes, Route, useParams, Navigate } from 'react-router-dom';
import Home from "./components/pages/Home";
import Table from "./components/pages/Table";
import NotFound from "./components/pages/NotFound";
import Header from "./components/views/Header";
import Footer from "./components/views/Footer";
import { fetchTables } from "./Redux/tablesRedux";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  return (
    <div>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/table/:id" element={<CheckTable />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Container>
    </div>
  );
};

const CheckTable = () => {
  const { id } = useParams();
  const tables = useSelector(state => state.tables);
  const table = tables.find(table => table.id === id);
  console.log(id)

  if (!table) {
    return <Navigate to="/" replace />;
  }

  return (
    <Table />
  );
};

export default App;


