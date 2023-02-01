import { ProForm, ProFormText } from '@ant-design/pro-components';

interface ProComponentProps {}

const ProComponent: React.FC<ProComponentProps> = (props) => {
  return (
    <ProForm
      className='max-w-2xl ma'
      onFinish={async (values) => {
        console.log(values);
      }}>
      <ProFormText name='name' label='姓名' />
    </ProForm>
  );
};

export default ProComponent;
