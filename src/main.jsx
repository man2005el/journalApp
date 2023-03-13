import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import { JournalApp } from './JournalApp'
import { BrowserRouter } from 'react-router-dom'
import { AppTheme } from './themes/AppTheme'
import { Provider } from 'react-redux'
import { store } from './store'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>

          <AppTheme>
            <JournalApp/>
          </AppTheme>
        
      </BrowserRouter>
    </Provider>  
  </React.StrictMode>
)
