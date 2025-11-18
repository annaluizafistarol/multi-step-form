import { Box } from '@mui/material'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { JSX } from 'react'
import FormProvider from '@utils/context/FormContext/FormContext'
import Step1 from '@pages/step-1'
import Step2 from '@pages/step-2'
import Step3 from '@pages/step-3'
import Step4 from '@pages/step-4'

/**
 * App Component
 * @description This is the main component of the application.
 * @returns {JSX.Element} The JSX element representing the App component.
 */
export default function App(): JSX.Element {
  return (
    <Router>
      <div className="app">
        <FormProvider>
          <Routes>
            <Route path="/">
              <Route index element={<Step1 />} />
            </Route>

            <Route path="/step-1">
              <Route index element={<Step1 />} />
            </Route>

            <Route path="/step-2">
              <Route index element={<Step2 />} />
            </Route>

            <Route path="/step-3">
              <Route index element={<Step3 />} />
            </Route>

            <Route path="/step-4">
              <Route index element={<Step4 />} />
            </Route>
          </Routes>

          <Box className="background-box" />
        </FormProvider>
      </div>
    </Router>
  )
}
