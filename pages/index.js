import SideBar from "../components/SideBar";
import Main from "../components/Main";

export default function Home() {
  return (
    <>
      <div className="parent-container d-flex flex-row">
        <SideBar />
        <Main />
      </div>
    </>
  );
}
