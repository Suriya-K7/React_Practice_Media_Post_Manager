import Home from "./components/Home";
import About from "./components/About";
import Footer from "./components/Footer";
import Missing from "./components/Missing";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import EditPost from "./components/EditPost";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { DataProvider } from "./context/DataContext";
// if used from server
// import api from "./api/api";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header title="Social Media posts Manager" />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="post">
            <Route index element={<NewPost />} />
            <Route path=":id" element={<PostPage />} />
          </Route>
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
