"use client"
import { useState } from "react";
import Image from "next/image";
import Header from "./components/Header/index.js"
import ItemList from "./components/ItemList/index.js";

export default function Home() {
  const [user, setUser] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();
    if (newUser.name) {
      const { avatar_url, login } = newUser;
      setCurrentUser({ avatar_url, login });

      const reposData = await fetch(
        `https://api.github.com/users/${user}/repos`,
        console.log("teste  ",userData)
      );
      const newRepos = await reposData.json();
      if (newRepos.length) {
        setRepos(newRepos);
      }
    }
  };

  return (
    <div className="App">
      <Header/>    
        <div className="info">
          <div>
            <input
              name="usuario"
              value={user}
              onChange={(event) => setUser(event.target.value)}
              placeholder="@username"
           
            />
            <button onClick={handleGetData} >
              Procurar
            </button>
          </div>
          {currentUser?.name && (
            <>
              <div className="perfil">
                <Image
                  src={currentUser.avatar_url}
                  width={100}
                  height={100}
          
                  alt="imagem de perfil"
                />
                <div>
                  <h3>{currentUser.name}</h3>
                  <span>@{user}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>
          )}
          {repos?.length && (
            <div>
              <h4 className="repositorio">Repositórios</h4>
              {repos.map((repo) => (
                <ItemList
                  key={repo.id}
                  title={repo.name}
                  description={repo.description}
                />
              ))}
            </div>
          )}
        </div>
      
    </div>
  );
}
