import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

// Components
import LoginPage from "./app/auth/Login";
import LandingPage from "./app/LandingPage";
import ExamplePage from "./app/ExamplePage";
import ApplicantList from "./app/applicants/ApplicantList";
import RootLayout from "./components/Layout/RootLayout";
import ApplicantView from "./app/applicants/ApplicantView";
import ApplicantForm from "./app/applicants/ApplicantForm";
import PrivateRoute from "./components/PrivateRoute";
import AgentList from "./app/agents/AgentList";
import AgentView from "./app/agents/AgentView";
import AgentForm from "./app/agents/AgentForm";

// Define Routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Routes with RootLayout */}
      <Route path="" element={<LoginPage/>}/>
        <Route path="" element={<PrivateRoute><RootLayout/></PrivateRoute>}>
        <Route path="landing" element={<LandingPage />}/>
        <Route path="example" element={<ExamplePage />} />
        <Route path="applicant" element={<ApplicantList />} />
        <Route path="applicant/:id" element={<ApplicantView />} />
        <Route path="applicant/edit/:id" element={<ApplicantForm isCreating={false} />} />
        <Route path="applicant/add" element={<ApplicantForm isCreating={true}/>} />
        <Route path="agent" element={<AgentList/>}/>
        <Route path="agent/:id" element={<AgentView/>}/>
        <Route path = "agent/add" element={<AgentForm isCreating={true}/>}/>
        <Route path="agent/edit/:id" element={<AgentForm isCreating={false}/>}/>
      </Route>

      {/* Route without RootLayout */}
      <Route path="/" element={<LoginPage />} />

      {/* Catch-All Route */}
      <Route path=" " element={<LoginPage />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
