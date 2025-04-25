import {createRoot} from 'react-dom/client';
import {StrictMode} from 'react';
import './index.css'
import ProfileSearch from "./ProfileSearch.tsx";

const root = createRoot(document.getElementById('root')!);
root.render(
    <StrictMode>
        <ProfileSearch/>
    </StrictMode>
);
