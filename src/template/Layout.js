import BottomNav from "./BottomNav";
import Header from "./Header";
import SideBar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="container-fluid main-container" style={{ height: "100vh" }}>
      <div className="row">
        {/*
        Enter DOC
      */}
        <div
          className="col-lg-1 col-md-0 d-none d-lg-block p-0"
          style={{ height: "100vh" }}
        >
          <div className="position-fixed" style={{ height: "100vh" }}>
            <SideBar />
          </div>
        </div>
        <div className="col-lg-11 col-md-12">
          <div className="row m-3 header">
            {/*
        Header Area
      */}
            <Header />
          </div>
          <div className="row p-2 mb-5">
            {/*
        Body
      */}
            {children}
          </div>
        </div>
      </div>
      <div className="d-lg-none">
        <BottomNav />
      </div>
    </div>
  );
}
