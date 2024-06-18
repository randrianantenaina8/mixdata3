import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Inscription } from '@pages/Inscription';
import Login from '@pages/Login';
import ProtectedRoute from './ProtectedRoute';
import LandContainer from '@container/LandContainer';
import UserContainer from '@container/UserContainer';
import { MainContainer } from '@container/MainContainer';
import DetailParcelle from '@component/detailparcelle/DetailParcelleComponent';
import { Landing } from '@pages/Landing';
import ListCrm from '@component/listcrm/listcrm';
import DetailCrm from '../component/detailcrm/detailcrm';

export const Routing = () => {
  return (
    <Routes>
      <Route
        index
        path="/"
        element={<Landing />}
      />
      <Route path="/login" element={<Login />} />
      <Route exact path='/inscription' element={<Inscription />} />
      <Route exact path='/*' element={
          <ProtectedRoute>
            <MainContainer>
              <Routes>
                <Route path="/land" element={
                  <LandContainer />
                }></Route>
                <Route path="/user" element={
                  <UserContainer />
                }></Route>
                <Route path="/details/:id" element={
                  <DetailParcelle />
                } />
                <Route path="/list-crm" element={
                  <ListCrm />
                } />
                <Route path="/detail/:id/:contactId" element={<DetailCrm />} />
              </Routes>
            </MainContainer>
          </ProtectedRoute>
      } />
    </Routes>
  );
}
