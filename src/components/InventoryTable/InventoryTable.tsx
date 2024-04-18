import React, { useEffect, useState } from 'react';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import Main from '@redhat-cloud-services/frontend-components/Main';
import { Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { JvmInstance, RuntimesInventoryResponse } from '../../api/interfaces';
import { fetchJvmInstances } from '../../api/api';
import {
  ActionList,
  ActionListItem,
  Button,
  Dropdown,
  MenuToggle,
  MenuToggleElement,
  Pagination,
  PaginationVariant,
  SearchInput,
  Select,
  Spinner,
  Text,
  TextContent,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  ToolbarToggleGroup,
} from '@patternfly/react-core';
import { formatInstancesData } from '../../utils/utils';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import EllipsisVIcon from '@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon';

const tableColumns: string[] = [
  'Name',
  'Hostname',
  'Workload',
  'Last seen',
  '',
];

const InventoryTable = () => {
  const [instances, setInstances] = useState<JvmInstance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = React.useState(false);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response: RuntimesInventoryResponse = await fetchJvmInstances(
          'kazama'
        );
        const response2: RuntimesInventoryResponse = await fetchJvmInstances(
          'mishima'
        );
        let instances: JvmInstance[] = response?.response;
        const instances2: JvmInstance[] = response2?.response;
        instances = instances.concat(instances2);
        setInstances(formatInstancesData(instances));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  console.warn(instances);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <React.Fragment>
      <PageHeader className="pf-m-light">
        <PageHeaderTitle title="Middleware Inventory" />
        <TextContent>
          <Text component="p">This is a POC demonstration for a Middleware Inventory page.</Text>
        </TextContent>
      </PageHeader>
      <Main>
        <Toolbar>
          <ToolbarContent>
            <ToolbarItem>
              <Select
                toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                  <MenuToggle
                    ref={toggleRef}
                    onClick={() => onToggle('first')}
                    isExpanded={false}
                    style={
                      {
                        width: '88px',
                      } as React.CSSProperties
                    }
                  >
                    {'Name'}
                  </MenuToggle>
                )}
              ></Select>
            </ToolbarItem>
            <ToolbarItem variant="search-filter">
              <SearchInput aria-label="Items example search input" />
            </ToolbarItem>
            <ToolbarItem>
              <Button variant="secondary">Delete</Button>
            </ToolbarItem>
            <ActionList>
              <ActionListItem>
                <Dropdown
                  toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                    <MenuToggle
                      ref={toggleRef}
                    //   onClick={onToggle()}
                      variant="plain"
                      isExpanded={isOpen}
                      aria-label="Action list single group kebab"
                    >
                      <EllipsisVIcon />
                    </MenuToggle>
                  )}
                ></Dropdown>
              </ActionListItem>
            </ActionList>
            <ToolbarItem variant="pagination" align={{ default: 'alignRight' }}>
              <Pagination itemCount={instances.length} perPage={10} page={1} />
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
        <Table aria-label="Middleware Inventory table">
          <Thead>
            <Tr>
              <Td
                select={{
                  rowIndex: 0,
                  onSelect: (_event, isSelecting) => console.log('hi'),
                  isSelected: false,
                }}
              />
              {tableColumns.map((column) => {
                return (
                  <Th modifier="wrap" key={column}>
                    {column}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {instances.map((instance) => {
              return (
                <Tr key={instance.id}>
                  <Td
                    select={{
                      rowIndex: 0,
                      onSelect: (_event, isSelecting) => console.log('hi'),
                      isSelected: false,
                    }}
                  />
                  <Td dataLabel={tableColumns[0]}>
                    <a href={`/openshift/middleware-inventory/${instance.id}`}>{instance.appName}</a>
                  </Td>
                  <Td dataLabel={tableColumns[1]}>{instance.hostname}</Td>
                  <Td dataLabel={tableColumns[2]}>{instance.workload}</Td>
                  <Td dataLabel={tableColumns[3]}>{instance.created}</Td>
                  <ActionList>
                    <ActionListItem>
                      <Dropdown
                        toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                          <MenuToggle
                            ref={toggleRef}
                            onClick={onToggle}
                            variant="plain"
                            isExpanded={isOpen}
                            aria-label="Action list single group kebab"
                          >
                            <EllipsisVIcon />
                          </MenuToggle>
                        )}
                      ></Dropdown>
                    </ActionListItem>
                  </ActionList>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        <Pagination
          itemCount={instances.length}
          perPage={10}
          page={1}
          variant={PaginationVariant.bottom}
        />
      </Main>
    </React.Fragment>
  );
};

export default InventoryTable;
