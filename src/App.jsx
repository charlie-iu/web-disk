import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from 'store';
import MainContent from "../src/app/MainContent";
import Login from "./app/Login";
import Register from "./app/Register";
import { navList } from './app/BaseData';
import AllFileList from './app/AllFile/AllFileList';

function App() {
  const token = store.get('web_disk_token');
  return (
    <>
      <BrowserRouter>
        <Routes>
          {
            token ? (
              <>
                <Route path="/" element={<MainContent />} >
                <Route>
                  {
                    navList.map(item => {
                      return <Route path={item.path} element={item.component} key={item.key} />
                    })
                  }
                </Route>
                </Route>
              </>
            ) : (
              <Route path="/" element={<Login />} />
            )
          }
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
