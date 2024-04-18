import React from 'react';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';

const InventoryDetail = () => {
  return (
    <React.Fragment>
      <PageHeader>
        <PageHeaderTitle title="Inventory details will go here." />
        <p> This is page header text </p>
      </PageHeader>
      <h1>Hello world.</h1>
    </React.Fragment>
  );
};

export default InventoryDetail;
