import React from 'react';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import Main from '@redhat-cloud-services/frontend-components/Main';
import { Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import {
  Bullseye,
  Button,
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateFooter,
  EmptyStateHeader,
  EmptyStateIcon,
  EmptyStateVariant,
} from '@patternfly/react-core';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';

const InventoryTableEmptyState = (tableColumns: string[]) => {
  return (
    <React.Fragment>
      <PageHeader className="pf-m-light">
        <PageHeaderTitle title="Middleware Inventory" />
      </PageHeader>
      <Main>
        <Table aria-label="Middleware Inventory table empty state">
          <Thead>
            <Tr>
              {tableColumns.map((column) => {
                return <Th>{column}</Th>;
              })}
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td colSpan={8}>
                <Bullseye>
                  <EmptyState variant={EmptyStateVariant.sm}>
                    <EmptyStateHeader
                      icon={<EmptyStateIcon icon={SearchIcon} />}
                      titleText="No results found"
                      headingLevel="h2"
                    />
                    <EmptyStateBody>
                      Clear all filters and try again.
                    </EmptyStateBody>
                    <EmptyStateFooter>
                      <EmptyStateActions>
                        <Button variant="link">Clear all filters</Button>
                      </EmptyStateActions>
                    </EmptyStateFooter>
                  </EmptyState>
                </Bullseye>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Main>
    </React.Fragment>
  );
};

export default InventoryTableEmptyState;
