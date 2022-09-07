import ChatBubbles from "./chatbubbles/ChatBubbles";
import Navbar from "./navbar/Navbar";

import Search from "./search/Search";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <ChatBubbles />
    </div>
  );
};

export default Sidebar;
