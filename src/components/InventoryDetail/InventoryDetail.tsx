import React, { Fragment, useEffect, useState } from 'react';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import { JvmInstance, RuntimesInventoryResponse } from '../../api/interfaces';
import {
  Card,
  CardBody,
  CardTitle,
  DataList,
  DataListCell,
  DataListItemRow,
  Gallery,
  GalleryItem,
  Spinner,
  Tab,
  Tabs,
  TabTitleText,
} from '@patternfly/react-core';
import instance from '@redhat-cloud-services/frontend-components-utilities/interceptors';
import { useLocation } from 'react-router-dom';
import { formatInstancesData } from '../../utils/utils';
import { Main } from '@redhat-cloud-services/frontend-components';

const InventoryDetail = () => {
  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);
  const [isBox, setIsBox] = React.useState<boolean>(false);
  // Toggle currently active tab
  const handleTabClick = (
    event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number
  ) => {
    setActiveTabKey(tabIndex);
  };

  const toggleBox = (checked: boolean) => {
    setIsBox(checked);
  };

  const [jvmInstance, setJvmInstance] = useState<JvmInstance>();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation().pathname;
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const regex = new RegExp('^.*\\/(.*)');
      const id = regex.exec(location)[1];
      try {
        const response = await instance.get<unknown, RuntimesInventoryResponse>(
          `/api/runtimes-inventory-service/v1/instance?jvmInstanceId=${id}`
        );
        let jvmInstance: JvmInstance = response?.response;
        jvmInstance = formatInstancesData([jvmInstance])[0];
        setJvmInstance(jvmInstance);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  console.warn(jvmInstance);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <React.Fragment>
      <PageHeader>
        <PageHeaderTitle title={`${jvmInstance.appName}`} />
        <p>
          {' '}
          <b>UUID:</b> {`${jvmInstance.id}`}{' '}
        </p>
        <p>
          {' '}
          <b>Last Seen:</b> {`${jvmInstance?.jvmReportTime}`}{' '}
        </p>
      </PageHeader>
      <Fragment
        style={{
          paddingTop: '0px',
          paddingLeft: '0px',
          paddingRight: '0px',
        }}
      >
        <Tabs
          activeKey={activeTabKey}
          onSelect={handleTabClick}
          isBox={isBox}
          aria-label="Tabs in the default example"
          role="region"
          style={{
            backgroundColor: 'white',
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          <Tab
            eventKey={0}
            title={<TabTitleText>General Information</TabTitleText>}
          >
            <Main>
              <Gallery hasGutter>
                <GalleryItem>
                  <Card>
                    <CardTitle>Product</CardTitle>
                    <CardBody>
                      <DataList aria-label={''}>
                        <DataListItemRow>
                          <DataListCell>Name</DataListCell>
                          <DataListCell>{jvmInstance?.workload}</DataListCell>
                        </DataListItemRow>
                        <DataListItemRow>
                          <DataListCell>Version</DataListCell>
                          <DataListCell>{jvmInstance?.version}</DataListCell>
                        </DataListItemRow>
                        <DataListItemRow>
                          <DataListCell>Number of cores</DataListCell>
                          <DataListCell>{jvmInstance?.processors}</DataListCell>
                        </DataListItemRow>
                        <DataListItemRow>
                          <DataListCell>RAM</DataListCell>
                          <DataListCell>TBD</DataListCell>
                        </DataListItemRow>
                      </DataList>
                    </CardBody>
                  </Card>
                </GalleryItem>
                <GalleryItem>
                  <Card>
                    <CardTitle>JVM</CardTitle>
                    <CardBody>
                      <DataList aria-label={''}>
                        <DataListItemRow>
                          <DataListCell>Vendor</DataListCell>
                          <DataListCell>{jvmInstance?.vendor}</DataListCell>
                        </DataListItemRow>
                        <DataListItemRow>
                          <DataListCell>Version</DataListCell>
                          <DataListCell>{jvmInstance?.version}</DataListCell>
                        </DataListItemRow>
                        <DataListItemRow>
                          <DataListCell>Initial Heap</DataListCell>
                          <DataListCell>{jvmInstance?.heapMin}</DataListCell>
                        </DataListItemRow>
                        <DataListItemRow>
                          <DataListCell>Max Heap</DataListCell>
                          <DataListCell>{jvmInstance?.heapMax}</DataListCell>
                        </DataListItemRow>
                      </DataList>
                    </CardBody>
                  </Card>
                </GalleryItem>
                <GalleryItem>
                  <Card>
                    <CardTitle>Instance</CardTitle>
                    <CardBody>
                      <DataList aria-label={''}>
                        <DataListItemRow>
                          <DataListCell>Name</DataListCell>
                          <DataListCell>{jvmInstance?.appName}</DataListCell>
                        </DataListItemRow>
                        <DataListItemRow>
                          <DataListCell>OS</DataListCell>
                          <DataListCell>
                            {jvmInstance?.systemOsName}
                          </DataListCell>
                        </DataListItemRow>
                        <DataListItemRow>
                          <DataListCell>Version</DataListCell>
                          <DataListCell>
                            {jvmInstance?.systemOsVersion}
                          </DataListCell>
                        </DataListItemRow>
                      </DataList>
                    </CardBody>
                  </Card>
                </GalleryItem>
              </Gallery>
            </Main>
          </Tab>
          <Tab
            eventKey={1}
            title={<TabTitleText>Vulnerability</TabTitleText>}
            isDisabled
          />
          <Tab
            eventKey={2}
            title={<TabTitleText>Advisor</TabTitleText>}
            isDisabled
          />
        </Tabs>
      </Fragment>
    </React.Fragment>
  );
};

export default InventoryDetail;
