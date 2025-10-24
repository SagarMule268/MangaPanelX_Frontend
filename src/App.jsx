import { Route, Routes } from "react-router-dom";
import Layout from "./commponent/Layout";
import  "./App.css"
import Home from "./commponent/Home";
import MangaDetails from "./commponent/MangaDetails";
import Chapters from "./commponent/Chapters";
import ReadChapter from "./commponent/ReadChapter";
import MangaPage from "./commponent/MangaPage";
import About from "./commponent/About";
const App = () => {
 return (
      <Routes>

        <Route path="/" element={<Layout/>} >
            <Route index element={<Home/>} />
            <Route path="manga/:title/:id" element={<MangaDetails/>} />
            <Route path="manga" element={<MangaPage/>} />
            <Route path="about" element={<About/>} />
            <Route path="manga/view/:title/:id" element={<Chapters/>} />
            <Route path="manga/read/:chapterId" element={<ReadChapter />} />

        </Route>
      </Routes>
  
 )
};

export default App;
