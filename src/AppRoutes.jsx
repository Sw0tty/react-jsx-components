import { Routes, Route } from 'react-router-dom';
// import InputTextPage from '@Pages/InputTextPage.jsx';
// import TipPage from '@Pages/TipPage.jsx';


const rootSite = '/react-jsx-components';

function AppRoutes() {
    return (
        <Routes>
            <Route path="*" element={<div>Path not found.</div>} />
            {/* <Route path={`${rootSite}/InputText`} element={<InputTextPage />} />
            <Route path={`${rootSite}/Tip`} element={<TipPage />} /> */}
        </Routes>
    );
}

export default AppRoutes;