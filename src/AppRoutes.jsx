import { Routes, Route } from 'react-router-dom';
import TextBoxPage from './pages/TextBoxPage.jsx';
import TipPage from './pages/TipPage.jsx';
import CheckBoxPage from './pages/CheckBoxPage.jsx';
import ColorPickerPage from './pages/ColorPickerPage.jsx';
import ContainerPage from './pages/ContainerPage.jsx';
import ContentHiderPage from './pages/ContentHiderPage.jsx';
import CustomButtonPage from './pages/CustomButtonPage.jsx';
import IconItemPage from './pages/IconItemPage.jsx';
import LoadingPage from './pages/LoadingPage.jsx';
import SplitterPage from './pages/SplitterPage.jsx';
import SwitcherPage from './pages/SwitcherPage.jsx';
import TextAreaPage from './pages/TextAreaPage.jsx';
import ToolButtonPage from './pages/ToolButtonPage.jsx';
import ComboBoxPage from './pages/ComboBoxPage.jsx';
import ContextMenuPage from './pages/ContextMenuPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import DataGridPage from './pages/DataGridPage.jsx';
import StepsListPage from './pages/StepsListPage.jsx';
import MultiSelectPage from './pages/MultiSelectPage.jsx';
import ItemSelectorPage from './pages/ItemSelectorPage.jsx';
import ProgressBarPage from './pages/ProgressBarPage.jsx';
import InfoModalPage from './pages/InfoModalPage.jsx';
import TabsPage from './pages/TabsPage.jsx';
import CensorContentPage from './pages/CensorContentPage.jsx';
import ItemsPaginatorPage from './pages/ItemsPaginatorPage.jsx';
import BaseComponentPage from './pages/BaseComponentPage.jsx';
import { ROOT_PATH } from './AppConts.js';


function AppRoutes() {
    return (
        <Routes>
            <Route path="*" element={<div>Path not found.</div>} />
            <Route path={`${ROOT_PATH}/TextBox`} element={<TextBoxPage />} />
            <Route path={`${ROOT_PATH}/Tip`} element={<TipPage />} />
            <Route path={`${ROOT_PATH}/CheckBox`} element={<CheckBoxPage />} />
            <Route path={`${ROOT_PATH}/ColorPicker`} element={<ColorPickerPage />} />
            <Route path={`${ROOT_PATH}/Container`} element={<ContainerPage />} />
            <Route path={`${ROOT_PATH}/ContentHider`} element={<ContentHiderPage />} />
            <Route path={`${ROOT_PATH}/CustomButton`} element={<CustomButtonPage />} />
            <Route path={`${ROOT_PATH}/IconItem`} element={<IconItemPage />} />
            <Route path={`${ROOT_PATH}/Loading`} element={<LoadingPage />} />
            <Route path={`${ROOT_PATH}/Splitter`} element={<SplitterPage />} />
            <Route path={`${ROOT_PATH}/Switcher`} element={<SwitcherPage />} />
            <Route path={`${ROOT_PATH}/TextArea`} element={<TextAreaPage />} />
            <Route path={`${ROOT_PATH}/ToolButton`} element={<ToolButtonPage />} />
            <Route path={`${ROOT_PATH}/ComboBox`} element={<ComboBoxPage />} />
            <Route path={`${ROOT_PATH}/ContextMenu`} element={<ContextMenuPage />} />
            <Route path={`${ROOT_PATH}/Gallery`} element={<GalleryPage />} />
            <Route path={`${ROOT_PATH}/DataGrid`} element={<DataGridPage />} />
            <Route path={`${ROOT_PATH}/StepsList`} element={<StepsListPage />} />
            <Route path={`${ROOT_PATH}/MultiSelect`} element={<MultiSelectPage />} />
            <Route path={`${ROOT_PATH}/ItemSelector`} element={<ItemSelectorPage />} />
            <Route path={`${ROOT_PATH}/ProgressBar`} element={<ProgressBarPage />} />
            <Route path={`${ROOT_PATH}/Tabs`} element={<TabsPage />} />
            <Route path={`${ROOT_PATH}/CensorContent`} element={<CensorContentPage />} />
            <Route path={`${ROOT_PATH}/ItemsPaginator`} element={<ItemsPaginatorPage />} />
            <Route path={`${ROOT_PATH}/InfoModal`} element={<InfoModalPage />} />
            <Route path={`${ROOT_PATH}/BaseComponent`} element={<BaseComponentPage />} />
        </Routes>
    );
}

export default AppRoutes;