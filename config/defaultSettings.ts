import { Settings as LayoutSettings } from '@ant-design/pro-layout';
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'eGn - 2021',
  pwa: false,
  logo:"https://www.pngkey.com/png/full/239-2392657_circulos-png.png",
};

export default Settings;
