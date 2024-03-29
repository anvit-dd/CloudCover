import { useState } from "react";
import Header from "./components/header/index"
import SideBar from "./components/sidebar/index"
import FileView from "./components/FilesView/filesview"
function App() {
  const [user, userState] = useState({
    displayName: "Anvit Dadape",
    email: "anvit.dd@gmail.com",
    emailVerfied: true,
    phoneNumber: null,
    photoURL: "https://lh3.googleusercontent.com/a/ACg8ocLuSZrohsqB2qzkg-DOAZUuKp4eDGt5DAszNpouaX7_TQ=s315-c-no"
  })
  return (
    <div>
      <Header userPhoto = {user.photoURL}/>
      <SideBar/>
    </div>
  );
}

export default App;