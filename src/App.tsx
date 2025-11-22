import { Box } from '@mui/material'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { JSX } from 'react'
import StepContainer from '@components/StepContainer'
import ThankYou from '@pages/thank-you'
import FormProvider from '@utils/context/FormContext/FormContext'

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
            <Route path="/" element={<StepContainer />} />

            <Route path="/step-1" element={<StepContainer />} />
            <Route path="/step-2" element={<StepContainer />} />
            <Route path="/step-3" element={<StepContainer />} />
            <Route path="/step-4" element={<StepContainer />} />

            <Route path="/thank-you" element={<ThankYou />} />
          </Routes>

          <Box className="background-box" />
        </FormProvider>
      </div>
    </Router>
  )
}
