import { createRoot } from 'react-dom/client';

import "./index.scss";

const MovieMateApp = () => {
  return (
    <div className='moviemate'>
      <div>Good Morning</div>
    </div>
  );
};

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<MovieMateApp />);