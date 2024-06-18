import React from 'react';
import { GeneralSetup } from "../pages/GeneralSetup";
import { LandSetupPage } from "../pages/LandSetupPage";
import { UserSetupPage } from "../pages/UserSetupPage";
// import { SubDepartmentSetupPage } from "../pages/SubDepartmentSetupPage";
import { HistorySetupPage } from "../pages/HistorySetupPage";
import { Settings, DesktopMac, Store, AccountBox, History, Filter, Search } from "@material-ui/icons";
import InputAutocomplete from '../component/InputAutocomplete';

export const staticMenu = [
    // {
    //     id:1,
    //     menuName: 'Search',
    //     menuDescription: 'General setups menus',
    //     path: '/search',
    //     component: InputAutocomplete,
    //     exact: true,
    //     icon :<Search />,
    //     submenu: []
    // },
    {
        id:2,
        menuName: 'General Setup',
        menuDescription: 'General setups menus',
        path: '/generalSetup',
        component: GeneralSetup,
        exact: true,
        icon :<Settings />,
        submenu: [
            {
                id:3,
                menuName: 'Land Setup',
                menuDescription: 'To Setup lands',
                path: '/generalSetup/land',
                component: LandSetupPage,
                icon: <AccountBox />,
            },
            {
                id: 4,
                menuName: 'User Setup',
                menuDescription: 'To Setup User',
                path: '/generalSetup/user',
                component: UserSetupPage,
                icon: <AccountBox />
            }
        ]
    },
    {
        id:3,
        menuName: 'History Setup',
        menuDescription: 'History id setup menus',
        path: '/history',
        component: HistorySetupPage,
        exact: true,
        icon: <History />,
        submenu: [
            {
                id: 7,
                menuName: 'FAO',
                menuDescription: 'To Setup FAO',
                path: '/history/fao',
                component: LandSetupPage,
                icon: '',
            },
            {
                id: 8,
                menuName: 'Transactions',
                menuDescription: 'To Setup transactions',
                path: '/history/transactions',
                component: UserSetupPage,
                icon: '',
            }
        ]
    },
    {
        id: 6,
        menuName: 'Filters',
        menuDescription: 'Filters setup menus',
        path: '/filter',
        component: HistorySetupPage,
        exact: true,
        icon: <Filter />,
        submenu: []
    }
];