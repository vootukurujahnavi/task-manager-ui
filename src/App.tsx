import React from "react";
import { Layout, Typography } from "antd";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Title style={{ color: "white", margin: 0 }}>Task Manager UI</Title>
      </Header>
      <Content style={{ padding: 20 }}>
        <TaskForm refreshList={() => window.location.reload()} />
        <TaskList />
      </Content>
    </Layout>
  );
};

export default App;
