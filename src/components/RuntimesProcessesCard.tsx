import React, { useEffect, useState } from 'react';
import { fetchJvmInstances } from '../api/api';
import { JvmInstance, RuntimesInventoryResponse } from '../api/interfaces';
import ProcessesAccordion from './ProcessesAccordion';
import InventorySystemPropertiesCard from './InventorySystemPropertiesCard';

const RuntimesProcessesCard = ({ hostname }: { hostname: string }) => {
  const [instances, setInstances] = useState<JvmInstance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response: RuntimesInventoryResponse = await fetchJvmInstances(
          hostname
        );
        const instances: JvmInstance[] = response?.response;
        setInstances(instances);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (!isLoading && instances.length == 0) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <InventorySystemPropertiesCard
      title="Application Services Processes"
      isLoading={isLoading}
      content={<ProcessesAccordion instances={instances} />}
    ></InventorySystemPropertiesCard>
  );
};

export default RuntimesProcessesCard;
