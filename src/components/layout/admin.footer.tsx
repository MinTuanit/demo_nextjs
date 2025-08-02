'use client';

import { Layout } from 'antd';

const AdminFooter = () => {
  const { Footer } = Layout;
  return (
    <Footer style={{ textAlign: 'center' }}>
      Footer Design ©{new Date().getFullYear()} Created by Tuanek
    </Footer>
  );
}

export default AdminFooter;
