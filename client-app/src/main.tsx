import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css'
import App from './app/layout/App.tsx'
import "./app/layout/styles.css"

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
    </StrictMode>,
)
